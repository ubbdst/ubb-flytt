export default {
  title: 'Place',
  name: 'place',
  description: 'Should be fetched from KulturNav',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
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
