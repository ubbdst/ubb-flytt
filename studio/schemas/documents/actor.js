import {FaUser} from 'react-icons/fa'

export default {
  title: 'Actor',
  name: 'actor',
  type: 'document',
  icon: FaUser,
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
      type: 'string',
      fieldset: 'state',
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
      fieldset: 'state',
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
      title: 'Display name',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Image',
      name: 'mainRepresentation',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      title: 'Description',
      name: 'description',
      description: 'A shortish description',
      type: 'localeBlockSimple'
    },
    {
      title: 'Activity stream',
      name: 'activityStream',
      description: 'Add all known events this smuck did',
      type: 'array',
      of: [
        {type: 'birth'},
        {type: 'reference', to: [{type: 'activity'}]},
        {type: 'death'}
      ],
      options: {
        editModal: 'fullscreen'
      }
    },
    {
      title: 'Names',
      name: 'names',
      description: 'Add all known names and pseudonyms you wish',
      type: 'array',
      of: [
        {type: 'name'}
      ],
      options: {
        editModal: 'popup'
      }
    },
    {
      title: 'Identifiers',
      name: 'identifier',
      description: 'Add identifiers this actor is identified by, both internally and externally, like in KulturNav og VIAF.',
      type: 'array',
      of: [
        {type: 'identifier'}
      ],
      options: {
        editModal: 'popup'
      }
    }
  ]
}
