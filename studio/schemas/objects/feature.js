export default {
  title: 'Feature',
  name: 'feature',
  type: 'object',
  fields: [
    {
      title: 'Properties',
      name: 'properties',
      type: 'object',
      fields: [
        {
          title: 'Type',
          name: 'type',
          type: 'string',
          options: {
            list: [
              {title: 'Point of camera', value: 'Point of camera'},
              {title: 'Center of motif', value: 'Center of motif'}
            ]
          }
        }
      ]
    },
    {
      title: 'Coordinates',
      name: 'geometry',
      type: 'geopoint'
    }
  ],
  preview: {
    select: {
      type: 'properties.type'
    },
    prepare (selection) {
      const {type} = selection
      return {
        title: type
      }
    }
  }
}
