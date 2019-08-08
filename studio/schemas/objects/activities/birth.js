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
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
      blocks: 'description',
      type: '_type'
    },
    prepare (selection) {
      const {type, bb, eb, date, be, ee} = selection
      return {
        title: `${date || ''}${bb || ''}${bb && eb ? '~' : ''}${eb || ''}` + `${(bb || eb) && (be || ee) ? ' / ' : ''}` + `${be || ''}${be && ee ? '~' : ''}${ee || ''}`,
        subtitle: `${capitalize(type)}`
      }
    }
  }
}
