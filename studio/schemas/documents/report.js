import {FaPenAlt} from 'react-icons/fa'

export default {
  title: 'Report',
  name: 'report',
  type: 'document',
  icon: FaPenAlt,
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
      title: 'Title',
      name: 'label',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      title: 'Classified as',
      name: 'hasType',
      description: 'WIP, should use API',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'assessmentType'}]}
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Condition assignment',
      name: 'conditionAssignment',
      type: 'array',
      of: [
        {type: 'valueSlider'}
      ]
    },
    {
      title: 'About',
      name: 'concerned',
      description: 'Which collection(s) or object(s) is this an assessment of.',
      type: 'array',
      of: [
        {type: 'reference',
          to: [
            {type: 'madeObject'},
            {type: 'collection'}
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
      title: 'Activity stream',
      description: 'Events and activities connected to this object',
      name: 'activityStream',
      type: 'array',
      of: [
        {type: 'measurement'}
      ],
      options: {
        editModal: 'fullscreen'
      }
    },
    {
      title: 'Parts',
      description: 'Sub reports',
      name: 'consistsOf',
      type: 'array',
      of: [
        {type: 'report'}
      ],
      options: {
        editModal: 'fullscreen'
      }
    },
    {
      title: 'Documentation images before',
      name: 'documentationImage',
      options: {
        layout: 'grid'
      },
      type: 'array',
      of: [
        {type: 'figure'}
      ]
    }
  ],
  preview: {
    select: {
      type: 'hasType.0.label.nor',
      title: 'label.nor',
      blocks: 'description.nor'
    },
    prepare (selection) {
      const {type, title, blocks} = selection
      const block = (blocks || []).find(block => block._type === 'block')

      return {
        title: title,
        subtitle: type,
        description: block
          ? block.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          : 'No description'
      }
    }
  },
  orderings: [
    {
      title: 'Title, A-Å',
      name: 'title',
      by: [
        {field: 'title', direction: 'desc'}
      ]
    },
    {
      title: 'Title, Å-A',
      name: 'title',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ]
}
