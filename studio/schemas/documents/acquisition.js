import {FaGifts} from 'react-icons/fa'

export default {
  title: 'Acquisition',
  name: 'acquisition',
  type: 'document',
  initialValue: {
    editorialState: 'workingDraft',
    accessState: 'secret'
  },
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
      name: 'editorialState',
      title: 'Redaksjonell status',
      titleEN: 'Editorial state',
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
      name: 'accessState',
      title: 'Tilgangsstatus',
      titleEN: 'Access state',
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
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'localeBlockReport'
    },
    {
      name: 'transferredTitleTo',
      title: 'Overfrte tittel til',
      titleEN: 'Transferred title to',
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
      name: 'transferredTitleFrom',
      title: 'Overførte tittel fra',
      titleEN: 'Transferred title from',
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
      name: 'transferredTitleOf',
      title: 'Overførte tittel',
      titleEN: 'Transferred title of',
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
      name: 'consistsOf',
      title: 'Underakkvisisasjon',
      titleEN: 'Sub acquisition',
      description: 'Events and activities connected to this object',
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
