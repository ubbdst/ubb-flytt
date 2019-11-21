import {languages} from '../vocabularies/default'
import {FaToiletPaper} from 'react-icons/fa'

export default {
  title: 'Linguistic object',
  name: 'linguisticObject',
  type: 'document',
  icon: FaToiletPaper,
  fields: [
    {
      name: 'editorialState',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Working draft', value: 'workingDraft'},
          {title: 'Needs review', value: 'review'},
          {title: 'Published', value: 'published'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      name: 'accessState',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Private/Secret', value: 'secret'},
          {title: 'Open', value: 'open'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      title: 'Title',
      name: 'label',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      title: 'Language',
      name: 'language',
      type: 'string',
      options: {
        list: languages
      }
    },
    {
      title: 'Body',
      name: 'body',
      type: 'genericText'
    }
  ],
  preview: {
    select: {
      title: 'title',
      typeOfObject: 'textType',
      blocks: 'body'
    },
    prepare (selection) {
      const {title, typeOfObject, blocks} = selection
      const block = (blocks || []).find(block => block._type === 'block')

      return {
        title: title,
        subtitle: `${typeOfObject || ''}`,
        description: block
          ? block.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          : 'No description'
      }
    }
  }
}
