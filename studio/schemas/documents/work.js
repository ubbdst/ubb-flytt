import {FaCrown} from 'react-icons/fa'

export default {
  title: 'Work',
  name: 'work',
  type: 'document',
  icon: FaCrown,
  fields: [
    {
      title: 'Title',
      name: 'label',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      title: 'Activity stream',
      description: 'Events and activities connected to this object',
      name: 'events',
      type: 'array',
      of: [
        {type: 'creation'}
      ]
    }
  ]
}
