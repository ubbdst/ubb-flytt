export default {
    title: 'Group',
    name: 'group',
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
            of: [{type: 'block'}]
        },  
        {
            title: 'Activity stream',
            description: 'Events and activities connected to this object',
            name: 'activityStream',
            type: 'array',
            of: [
                { type: 'formation' },
                { type: 'joining' },
                { type: 'leaving' },
                { type: 'dissolution' },
            ],
            options: {
                editModal: 'fullscreen'
            },
        },
    ]
}