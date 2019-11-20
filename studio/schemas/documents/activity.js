export default {
  title: 'Activity',
  name: 'activity',
  type: 'document',
  fieldsets: [
    {
      name: 'purpose',
      title: 'Fields related to the purpose of the activity',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'objects',
      title: 'Fields related to the objects or object types used',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'technique',
      title: 'Fields related to techniques, designs or procedures used',
      options: {collapsible: true, collapsed: true}
    }
  ],
  fields: [
    {
      title: 'Title',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Activity type',
      name: 'hasType',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'activityType'}]}
      ]
    },
    {
      title: 'Carried out by',
      name: 'carriedOutBy',
      type: 'array',
      of: [{type: 'actorInRole'}]
    },
    {
      title: 'Target',
      name: 'target',
      type: 'reference',
      to: [
        {type: 'collection'},
        {type: 'actor'},
        {type: 'group'}
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
      title: 'Description',
      name: 'description',
      type: 'genericText'
    },
    {
      title: 'Influenced by',
      name: 'influencedBy',
      description: '',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'madeObject'},
            {type: 'event'},
            {type: 'place'},
            {type: 'work'},
            {type: 'actor'},
            {type: 'group'}
          ]
        }
      ]
    },
    {
      title: 'Used object of type',
      name: 'usedObjectOfType',
      description: '',
      fieldset: 'objects',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'typeClass'}
          ]
        }
      ]
    },
    {
      title: 'Used specific object',
      name: 'usedspecificObject',
      description: '',
      fieldset: 'objects',
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
      title: 'Used general technique',
      name: 'usedGeneralTechnique',
      description: '',
      fieldset: 'technique',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'typeClass'}
          ]
        }
      ]
    },
    {
      title: 'Used specific technique',
      name: 'usedspecificTechnique',
      description: '',
      fieldset: 'technique',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'designOrProcedure'}
          ]
        }
      ]
    },
    {
      title: 'General purpose',
      name: 'generalPurpose',
      description: '',
      fieldset: 'purpose',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'typeClass'}
          ]
        }
      ]
    },
    {
      title: 'Intended use of',
      name: 'intendedUseOf',
      description: '',
      fieldset: 'purpose',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'madeObject'}
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'label',
      type: 'hasType.0.label.nor'
    },
    prepare (selection) {
      const {title, type} = selection
      return {
        title: title,
        subtitle: type
      }
    }
  }
}
