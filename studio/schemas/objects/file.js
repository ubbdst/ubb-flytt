import {rights} from '../vocabularies/default'

export default {
  title: 'Manuscript',
  name: 'manuscript',
  type: 'file',
  fields: [
    {
      title: 'Title',
      name: 'label',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'localeBlockSimple'
    },
    {
      title: 'Rights',
      name: 'rights',
      description: 'Choose the correct lisense or mark',
      fieldset: 'minimum',
      type: 'string',
      options: {
        list: rights
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Source',
      name: 'souce',
      type: 'url'
    }
  ]
}
