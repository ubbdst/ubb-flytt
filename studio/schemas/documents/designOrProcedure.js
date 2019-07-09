export default {
    title: 'Design or procedure',
    name: 'designOrProcedure',
    type: 'document',
    fields: [
        {
            name: 'editorialState',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
                list: [
                    { title: 'Working draft', value: 'workingDraft' },
                    { title: 'Needs review', value: 'review' },
                    { title: 'Published', value: 'published' }
                ],
                layout: 'radio',
                direction: 'horizontal'
            }
        },
        {
            name: 'accessState',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
                list: [
                    { title: 'Open', value: 'open' },
                    { title: 'Private/Secret', value: 'secret' },
                ],
                layout: 'radio',
                direction: 'horizontal'
            }
        },
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Description',
            name: 'description',
            type: 'array', 
            of: [{type: 'block'}]
        },
    ]
}