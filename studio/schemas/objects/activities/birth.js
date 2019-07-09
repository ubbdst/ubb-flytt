var capitalize = require('capitalize')

export default {
    title: 'Birth',
    name: 'birth',
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
            type: '_type'
        },
        prepare(selection) {
            const {type, date} = selection
                return {
                    title: `${date ? date : 'No date'}`,
                    subtitle: `${capitalize(type)}`
                }
        }
    }
}