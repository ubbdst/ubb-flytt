export default {
  title: 'Feature',
  name: 'feature',
  type: 'object',
  fields: [

    {
      title: 'Type',
      name: 'type',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Point of camera', value: 'Point of camera'},
          {title: 'Center of motif', value: 'Center of motif'},
          {title: 'Place', value: 'Place'},
          {title: 'Building', value: 'Building'}
        ]
      }
    },
    {
      title: 'Coordinates',
      name: 'geometry',
      type: 'geopoint'
    }
  ],
  preview: {
    select: {
      type: 'type'
    },
    prepare (selection) {
      const {type} = selection
      return {
        title: type
      }
    }
  }
}
