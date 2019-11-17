import {appelationTypes} from '../vocabularies/default'

export default {
  title: 'Name',
  name: 'name',
  type: 'object',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Type',
      name: 'nameType',
      type: 'string',
      options: {
        list: appelationTypes,
        layout: 'radio'
      }
    },
    {
      title: 'Timespan',
      name: 'timespan',
      type: 'array',
      of: [{type: 'timespan'}],
      validation: Rule => Rule.length(1).warning('You should only register one timespan')
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}]
    }
  ],
  preview: {
    select: {
      name: 'name',
      type: 'nameType'
    },
    prepare (selection) {
      const {type, name} = selection
      return {
        title: `${name}`,
        subtitle: `${appelationTypes.find(id => id.value === type).title}`
      }
    }
  }
}
