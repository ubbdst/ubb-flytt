export default {
    title: 'Creation',
    name: 'creation',
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
            of: [{ type: 'timespan' }]
        }
    ],
    preview: {
        select: {
            date: 'productionDate',
        },
        prepare(selection) {
          const {date} = selection
            return {
                title: 'Production, dated ' + date,
            }
        }
    }
}