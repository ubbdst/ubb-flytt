/* eslint-disable no-template-curly-in-string */
import jsonata from 'jsonata'
import client from 'part:@sanity/base/client'

import {rights} from '../vocabularies/default'

export default {
  title: 'Made Object',
  name: 'madeObject',
  type: 'document',
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
      name: 'additionalInformation',
      title: 'Alternative names, identifiers and descriptions',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'visualObject',
      title: 'Fields related to visual objects',
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
      name: 'accessStatus',
      type: 'string',
      fieldset: 'state',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Private/Secret', value: 'secret'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    },
    {
      title: 'Preferred identifier',
      name: 'preferredIdentifier',
      fieldset: 'minimum',
      type: 'string',
      validation: Rule => Rule.required().custom(async prefId => {
        const docs = await client.fetch('*[preferredIdentifier == "${prefId}" && !(_id in path("drafts.**"))] { preferredIdentifier }', {prefId})
        return docs.length > 1 ? 'Value is not unique' : true
      })
    },
    {
      title: 'Classified as',
      name: 'hasType',
      description: 'WIP, should use API',
      fieldset: 'minimum',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        service: 'aat',
        childOf: 'aat:1000000'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Title',
      name: 'label',
      fieldset: 'minimum',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      description: 'A shortish description',
      fieldset: 'minimum',
      type: 'localeBlock'
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
      ],
      options: {
        editModal: 'fullscreen'
      }
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
      }],
      options: {
        editModal: 'fullscreen'
      }
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
      typeOfObject: 'hasType',
      blocks: 'description',
      media: 'mainRepresentation'
    },
    prepare (selection) {
      const {title, id, typeOfObject, blocks, media} = selection
      const expression = jsonata('nb[0]')
      const block = expression.evaluate(blocks)

      return {
        title: title,
        subtitle: `${id}${typeOfObject ? ', ' + typeOfObject[0] : ''}`,
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
        {field: 'title', direction: 'desc'}
      ]
    },
    {
      title: 'Title, Å-A',
      name: 'title',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Preferred identifier, Descending',
      name: 'preferredIdentifier',
      by: [
        {field: 'title', direction: 'desc'}
      ]
    },
    {
      title: 'Preferred identifier, Ascending',
      name: 'preferredIdentifier',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ]
}
