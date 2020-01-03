import {FaLanguage} from 'react-icons/fa'

export default {
  title: 'Language',
  name: 'language',
  type: 'document',
  icon: FaLanguage,
  fieldsets: [
    {
      name: 'state',
      title: 'State',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      title: 'Preferred label',
      name: 'label',
      type: 'localeString'
    },
    {
      title: 'Alternative label',
      name: 'altLabel',
      type: 'localeString'
    }
  ],
  preview: {
    select: {
      title: 'label.nor'
    },
    prepare (selection) {
      const {title} = selection
      return {
        title: title
      }
    }
  }
}
