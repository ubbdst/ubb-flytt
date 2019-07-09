export default {
    title: 'Death',
    name: 'death',
    fieldsets: [
        {
            name: 'time', 
            title: 'Time',
            options: {collapsible: false, collapsed: false}
        }
    ],
    type: 'object',
    fields: [
        {
            title: 'Carried out by',
            name: 'carriedOutBy',
            type: 'array',
            of: [{ type: 'actorInRole' }]
        },
        {
            title: 'Timespan',
            name: 'timespan',
            fieldset: 'time',
            type: 'array',
            of: [{ type: 'timespan' }],
            validation: Rule => Rule.length(1).warning('You should only register one timespan')
        },
        {
            title: 'Description',
            name: 'description',
            type: 'array', 
            of: [{type: 'block'}]
        },  
    ],
    preview: {
        select: {
            date: 'date',
        },
        prepare(selection) {
            const {date} = selection
                return {
                    title: `Death${date ? ', dated ' + date : ''}`
                }
        }
    }
}