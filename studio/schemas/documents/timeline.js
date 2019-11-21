import {FaClock} from 'react-icons/fa'

export default {
  name: 'timeline',
  type: 'document',
  title: 'Timeline',
  icon: FaClock,
  fields: [
    {
      title: 'Headline',
      name: 'headline', // path: title.text.heading
      type: 'localeString'
    },
    {
      title: 'Text',
      name: 'text', // path: title.text.text
      type: 'localeBlock'
    },
    {
      title: 'Media',
      name: 'media',
      type: 'array',
      of: [
        {type: 'mediaObject'},
        {type: 'externalMediaObject'}
      ],
      validation: Rule => Rule.length(1).error('You should only register one media object')
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
      of: [{type: 'era'}],
      preview: {
        select: {
          title: 'headline'
        },
        prepare (selection) {
          const {title} = selection
          return {
            title: title
          }
        }
      }
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
      title: 'headline.nor'
    },
    prepare (selection) {
      const {title} = selection
      return {
        title: title
      }
    }
  }
}
