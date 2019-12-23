import {FaHandPointDown} from 'react-icons/fa'

export default {
  title: 'Object feature',
  name: 'objectFeature',
  type: 'document',
  icon: FaHandPointDown,
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
            filterParams: {sysCat: 'Egenskapstype'}
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Main image',
      name: 'mainRepresentation',
      description: 'Big, lovely image of the object. TODO: this should be a image in the manifest, optionally cropped',
      type: 'mainRepresentation'
    },
    {
      title: 'About',
      name: 'concerned',
      description: 'Which object(s) is this an feature of.',
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
        subtitle: (type || ''),
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
