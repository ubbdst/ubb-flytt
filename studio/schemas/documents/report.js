import { reportTypes } from '../vocabularies/default'

export default {
    title: 'Report',
    name: 'report',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Overall condition',
            name: 'condition',
            description: '1 is horrible, 100 is MINT!',
            type: 'number',
            options: {
                layout: 'slider',
                range: {min: 1, max: 100, step: 1}
            }
        }, 
        {
            title: 'Classified as',
            name: 'hasType',
            description: 'WIP, should use API',
            type: 'string',
            options: {
                list: reportTypes,
                service: 'AAT',
                childOf: 'aat:1000000'
            },
            validation: Rule => Rule.required(),
        },
        {
            title: 'About',
            name: 'concerned',
            description: 'Which collection(s) or object(s) is this an assessment of.',
            type: 'array',
            of: [
                { type: 'reference',
                    to: [
                        { type: 'madeObject' },
                        { type: 'collection' }
                    ]
                }
            ]
        },
        {
            title: 'Description',
            name: 'description',
            type: 'array', 
            of: [
                {type: 'block'},
                {
                    type: 'image', 
                    fields: [
                        { 
                            title: 'Caption',
                            name: 'caption',
                            type: 'string',
                            options: {
                                isHighlighted: true
                            }
                        }
                    ], 
                    options: { 
                        hotspot: true, 
                        metadata: [ 'exif', 'location', 'lqip', 'palette']
                    }
                },
                {
                    type: 'reference',
                    to: [
                        { type: 'measurement' }
                    ]
                }
            ]
        },
        {
            title: 'Activity stream',
            description: 'Events and activities connected to this object',
            name: 'activityStream',
            type: 'array',
            of: [
                { type: 'measurement' },
            ],
            options: {
                editModal: 'fullscreen'
            },
        },
        {
            title: 'Parts',
            description: 'Sub reports',
            name: 'consistsOf',
            type: 'array',
            of: [
                { type: 'report' },
            ],
            options: {
                editModal: 'fullscreen'
            },
        },
        {
            title: 'Documentation images before',
            description: '',
            name: 'documentationImage',
            type: 'array',
            of: [
                { type: 'figure' },
            ],
        },
    ],
    preview: {
        select: {
            type: 'hasType',
            title: 'title',
            subtitle: 'preferredIdentifier',
            blocks: 'description'
        },
        prepare(selection) {
            const {type, title, subtitle, blocks} = selection;
            const block = (blocks || []).find(block => block._type === 'block');

            return {
                title: title,
                subtitle: `${assessmentTypes.find(id => id.value === type).title}, ${subtitle}`,
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