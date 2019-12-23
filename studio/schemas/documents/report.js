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
      title: 'Title',
      name: 'label',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      title: 'Classified as',
      name: 'hasType',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'typeClass'}],
          options: {
            filter: 'references(*[_type == "systemCategory" && label.nor in [$sysCat]]._id)',
            filterParams: {sysCat: 'Rapporttype'}
          }
        }
      ],
      validation: Rule => Rule.required()
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
      title: 'Used general technique',
      name: 'usedGeneralTechnique',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'typeClass'}],
          options: {
            filter: 'references(*[_type == "systemCategory" && label.nor in [$sysCat]]._id)',
            filterParams: {sysCat: 'Teknikk'}
          }
        }
      ]
    },
    {
      title: 'Used spesific technique',
      name: 'usedSpecificTechnique',
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
      title: 'Condition assignment',
      name: 'conditionAssignment',
      type: 'array',
      of: [
        {type: 'valueSlider'}
      ]
    },
    {
      title: 'Purpose',
      name: 'purpose',
      type: 'localeBlockSimple'
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
      title: 'Sub reports',
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
      title: 'Part assessments',
      description: 'Sub assessments on the objects features or sections',
      name: 'partAssessment',
      type: 'array',
      of: [
        {type: 'reportPart'}
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
    },
    {
      title: 'Documented in',
      name: 'documentedIn',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'file'}
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      type: 'hasType.0.label.nor',
      title: 'label.nor',
      blocks: 'description.nor',
      published: 'accessState'
    },
    prepare (selection) {
      const {type, title, blocks, published} = selection
      const block = (blocks || []).find(block => block._type === 'block')
      const secret = published === 'secret' ? '🔒' : ''

      return {
        title: title,
        subtitle: secret + type,
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
        {field: 'label', direction: 'desc'}
      ]
    },
    {
      title: 'Title, Å-A',
      name: 'title',
      by: [
        {field: 'label', direction: 'asc'}
      ]
    }
  ]
}
