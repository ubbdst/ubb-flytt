export default {
    title: 'Beginning activity',
    name: 'beginningActivity',
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
            type: 'array',
            of: [{ type: 'timespan' }],
            validation: Rule => Rule.length(1).warning('You should only register one timespan')
        },
        {
            title: 'Type',
            name: 'type',
            type: 'array',
            of: [{ type: 'string' }]
        }
    ],
    preview: {
        select: {
            type: 'type'
        },
        prepare(selection) {
          const {type} = selection
            return {
                title: `${type}`
            }
        }
    }
}