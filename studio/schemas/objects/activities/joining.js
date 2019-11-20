var capitalize = require('capitalize')

export default {
  title: 'Joining',
  name: 'joining',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'hasType',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'eventType'}]}
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
      title: 'Joined',
      name: 'joinedBy',
      description: 'Actor(s) that joined this group',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'actor'},
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
      type: '_type',
      date: 'timespan.0.date'
    },
    prepare (selection) {
      const {type, date} = selection
      return {
        title: `${capitalize(type)}${date ? ' at ' + date : ''}`
      }
    }
  }
}
