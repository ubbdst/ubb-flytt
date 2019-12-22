var capitalize = require('capitalize')

export default {
  title: 'Production',
  name: 'production',
  type: 'object',
  fields: [
    {
      title: 'Classified as',
      name: 'hasType',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'typeClass'}],
          options: {
            filter: 'references(*[_type == "systemCategory" && label.nor in [$sysCat]]._id)',
            filterParams: {sysCat: 'Hendelsestype'}
          }
        }
      ]
    },
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
      title: 'Took place at',
      name: 'tookPlaceAt',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'place'}
          ]
        }
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
      title: 'Used general technique',
      name: 'usedGeneralTechnique',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'typeClass'}],
          options: {
            filter: 'references(*[_type == "systemCategory" && label.nor in [$sysCat]]._id)',
            filterParams: {sysCat: 'Teknikk'}
          }
        }
      ]
    },
    {
      title: 'Use spesific technique',
      name: 'usedSpecificTechnique',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'designOrProcedure'}
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
