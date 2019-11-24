export default {
  title: 'Measurement',
  name: 'measurement',
  type: 'object',
  fields: [
    {
      title: 'Timespan',
      name: 'timespan',
      type: 'array',
      of: [{type: 'timespan'}],
      validation: Rule => Rule.length(1).warning('You should only register one timespan')
    },
    {
      title: 'Carried out by',
      name: 'carriedOutBy',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'actor', title: 'Actor'}]}
      ]
    },
    {
      title: 'Dimension',
      description: 'Events and activities connected to this object',
      name: 'observedDimension',
      type: 'array',
      of: [
        {type: 'dimension'}
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
    }
  ],
  preview: {
    select: {
      date: 'date'
    },
    prepare (selection) {
      const {date} = selection
      return {
        title: `Measurement${date ? ', dated ' + date : ''}`
      }
    }
  }
}
