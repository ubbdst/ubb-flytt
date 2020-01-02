import {GiCrackedGlass} from 'react-icons/gi'

export default {
  title: 'Report',
  name: 'report',
  type: 'document',
  icon: GiCrackedGlass,
  fieldsets: [
    {
      name: 'state',
      title: 'State',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'documentation',
      title: 'Documentation',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'technique',
      title: 'Technique',
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
      title: 'Description',
      name: 'description',
      type: 'localeBlockReport'
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
      title: 'Activity stream',
      description: 'Events and activities connected to this object',
      name: 'activityStream',
      type: 'array',
      of: [
        {type: 'measurement'},
        {type: 'sampling'},
        {type: 'treatment'}
      ]
    },
    {
      title: 'Used general technique',
      name: 'usedGeneralTechnique',
      fieldset: 'technique',
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
      title: 'Used object of type',
      name: 'usedObjectOfType',
      fieldset: 'technique',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'typeClass'}],
          options: {
            filter: 'references(*[_type == "systemCategory" && label.nor in [$sysCat]]._id)',
            filterParams: {sysCat: 'Objekt-/verkstype'}
          }
        }
      ]
    },
    {
      title: 'Used spesific object',
      name: 'usedSpecificObject',
      fieldset: 'technique',
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
      title: 'Motivated',
      name: 'motivated',
      type: 'array',
      of: [
        {type: 'treatment'}
      ]
    },
    {
      title: 'Documentation images',
      name: 'documentationImage',
      fieldset: 'documentation',
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
      fieldset: 'documentation',
      type: 'array',
      of: [{type: 'file'}]
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
