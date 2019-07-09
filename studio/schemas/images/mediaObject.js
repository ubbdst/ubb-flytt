export default {
    title: 'Media object',
    name: 'mediaObject', 
    type: 'image',
    options: {
        hotspot: true
    },
    fields: [
        {
            title: 'Url',
            name: 'url',
            type: 'url',
            options: {
                isHighlighted: true
            }
        },
        {
            title: 'Caption',
            name: 'caption',
            type: 'string',
            options: {
                isHighlighted: true
            }
        },
        {
            title: 'Credit',
            name: 'credit',
            type: 'string',
            options: {
                isHighlighted: true
            }
        },
        {
            title: 'Alternative text',
            name: 'alt',
            description: 'Important for SEO and accessiblity.',
            type: 'string',
            options: {
                isHighlighted: true
            },
            validation: Rule => Rule.error('You have to fill out the alternative text.').required(),
        },
        {
            title: 'Link',
            name: 'link',
            type: 'url',
            options: {
                isHighlighted: true
            }
        },
        {
            title: 'Link target',
            name: 'linkTarget',
            type: 'string',
            options: {
                isHighlighted: true
            }
        },
    ],
    preview: {
        select: {
            imageUrl: 'asset.url',
            title: 'caption'
        }
    }
}