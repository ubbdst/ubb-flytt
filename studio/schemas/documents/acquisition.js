export default {
  title: 'Acquisition',
  name: 'acquisition',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      title: 'Transferred title to',
      name: 'transferred_title_to',
      description: '',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'group'},
            {type: 'actor'}
          ]
        }
      ]
    },
    {
      title: 'Transferred title from',
      name: 'transferred_title_from',
      description: '',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'group'},
            {type: 'actor'}
          ]
        }
      ]
    },
    {
      title: 'Transferred title of',
      name: 'transferred_title_of',
      description: '',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'madeObject'},
            {type: 'collection'}
          ]
        }
      ]
    },
    {
      title: 'Sub acquisition',
      description: 'Events and activities connected to this object',
      name: 'consistsOf',
      type: 'array',
      of: [
        {type: 'acquisition'}
      ],
      options: {
        editModal: 'fullscreen'
      }
    }
  ]
}
