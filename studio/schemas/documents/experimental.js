import {FaFlask} from 'react-icons/fa'

export default {
  title: 'Experimental',
  name: 'experimental',
  type: 'document',
  icon: FaFlask,
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'repos',
      title: 'Github-søk',
      titleEN: 'Github search',
      description: 'Experimental feature',
      type: 'array',
      of: [
        {type: 'apiMetadata'}
      ],
      validation: Rule => Rule.required().unique()
    }
  ]
}
