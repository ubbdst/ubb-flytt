import {FaGlasses} from 'react-icons/fa'

export default {
  title: 'Exhibition',
  name: 'exhibition',
  description: 'Should be fetched from KulturNav',
  type: 'document',
  icon: FaGlasses,
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
      of: [
        {type: 'block'},
        {type: 'reference',
          to: [
            {type: 'timeline'}
          ]
        }
      ]
    }
  ]
}
