import {MdPerson} from 'react-icons/md'

export default {
  title: 'Actor',
  name: 'actor',
  type: 'document',
  icon: MdPerson,
  fields: [
    {
      title: 'Display name',
      name: 'label',
      type: 'string'
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
    },
    {
      title: 'Activity stream',
      name: 'activityStream',
      description: 'Add all known events this smuck did',
      type: 'array',
      of: [
        {type: 'birth'},
        {type: 'activity'},
        {type: 'death'}
      ],
      options: {
        editModal: 'fullscreen'
      }
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
      name: 'bio',
      title: 'Bio',
      type: 'genericText'
    }
  ]
}
