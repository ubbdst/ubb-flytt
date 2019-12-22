import {languages} from '../vocabularies/default'
import {FaFileAlt} from 'react-icons/fa'

export default {
  title: 'Text',
  name: 'linguisticObject',
  type: 'document',
  icon: FaFileAlt,
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
      title: 'Classified as',
      name: 'hasType',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'typeClass'}],
          options: {
            filter: 'references(*[_type == "systemCategory" && label.nor in [$sysCat]]._id)',
            filterParams: {sysCat: 'Teksttype'}
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Body',
      name: 'body',
      type: 'genericText'
    },
    {
      title: 'Documented in',
      name: 'documentedIn',
      type: 'array',
      of: [
        {
          type: 'file'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'label.nor',
      blocks: 'body'
    },
    prepare (selection) {
      const {title, blocks} = selection
      const block = (blocks || []).find(block => block._type === 'block')

      return {
        title: title,
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
