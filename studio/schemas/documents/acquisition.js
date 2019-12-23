import {FaGifts} from 'react-icons/fa'

export default {
  title: 'Acquisition',
  name: 'acquisition',
  type: 'document',
  icon: FaGifts,
  fieldsets: [
    {
      name: 'state',
      title: 'State',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      title: 'Redaksjonell status',
      titleEN: 'Editorial state',
      name: 'editorialState',
      type: 'string',
      fieldset: 'state',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Utkast', value: 'workingDraft'},
          {title: 'Trenger gjennomgang', value: 'review'},
          {title: 'Publisert', value: 'published'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      title: 'Tilgangsstatus',
      titleEN: 'Access state',
      name: 'accessState',
      type: 'string',
      fieldset: 'state',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Privat', value: 'secret'},
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
      type: 'localeBlockReport'
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
