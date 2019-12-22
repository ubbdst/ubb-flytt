import {FaClipboard} from 'react-icons/fa'

export default {
  title: 'Design or procedure',
  name: 'designOrProcedure',
  type: 'document',
  icon: FaClipboard,
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
      title: 'Description',
      name: 'description',
      type: 'localeBlock'
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
            filterParams: {sysCat: 'Prosedyretype'}
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Documented in',
      name: 'documentedIn',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'file'}
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'label.nor'
    },
    prepare (selection) {
      const {title} = selection

      return {
        title: title
      }
    }
  }
}
