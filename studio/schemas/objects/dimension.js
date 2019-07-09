import { units } from '../vocabularies/default'

export default {
    title: 'Dimension',
    name: 'dimension',
    type: 'object',
    fields: [
        {
            title: 'Classified as',
            name: 'hasType',
            description: 'WIP, should use API',
            type: 'string',
            options: {
                list: [
                    { title: 'Width', value: 'width' },
                    { title: 'Height', value: 'height' },
                    { title: 'Depth', value: 'depth' },
                    { title: 'Diameter', value: 'diameter' },
                    { title: 'Weight', value: 'weight' }
                ],
                layout: 'radio',
                direction: 'horizontal'
            },
            validation: Rule => Rule.required(),
        },
        {
            title: 'Value',
            name: 'value',
            type: 'number'
        },
        {
            title: 'Measurement unit',
            name: 'hasUnit',
            description: 'WIP, should use API',
            type: 'string',
            options: {
                list: units
            },
            validation: Rule => Rule.required(),
        },
    ],
    preview: {
        select: {
            type: 'hasType',
            value: 'value',
            unit: 'hasUnit',
        },
        prepare(selection) {
            const {type, value, unit} = selection
                return {
                    title: `${type ? type : ''}: ${value ? value : ''} ${unit ? unit : ''}`
                }
        }
    }
}