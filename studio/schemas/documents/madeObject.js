import {FaBookDead} from 'react-icons/fa'

import jsonata from 'jsonata'
import client from 'part:@sanity/base/client'

import {rights} from '../vocabularies/default'

export default {
  title: 'Objekt',
  titleEN: 'Made Object',
  description: 'Menneskapte objekt',
  name: 'madeObject',
  type: 'document',
  initialValue: {
    editorialState: 'workingDraft',
    accessState: 'secret'
  },
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
      title: 'Foretrukket identifikator',
      titleEN: 'Preferred identifier',
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
      title: 'Tittel',
      titleEN: 'Title',
      name: 'label',
      description: 'WIP, endre til localeBlock',
      descriptionEN: 'WIP, change to localeBlock',
      fieldset: 'minimum',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Titles',
      name: 'title',
      description: 'Add all known titles',
      fieldset: 'minimum',
      type: 'array',
      of: [
        {type: 'name'}
      ],
      options: {
        editModal: 'popup'
      }
    },
    {
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      name: 'hasType',
      description: 'WIP, bør bruke API',
      descriptionEN: 'WIP, should use API',
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
      title: 'Beskrivelse',
      titleEN: 'Description',
      name: 'description',
      description: 'En kort beskrivelse.',
      descriptionEN: 'A shortish description',
      fieldset: 'minimum',
      type: 'localeBlockSimple'
    },
    {
      title: 'Rettigheter og lisensiering',
      titleEN: 'Rights',
      name: 'rights',
      description: 'Velg den korrekt lisensen eller rettighetserklæringen.',
      descriptionEN: 'Choose the correct lisense or mark',
      fieldset: 'minimum',
      type: 'string',
      options: {
        list: rights
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Hovedbilde',
      titleEN: 'Main image',
      name: 'mainRepresentation',
      fieldset: 'representation',
      description: 'Velg et bilde fra egen samling eller fra NB.no. Legg til bildetekst ved å trykke "Edit".',
      descriptionEN: 'Choose a image from out own collection or from NB.no.',
      type: 'mainRepresentation'
    },
    {
      title: 'Hovedmanifest',
      titleEN: 'Main manifest',
      description: 'Hovedmanifestet til objektet.',
      descriptionEN: 'The main manifest of this object',
      fieldset: 'representation',
      name: 'mainManifest',
      type: 'url'
    },
    {
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Hendelser og aktiviteter knyttet til dette objektet.',
      descriptionEN: 'Events and activities connected to this object',
      name: 'activityStream',
      type: 'array',
      of: [
        {type: 'production'},
        {type: 'transformation'},
        {type: 'reference', to: [{type: 'acquisition'}]},
        {type: 'move'},
        {type: 'activity'},
        {type: 'endingActivity'}
      ]
    },
    {
      title: 'Avbilder',
      titleEN: 'Depicts',
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
      title: 'Består av',
      titleEN: 'Composed of',
      description: 'Andre identifiserte objekt som er en del av dette objektet. Bok -> Omslag.',
      descriptionEN: 'Other identified madeObjects this object is composed of',
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
      title: 'Emne',
      name: 'subject',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'concept'}
          ]
        }
      ]
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
      type: 'hasType.0.label.nor',
      blocks: 'description',
      media: 'mainRepresentation',
      published: 'accessState'
    },
    prepare (selection) {
      const {title, id, type, blocks, media, published} = selection
      const expression = jsonata('nor[0]')
      const block = expression.evaluate(blocks)
      const secret = published === 'secret' ? '🔒' : ''

      return {
        title: title,
        subtitle: secret + id + ', ' + type,
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
