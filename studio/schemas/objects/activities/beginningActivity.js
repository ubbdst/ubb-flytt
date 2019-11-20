export default {
  title: 'Beginning activity',
  name: 'beginningActivity',
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
      title: 'Type',
      name: 'hasType',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'eventType'}]}
      ]
    }
  ],
  preview: {
    select: {
      type: 'type'
    },
    prepare (selection) {
      const {type} = selection
      return {
        title: `${type}`
      }
    }
  }
}
