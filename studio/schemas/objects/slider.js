export default {
  title: 'Slider',
  name: 'slider',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'conditionType',
      type: 'string',
      options: {
        list: [
          {title: 'Overall condition', value: 'overallCondition'},
          {title: 'Ink condition', value: 'inkCondition'},
          {title: 'Binding condition', value: 'bindingCondition'}
        ]
      }
    },
    {
      title: 'Condition',
      name: 'condition',
      description: '1 is horrible, 100 is MINT!',
      type: 'number',
      options: {
        layout: 'slider',
        range: {min: 1, max: 100, step: 1}
      }
    }
  ],
  preview: {
    select: {
      type: 'conditionType',
      value: 'condition'
    },
    prepare (selection) {
      const {type, value} = selection
      return {
        title: type + ': ' + value + ' / 100'
      }
    }
  }
}
