var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent group

export default {
  title: 'Formation',
  name: 'formation',
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
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Formed from',
      name: 'wasFormedFrom',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'group'}
          ]
        }
      ]
    },
    {
      title: 'Timespan',
      name: 'timespan',
      type: 'array',
      of: [{type: 'timespan'}],
      validation: Rule => Rule.length(1).warning('You should only register one timespan')
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
      title: 'Motivated by',
      name: 'wasMotivatedBy',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'event'}
          ]
        }
      ]
    },
    {
      title: 'Description',
      name: 'description',
      type: 'genericText'
    }
  ],
  preview: {
    select: {
      type: '_type'
    },
    prepare (selection) {
      const {type} = selection
      return {
        title: `${capitalize(type)}`
      }
    }
  }
}
