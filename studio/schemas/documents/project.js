import {FaProjectDiagram} from 'react-icons/fa'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: FaProjectDiagram,
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
      title: 'Active?',
      name: 'active',
      type: 'boolean',
      fieldset: 'state'
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
            filterParams: {sysCat: 'Prosjekttype'}
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
      title: 'Timespan',
      name: 'timespan',
      type: 'array',
      of: [
        {type: 'timespan'}
      ]
    },
    {
      title: 'Description',
      name: 'description',
      type: 'localeBlockReport'
    },
    /* {
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
    }, */
    {
      title: 'Sub projects',
      name: 'consistsOf',
      type: 'array',
      of: [
        {type: 'project'}
      ],
      options: {
        editModal: 'fullscreen'
      }
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
      published: 'accessState',
      active: 'active'
    },
    prepare (selection) {
      const {type, title, blocks, published, active} = selection
      const block = (blocks || []).find(block => block._type === 'block')
      const secret = published === 'secret' ? '🔒' : ''
      const a = active ? 'Active' : 'Completed'

      return {
        title: title,
        subtitle: secret + ' ' + a + (type || ''),
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
