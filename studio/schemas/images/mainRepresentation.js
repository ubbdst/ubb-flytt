export default {
    name: 'mainRepresentation',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true
    },
    fields: [
        {
            title: 'Caption',
            name: 'caption',
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