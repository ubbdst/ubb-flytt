// TODO: Finish timeline with references to internal stuff and external. +datamodell
// See http://timeline.knightlab.com/docs/json-format.html#json-slide for more info

export default {
  title: 'Timeline slide',
  name: 'timelineSlide',
  type: 'object',
  fields: [
    {
      title: 'Headline',
      name: 'headline',
      type: 'string'
    },
    {
      title: 'Text',
      name: 'text',
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
      title: 'Timespan',
      name: 'timespan',
      type: 'array',
      of: [{type: 'timespan'}],
      validation: Rule => Rule.length(1).warning('You should only register one timespan')
    },
    {
      title: 'Group',
      name: 'group',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.length(1).error('An event can only be in one group!')
    },
    {
      title: 'Background',
      name: 'background',
      type: 'background'
    }
  ],
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

}
