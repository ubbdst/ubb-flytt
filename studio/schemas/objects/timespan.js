export default {
    title: 'Timespan',
    name: 'timespan',
    type: 'object',
    fields: [
        {
            title: 'Begin of the begin',
            name: 'beginOfTheBegin',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
                calendarTodayLabel: 'Today'
            },
            // Validation on min/max date does not work, also handling of undefined is sub par
            // validation: Rule => Rule.max(Rule.valueOfField('endOfTheBegin')).max(Rule.valueOfField('BeginOfTheEnd')).max(Rule.valueOfField('endOfTheEnd'))
        },
        {
            title: 'End of the begin',
            name: 'endOfTheBegin',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
                calendarTodayLabel: 'Today'
            }
        },
        {
            title: 'Date',
            name: 'date',
            type: 'datetime',
            options: {
                dateFormat: 'YYYY-MM-DD',
                calendarTodayLabel: 'Today'
            }
        },
        {
            title: 'Begin of the end',
            name: 'beginOfTheEnd',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
                calendarTodayLabel: 'Today'
            }
        },
        {
            title: 'End of the end',
            name: 'endOfTheEnd',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
                calendarTodayLabel: 'Today'
            }
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
            bb: 'beginOfTheBegin',
            eb: 'endOfTheBegin',
            be: 'beginOfTheEnd',
            ee: 'endOfTheEnd',
            blocks: 'description'
        },
        prepare(selection) {
            const {bb, eb, be, ee, blocks} = selection
            const block = (blocks || []).find(block => block._type === 'block');
    
            return {
                title: `${bb ? bb : ''}${bb && eb ? '~' : ''}${eb ? eb : ''}` + `${(bb || eb) && (be || ee) ? ' / ' : ''}` + `${be ? be : ''}${be && ee ? '~' : ''}${ee ? ee : ''}`,
                description: block
                    ? block.children
                    .filter(child => child._type === 'span')
                    .map(span => span.text)
                    .join('')
                    : 'No description'
            }
        }
    } 
}