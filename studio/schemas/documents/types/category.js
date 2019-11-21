import {FaTag} from 'react-icons/fa'

export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  icon: FaTag,
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    }
  ]
}
