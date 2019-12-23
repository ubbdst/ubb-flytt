import {FaTruckLoading} from 'react-icons/fa'

var capitalize = require('capitalize')

export default {
  title: 'Move',
  name: 'move',
  type: 'document',
  icon: FaTruckLoading,
  fieldsets: [
    {
      name: 'state',
      title: 'State',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      title: 'Redaksjonell status',
      titleEN: 'Editorial state',
      name: 'editorialState',
      type: 'string',
      fieldset: 'state',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Utkast', value: 'workingDraft'},
          {title: 'Trenger gjennomgang', value: 'review'},
          {title: 'Publisert', value: 'published'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      title: 'Tilgangsstatus',
      titleEN: 'Access state',
      name: 'accessState',
      type: 'string',
      fieldset: 'state',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Privat', value: 'secret'},
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
