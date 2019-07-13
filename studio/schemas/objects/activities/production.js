var capitalize = require('capitalize')

export default {
  title: 'Production',
  name: 'production',
  type: 'object',
  fields: [
    {
      title: 'Carried out by',
      name: 'carriedOutBy',
      type: 'array',
      of: [{type: 'actorInRole'}]
    },
    {
      title: 'Timespan',
      name: 'timespan',
      type: 'array',
      of: [{type: 'timespan'}],
      validation: Rule => Rule.length(1).warning('You should only register one timespan')
    },
    {
      title: 'Geographic features',
      name: 'geoJSON',
      type: 'array',
      of: [
        {type: 'feature'}
      ]
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      title: 'Has modified',
      name: 'hasModified',
      description: 'A production can modify an existing object',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'madeObject'}
          ]
        }
      ]
    },
    {
      title: 'Employed',
      name: 'employed',
      description: 'WIP, could be a API call to some source of authorities',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'material'}
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      date: 'productionDate',
      type: '_type'
    },
    prepare (selection) {
      const {type, date} = selection
      return {
        title: `${capitalize(type)}${date ? ', dated ' + date : ''}`
      }
    }
  }
}
