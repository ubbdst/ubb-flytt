var capitalize = require('capitalize')

export default {
  title: 'Birth',
  name: 'birth',
  type: 'object',
  fieldsets: [
    {
      name: 'time',
      title: 'Time',
      options: {collapsible: false, collapsed: false}
    }
  ],
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
      fieldset: 'time',
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
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}]
    }
  ],
  preview: {
    select: {
      date: 'date',
      type: '_type'
    },
    prepare (selection) {
      const {type, date} = selection
      return {
        title: `${date || 'No date'}`,
        subtitle: `${capitalize(type)}`
      }
    }
  }
}
