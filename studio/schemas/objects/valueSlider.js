export default {
  title: 'Slider',
  name: 'valueSlider',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'hasType',
      type: 'reference',
      to: [{type: 'assessmentType'}]
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
      type: 'hasType.label.nor',
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
