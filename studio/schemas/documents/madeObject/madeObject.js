import jsonata from 'jsonata'
/* import client from 'part:@sanity/base/client' */

import {FaBookDead} from 'react-icons/fa'
import {rights} from '../../vocabularies/default'

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
      title: 'Status',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'minimum',
      title: 'Felt for minimumsregistrering',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'representation',
      title: 'Hovedbilde og IIIF manifest',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'partsOfTheObject',
      title: 'Felt relatert til deler eller seksjoner',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'additionalInformation',
      title: 'Alternative navn, identifikatorer og beskrivelser',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'visualObject',
      title: 'Felt relatert til visuelle objekt',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'linguisticObject',
      title: 'Felt relatert til tekstlige objekt',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'physicalDescription',
      title: 'Felt relatert til fysisk beskrivelse',
      options: {collapsible: true, collapsed: true}
    },
    {
      name: 'collectionManagement',
      title: 'Felt relatert til samlingspleie',
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
      description: 'Hovedmanifestet til objektet, for eksempel: https://digi.ub.uni-heidelberg.de/diglit/iiif/cpgraec132/manifest.json. Det kan også være en lenke til en sekvens eller et utvalg. For eksempel: https://digi.ub.uni-heidelberg.de/diglit/iiif/cpgraec132/range/r2',
      descriptionEN: 'The main manifest of this object',
      fieldset: 'representation',
      name: 'mainManifest',
      type: 'url'
    },
    {
      title: 'Foretrukket identifikator',
      titleEN: 'Preferred identifier',
      name: 'preferredIdentifier',
      fieldset: 'minimum',
      type: 'string'
      /* validation: Rule => Rule.required().custom(async prefId => {
        // eslint-disable-next-line no-template-curly-in-string
        const docs = await client.fetch('*[preferredIdentifier == "${prefId}" && !(_id in path("drafts.**"))] { preferredIdentifier }', {prefId})
        return docs.length > 1 ? 'Value is not unique' : true
      }) */
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
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      name: 'hasType',
      description: '',
      descriptionEN: '',
      fieldset: 'minimum',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'typeClass'}],
          options: {
            filter: 'references(*[_type == "systemCategory" && label.nor in [...($sysCat)]]._id)',
            filterParams: {sysCat: ['Objekt-/verkstype', 'Seksjonstype']}
          }
        }
      ],
      validation: Rule => Rule.required()
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
      title: 'Emne',
      name: 'subject',
      fieldset: 'minimum',
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
      title: 'Beskrivelse',
      titleEN: 'Description',
      name: 'description',
      description: 'En kort beskrivelse.',
      descriptionEN: 'A shortish description',
      fieldset: 'minimum',
      type: 'localeBlockSimple'
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
      title: 'Relaterte ting',
      description: 'Uspesifisert relasjon til en annen ting',
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
      title: 'Nåværende eier',
      name: 'hasCurrentOwner',
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
      title: 'Tidligere eller nåværende eier',
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
      title: 'Består av',
      titleEN: 'Composed of',
      description: 'Andre identifiserte objekt som er en del av dette objektet. For eksempel: bokomslaget eller "Sult" av Hamsun bundet sammen med andre verk.',
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
      type: 'localeBlockSimple',
      fieldset: 'physicalDescription'
    },
    {
      title: 'Antall sider',
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
      title: 'Laget av',
      titleEn: 'Consists of',
      description: 'Laget av material, for eksempel lær, pertament eller noe annet.',
      name: 'consistsOf',
      type: 'array',
      fieldset: 'physicalDescription',
      of: [{
        type: 'reference',
        to: [
          {type: 'material'}
        ]
      }
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
        subtitle: secret + (id ? id + ', ' : '') + type,
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
