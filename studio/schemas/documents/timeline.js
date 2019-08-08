export default {
  name: 'timeline',
  type: 'document',
  title: 'Timeline',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'text',
          type: 'object',
          fields: [
            {
              name: 'headline',
              type: 'string'
            },
            {
              name: 'text',
              type: 'localeBlock'
            }
          ]
        },
        {
          name: 'media',
          type: 'image',
          fields: [
            {
              title: 'Caption',
              name: 'caption',
              type: 'text'
            },
            {
              title: 'Credit',
              name: 'credit',
              description: 'Add creator and link to resource',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      title: 'Scale',
      name: 'scale',
      description: "Either human or cosmological. If no scale is specified, the default is human. The cosmological scale is required to handle dates in the very distant past or future. (Before Tuesday, April 20th, 271,821 BCE after Saturday, September 13 275,760 CE) For the cosmological scale, only the year is considered, but it's OK to have a cosmological timeline with years between 271,821 BCE and 275,760 CE.",
      type: 'string',
      options: {
        list: [
          {title: 'Human', value: 'human'},
          {title: 'Cosmological', value: 'cosmological'}
        ],
        layout: 'radio'
      }
    },
    {
      name: 'eras',
      description: 'Eras is used to label a span of time on the timeline navigation component.',
      type: 'array',
      of: [
        {name: 'era',
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'object',
              fields: [
                {
                  name: 'headline',
                  type: 'string'
                },
                {
                  name: 'text',
                  type: 'localeBlock'
                }
              ]
            },
            {
              title: 'Start date',
              name: 'startDate',
              type: 'date'
            },
            {
              title: 'End date',
              name: 'endDate',
              type: 'date'
            }
          ],
          preview: {
            select: {
              title: 'text.headline'
            },
            prepare (selection) {
              const {title} = selection
              return {
                title: title
              }
            }
          }
        }
      ]
    },
    {
      name: 'events',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'event'}
          ]
        },
        {type: 'timelineSlide'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title.text.headline'
    },
    prepare (selection) {
      const {title} = selection
      return {
        title: title
      }
    }
  }
}
