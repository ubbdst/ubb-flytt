import {FaTruckLoading} from 'react-icons/fa'

var capitalize = require('capitalize')

export default {
  title: 'Move',
  name: 'move',
  type: 'document',
  icon: FaTruckLoading,
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
      title: 'Carried out by',
      name: 'carriedOutBy',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'actor', title: 'Actor'}]}
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
      title: 'Description',
      name: 'description',
      type: 'localeBlockReport'
    },
    {
      title: 'Moved from',
      name: 'movedFrom',
      type: 'reference',
      to: [
        {type: 'place'}
      ]
    },
    {
      title: 'Moved to',
      name: 'movedTo',
      type: 'reference',
      to: [
        {type: 'place'}
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
    }
  ],
  preview: {
    select: {
      type: '_type',
      published: 'accessState'
    },
    prepare (selection) {
      const {type, published} = selection
      const secret = published === 'secret' ? '🔒' : ''

      return {
        title: `${capitalize(type)}`,
        subtitle: secret
      }
    }
  }
}
