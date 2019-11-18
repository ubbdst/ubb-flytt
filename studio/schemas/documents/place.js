export default {
  title: 'Place',
  name: 'place',
  description: 'Should be fetched from KulturNav',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      title: 'Location',
      description: 'Where the hell did this happen?!',
      name: 'geoJSON',
      type: 'feature'
    }
  ]
}
