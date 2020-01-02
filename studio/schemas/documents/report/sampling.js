export default {
  title: 'Sampling',
  name: 'sampling',
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
            {type: 'place'},
            {type: 'group'}
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
      date: 'productionDate'
    },
    prepare (selection) {
      const {date} = selection
      return {
        title: `Transformation${date ? ', dated ' + date : ''}`
      }
    }
  }
}
