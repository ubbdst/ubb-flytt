import {FaTag} from 'react-icons/fa'

export default {
  title: 'Material',
  name: 'material',
  type: 'document',
  icon: FaTag,
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ]
}
