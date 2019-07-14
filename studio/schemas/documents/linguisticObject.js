import {textTypes, languages} from '../vocabularies/default'

export default {
  title: 'Linguistic object',
  name: 'linguisticObject',
  type: 'document',
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
      name: 'title',
      type: 'string'
    },
    {
      title: 'Text type',
      name: 'textType',
      type: 'string',
      options: {
        list: textTypes,
        layout: 'radio'
      }
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
      type: 'array',
      of: [{type: 'block'}]
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
