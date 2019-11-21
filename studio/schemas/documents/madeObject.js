import {FaBookDead} from 'react-icons/fa'

import jsonata from 'jsonata'
import client from 'part:@sanity/base/client'

import {rights} from '../vocabularies/default'

export default {
  title: 'Made Object',
  name: 'madeObject',
  type: 'document',
  icon: FaBookDead,
  fieldsets: [
    {
      name: 'state',
      title: 'State',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'minimum',
      title: 'Mandatory fields for minimum registration',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'representation',
      title: 'Manifest and main image',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'visualObject',
      title: 'Fields related to visual objects',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'additionalInformation',
      title: 'Alternative names, identifiers and descriptions',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'linguisticObject',
      title: 'Fields related to linguistic objects',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'physicalDescription',
      title: 'Fields related to physical descriptions',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'collectionManagement',
      title: 'Fields related to collection management',
      options: {collapsible: true, collapsed: true}
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
      title: 'Main manifest',
      description: 'The main manifest of this object',
      fieldset: 'representation',
      name: 'mainManifest',
      type: 'url'
    },
    {
      title: 'Main image',
      name: 'mainRepresentation',
      fieldset: 'representation',
      description: 'Big, lovely image of the object. TODO: this should be a image in the manifest, optionally cropped',
      type: 'mainRepresentation'
    },
    {
      title: 'Preferred identifier',
      name: 'preferredIdentifier',
      fieldset: 'minimum',
      type: 'string',
      validation: Rule => Rule.required().custom(async prefId => {
        // eslint-disable-next-line no-template-curly-in-string
        const docs = await client.fetch('*[preferredIdentifier == "${prefId}" && !(_id in path("drafts.**"))] { preferredIdentifier }', {prefId})
        return docs.length > 1 ? 'Value is not unique' : true
      })
    },
    {
      title: 'Title',
      name: 'label',
      fieldset: 'minimum',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Classified as',
      name: 'hasType',
      description: 'WIP, should use API',
      fieldset: 'minimum',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'typeClass'},
            {type: 'concept'}
          ]
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      description: 'A shortish description',
      fieldset: 'minimum',
      type: 'localeBlockSimple'
    },
    {
      title: 'Rights',
      name: 'rights',
      description: 'Choose the correct lisense or mark',
      fieldset: 'minimum',
      type: 'string',
      options: {
        list: rights
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Activity stream',
      description: 'Events and activities connected to this object',
      name: 'activityStream',
      type: 'array',
      of: [
        {type: 'production'},
        {type: 'transformation'},
        {type: 'move'},
        {type: 'activity'},
        {type: 'endingActivity'}
      ]
    },
    {
      title: 'Composed of',
      description: 'Other identified madeObjects this object is composed of',
      name: 'composedOf',
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
      title: 'Depicts',
      name: 'depicts',
      type: 'array',
      fieldset: 'visualObject',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'madeObject'},
            {type: 'actor'},
            {type: 'group'},
            {type: 'typeClass'}
          ]
        }
      ]
    },
    {
      title: 'Shown visual item',
      name: 'showsVisualItem',
      type: 'array',
      fieldset: 'visualObject',
      of: [
        {type: 'reference',
          to: [
            {type: 'visualItem'}
          ]
        }
      ]
    },
    {
      title: 'Former or current owner',
      name: 'hasFormerOrCurrentOwner',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'actor'},
            {type: 'group'}
          ]
        }
      ]
    },
    {
      title: 'Related stuff',
      name: 'relation',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'madeObject'},
            {type: 'actor'},
            {type: 'group'}
          ]
        }
      ]
    },
    {
      title: 'Titles',
      name: 'title',
      description: 'Add all known titles',
      fieldset: 'additionalInformation',
      type: 'array',
      of: [
        {type: 'name'}
      ],
      options: {
        editModal: 'popup'
      }
    },
    {
      title: 'Identifiers',
      name: 'identifiedBy',
      description: 'Add all known identifiers',
      fieldset: 'additionalInformation',
      type: 'array',
      of: [
        {type: 'identifier'}
      ],
      options: {
        editModal: 'popup'
      }
    },
    {
      title: 'Subject of',
      name: 'isSubjectOf',
      description: 'Texts about this object, both internal and other texts',
      fieldset: 'additionalInformation',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          {type: 'linguisticObject'}
        ]
      }]
    },
    /* {
      title: 'Geographic features',
      name: 'geoJSON',
      fieldset: 'visualObject',
      type: 'array',
      of: [
        {type: 'feature'}
      ]
    }, */
    {
      title: 'Carries Work',
      name: 'carries',
      type: 'array',
      fieldset: 'linguisticObject',
      of: [
        {type: 'reference',
          to: [
            {type: 'work'}
          ]
        }
      ]
    },
    {
      title: 'Physical description',
      name: 'physicalDescription',
      type: 'array',
      fieldset: 'physicalDescription',
      of: [
        {type: 'block'}
        /* {type: 'reference',
            to: [
                { type: 'actor' }
            ]
        } */
      ]
    },
    {
      title: '# of pages',
      name: 'pages',
      fieldset: 'physicalDescription',
      type: 'number'
    },
    {
      title: 'Measurement',
      name: 'measurement',
      type: 'array',
      fieldset: 'physicalDescription',
      of: [{type: 'measurement'}]
    },
    {
      title: 'Consists of',
      name: 'consistsOf',
      description: 'WIP, could be a API call to some source of material definitions',
      type: 'array',
      fieldset: 'physicalDescription',
      of: [{
        type: 'reference',
        to: [
          {type: 'material'}
        ]
      }
      ]
    },
    {
      title: 'Features',
      description: 'Features of this object is composed of',
      name: 'bearsFeature',
      fieldset: 'physicalDescription',
      type: 'array',
      of: [
        {type: 'part'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'label',
      id: 'preferredIdentifier',
      typeOfObject: 'hasType.0.prefLabel.nor',
      blocks: 'description',
      media: 'mainRepresentation'
    },
    prepare (selection) {
      const {title, id, typeOfObject, blocks, media} = selection
      const expression = jsonata('nor[0]')
      const block = expression.evaluate(blocks)

      return {
        title: title,
        subtitle: id + ', ' + typeOfObject,
        description: block
          ? block.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          : 'No description',
        media: media
      }
    }
  },
  orderings: [
    {
      title: 'Title, A-Å',
      name: 'title',
      by: [
        {field: 'label', direction: 'asc'}
      ]
    },
    {
      title: 'Title, Å-A',
      name: 'title',
      by: [
        {field: 'label', direction: 'desc'}
      ]
    },
    {
      title: 'Preferred identifier, Descending',
      name: 'preferredIdentifier',
      by: [
        {field: 'preferredIdentifier', direction: 'desc'}
      ]
    },
    {
      title: 'Preferred identifier, Ascending',
      name: 'preferredIdentifier',
      by: [
        {field: 'preferredIdentifier', direction: 'asc'}
      ]
    }
  ]
}
