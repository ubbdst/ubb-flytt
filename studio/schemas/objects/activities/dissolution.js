var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent group

export default {
    title: 'Dissolution',
    name: 'dissolution',
    type: 'object',
    fields: [
        {
            title: 'Timespan',
            name: 'timespan',
            type: 'array',
            of: [{ type: 'timespan' }],
            validation: Rule => Rule.length(1).warning('You should only register one timespan')
        },
        {
            title: 'Motivated by',
            name: 'wasMotivatedBy',
            type: 'array',
            of: [
                { type: 'reference',
                    to: [
                        { type: 'event' },
                    ]
                }
            ]
        },
        {
            title: 'Description',
            name: 'description',
            type: 'genericText',
        }
    ],
    preview: {
        select: {
            type: '_type'
        },
        prepare(selection) {
          const {type} = selection
            return {
                title: `${capitalize(type)}`
            }
        }
    }
}