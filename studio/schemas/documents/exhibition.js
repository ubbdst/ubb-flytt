export default {
    title: 'Exhibition',
    name: 'exhibition',
    description: 'Should be fetched from KulturNav',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Description',
            name: 'description',
            type: 'array', 
            of: [
                {type: 'block'},
                {type: 'reference',
                    to: [
                        {type: 'timeline'}
                    ],
                }
            ]
        },
    ]
}