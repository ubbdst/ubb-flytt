import {FaTag} from 'react-icons/fa'

export default {
  title: 'Assessment type',
  name: 'assessmentType',
  type: 'document',
  icon: FaTag,
  fieldsets: [
    {
      name: 'state',
      title: 'State',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      name: 'editorialState',
      type: 'string',
      fieldset: 'state',
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
      fieldset: 'state',
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
      title: 'Preferred label',
      name: 'label',
      type: 'localeString'
    },
    {
      title: 'Alternative label',
      name: 'altLabel',
      type: 'localeString'
    },
    {
      title: 'Broader',
      name: 'broader',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'typeClass'}]}
      ]
    },
    {
      title: 'Narrower',
      name: 'narrower',
      description: 'Trenger vi narrower? Blir mye å registrere...',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'typeClass'}]}
      ]
    },
    {
      title: 'Domain',
      name: 'domain',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'typeClass'}]}
      ]
    },
    {
      title: 'Activity stream',
      description: 'Events and activities connected to this object',
      name: 'events',
      type: 'array',
      of: [
        {type: 'creation'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'label.nor',
      broader: 'broader.0.label.nor'
    },
    prepare (selection) {
      const {title, broader} = selection
      return {
        title: title,
        subtitle: broader ? `⬆️` + broader : '🔝 Overordnet type/konsept'
      }
    }
  }
}
