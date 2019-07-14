var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent group

export default {
  title: 'Move',
  name: 'move',
  type: 'document',
  fields: [
    {
      name: 'editorialState',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Working draft', value: 'workingDraft'},
          {title: 'Needs review', value: 'review'},
          {title: 'Published', value: 'published'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      name: 'accessState',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Private/Secret', value: 'secret'},
          {title: 'Open', value: 'open'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      title: 'Moved',
      name: 'moved',
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
      title: 'Moved from',
      name: 'movedFrom',
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
      title: 'Moved to',
      name: 'movedTo',
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
      title: 'Timespan',
      name: 'timespan',
      type: 'array',
      of: [{type: 'timespan'}],
      validation: Rule => Rule.length(1).warning('You should only register one timespan')
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
