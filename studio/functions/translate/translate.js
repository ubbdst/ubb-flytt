const sanityClient = require('@sanity/client')
const reduce = require('json-reduce').default
const Translate = require('@google-cloud/translate')
const DATASET = 'production'
const SUPPORTED_LANGUAGES = [
  {id: 'en', title: 'English', isDefault: true, googleTranslateCode: 'en'},
  {id: 'de', title: 'German (Deutsch)', googleTranslateCode: 'de'}
]

/**
* @param context {WebtaskContext}
*/
module.exports = function (context, cb) {
  if (!context.body.ids.created.length === 0) {
    return cb(null, 200)
  }

  // see https://github.com/sanity-io/sanity/blob/next/packages/example-studio/schemas/languages.js for an example

  const client = sanityClient({
    projectId: 'wp3esdll',
    dataset: DATASET,
    token: context.secrets.SANITY_TOKEN,
    useCdn: false
  })

  const translateAPI = new Translate({
    projectId: context.secrets.GT_PROJECT_ID,
    key: context.secrets.GT_KEY
  })

  const fetchAllDocuments = () =>
    client
      .request({
        url: `/data/export/${DATASET}`
      })
      .then(res =>
        res
          .trim()
          .split('\n')
          .map(line => JSON.parse(line))
      )

  const hasMissingTranslations = localizedValue =>
    SUPPORTED_LANGUAGES.some(lang => lang.googleTranslateCode && !(lang.id in localizedValue))

  const hasPossibleSourceLang = localizedValue =>
    SUPPORTED_LANGUAGES.some(lang => lang.googleTranslateCode && lang.id in localizedValue)

  const isFixable = localeString =>
    hasMissingTranslations(localeString) && hasPossibleSourceLang(localeString)

  const translateString = async (string, targetLang) => {
    return (await translateAPI.translate(string, targetLang.googleTranslateCode))[0]
  }

  // eslint-disable-next-line no-unused-vars
  const extractTextArray = (blocks = []) =>
    blocks
      .filter(val => val._type === 'block')
      .map(block =>
        block.children
          .filter(child => child._type === 'span')
          .map(span => span.text)
          .join('')
      )

  const translateBlockArray = (blockArray, targetLang) => {
    return Promise.all(
      blockArray.map(async block => {
        if (block._type !== 'block') {
          if (block._type === 'hero') {
            return {
              ...block,
              ...(block.title && {title: await translateString(block.title, targetLang)}),
              ...(block.subTitle && {subTitle: await translateString(block.subTitle, targetLang)})
            }
          }
          if (block._type === 'feature') {
            return {
              ...block,
              body: await translateBlockArray(block.body, targetLang),
              ...(block.callToAction && {callToAction: {
                _type: 'callToAction',
                ...(block.callToAction.external && {external: block.callToAction.external}),
                ...(block.callToAction.text && {text: await translateString(block.callToAction.text, targetLang)})
              }}),
              ...(block.heading && {heading: await translateString(block.heading, targetLang)})
            }
          }
          if (block._type === 'tileCollection') {
            return {
              ...block,
              tiles: await Promise.all(block.tiles.map(async tile => ({
                ...tile,
                ...(tile.title && {title: await translateString(tile.title, targetLang)}),
                ...(tile.subTitle && {subTitle: await translateString(tile.subTitle, targetLang)}),
                ...(tile.linkText && {linkText: await translateString(tile.linkText, targetLang)})
              })))
            }
          }
          if (block._type === 'heroGallery') {
            return {
              ...block,
              heroes: await Promise.all(block.heroes.map(async hero => ({
                ...hero,
                ...(hero.title && {title: await translateString(hero.title, targetLang)}),
                ...(hero.subTitle && {subTitle: await translateString(hero.subTitle, targetLang)})
              })))
            }
          }
          return block
        }
        const text = (block.children || [])
          .filter(child => child._type === 'span')
          .map(span => span.text)
          .join('')

        return {
          ...block,
          children: [{
            _type: 'span',
            text: await translateString(text, targetLang)
          }]
        }
      })
    )
  }

  const translateValue = (value, targetLang) => {
    if (typeof value === 'string') {
      return translateString(value, targetLang)
    }
    if (value && Array.isArray(value)) {
      return translateBlockArray(value, targetLang)
    }
    throw new Error(`Can't translate localized value: ${JSON.stringify(value)}`)
  }

  const isEmpty = value => {
    if (value === null || typeof value === 'undefined') {
      return true
    }
    if (Array.isArray(value)) {
      return value.length === 0
    }
    if (typeof value === 'string') {
      return !value.trim()
    }
  }
  // a localized value is any value that matches the pattern {_type: 'locale*'}
  const translateLocalizedValue = async localizedValue => {
    const missingLangs = SUPPORTED_LANGUAGES.filter(
      lang => lang.googleTranslateCode && !(lang.id in localizedValue)
    )

    const sourceLang = SUPPORTED_LANGUAGES.find(lang => !isEmpty(localizedValue[lang.id] || ''))

    if (!sourceLang) {
    // no sourceValue to translate from
      return localizedValue
    }

    const sourceValue = localizedValue[sourceLang.id]

    const translated = await Promise.all(
      missingLangs.map(async lang => {
        try {
          return {[lang.id]: await translateValue(sourceValue, lang)}
        } catch (err) {
          console.log(`Could not translate "${sourceValue}" to ${lang.title}: ${err.message}`)
        }
        return {}
      })
    )
    const result = Object.assign({}, ...translated)
    if (Object.keys(result).length === 0) {
    // nothing was translated
      return null
    }
    return Object.assign({}, localizedValue, result)
  }

  const serializePath = path => {
    return path.reduce((target, part, i) => {
      const isIndex = typeof part === 'number'
      const separator = i === 0 ? '' : '.'
      const add = isIndex ? `[${part}]` : `${separator}${part}`
      return `${target}${add}`
    }, '')
  }

  const logResults = results => {
    const count = results.reduce((total, res) => total + res.documentIds.length, 0)
    console.log(`Translated localized field(s) in ${count} document(s) (${results.length} transaction(s))`)
  }

  const logTodo = fixable => {
    const count = fixable.reduce(
      (count, fixableItem) => count + fixableItem.localizedNodes.length,
      0
    )
    console.log(`Translating ${count} localized field(s) in ${fixable.length} document(s)`)
  }

  const formatLocalizedValues = (localizedValue) => SUPPORTED_LANGUAGES.map(lang => `${lang.id}: ${JSON.stringify(localizedValue[lang.id])}`)

  const formatSetPatch = setPatch => Object.keys(setPatch).map(path => `${path}\n${formatLocalizedValues(setPatch[path]).map(formatted => `    ${formatted}`).join('\n')}`)
  const logPatches = patches => {
    const patchOutput = patches.map(
      (patch) => [
        `On document "${patch.id}" (if revision match "${patch.ifRevisionID}"):`,
        `${formatSetPatch(patch.set).map(formatted => `  SET: ${formatted}`).join('\n\n')}`
      ].join('\n')
    )
    console.log(patchOutput.join('\n\n'))
  }

  const IS_LOCALIZED_TYPE = /^locale[A-Z]+/

  // For the given document, recursively collect a list of all localized values, and their key-path
  const collectLocalizedNodes = document =>
    reduce(
      document,
      (accumulator, value, keyPath) =>
        accumulator.concat(
          IS_LOCALIZED_TYPE.test(value._type)
            ? {
              path: serializePath(keyPath),
              value: value
            }
            : []
        ), [])

  const translateAll = fixableDocs => {
    return Promise.all(
      fixableDocs.map(async fixable => ({
        ...fixable,
        localizedNodes: await Promise.all(
          fixable.localizedNodes.map(async localizedNode => ({
            ...localizedNode,
            translated: await translateLocalizedValue(localizedNode.value)
          }))
        )
      }))
    )
  }

  const batch = (array, batchSize) => {
    if (array.length === 0) {
      return array
    }
    if (array.length <= batchSize) {
      return [array]
    }
    return [array.slice(0, batchSize), ...batch(array.slice(batchSize), batchSize)]
  }

  const createSetPatches = localizedValues =>
    localizedValues.reduce(
      (patches, node) => node.translated ? ({
        ...patches,
        [node.path]: node.translated
      }) : patches,
      {}
    )

  const createPatchSpec = (doc, setPatches) => ({
    id: doc._id,
    ifRevisionID: doc._rev,
    set: setPatches
  })

  const createTransaction = patches =>
    patches.reduce((tx, patch) => {
      const {id, ...rest} = patch
      return tx.patch(id, rest)
    }, client.transaction())

  const runMigration = async () => {
    const fixableDocs = (await fetchAllDocuments())
      .map(document => ({
      // for each document we collect all locale strings recursively together with
      // their keypath (i.e. the location in the document)
        _id: document._id,
        _rev: document._rev,
        localizedNodes: collectLocalizedNodes(document)
      }))
    // .map(v => (console.log(JSON.stringify(v)), v))
      .filter(candidate => candidate.localizedNodes.some(node => isFixable(node.value)))

    // Now fixableDocs is an array of
    // {id: string, localizedNodes: [{path: string, value: LocalizedValue}]}

    logTodo(fixableDocs)

    // Translate all fixable docs
    const fixedDocs = await translateAll(fixableDocs)

    // Now fixedDocs is an array of
    // {id: string, localizedNodes: [{path: string, value: LocalizedValue, translated: null | LocalizedValue}]}

    // Convert to Sanity patches
    const patches = fixedDocs
    // don't create patches for localized fields that wasn't translated
      .filter(candidate => candidate.localizedNodes.some(node => node.translated))
      .reduce(
        (acc, fixedDoc) => acc.concat(createPatchSpec(fixedDoc, createSetPatches(fixedDoc.localizedNodes))),
        [])

    if (patches.length === 0) {
      console.log('Nothing to translate.')
      cb(null, 200)
    }

    logPatches(patches)

    // Create transactions from patches in batches of n
    const transactions = batch(patches, 10).map(createTransaction)

    // Commit each batch in sequence
    const results = await transactions.reduce(
      async (prev, tx) => [...(await prev), await tx.commit()],
      Promise.resolve([])
    )

    logResults(results)
  }
  return runMigration().then(res => console.log(res) || cb(null, 200)).catch(err => console.error(err) || cb(null, 500))
}
