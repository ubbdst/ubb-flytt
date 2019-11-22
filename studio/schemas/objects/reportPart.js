export default {
  title: 'Report part',
  name: 'reportPart',
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
    },
    {
      title: 'Category Set',
      name: 'categorySet',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Building', value: 'building'},
          {title: 'Master plan', value: 'masterPlan'},
          {title: 'Infrastructure', value: 'infrastructure'},
          {title: 'Private Home', value: 'privateHome'}
        ]
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
