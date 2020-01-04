import {FaMapMarker} from 'react-icons/fa'

export default {
  title: 'Place',
  name: 'place',
  description: 'Should be fetched from KulturNav',
  type: 'document',
  icon: FaMapMarker,
  fields: [
    {
      name: 'label',
      title: 'Navn',
      titleEN: 'Name',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'localeBlock'
    },
    {
      name: 'geoJSON',
      title: 'Lokasjon',
      titleEN: 'Location',
      description: 'Where the hell did this happen?!',
      type: 'feature'
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
