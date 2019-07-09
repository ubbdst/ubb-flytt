import KnSearchInput from './KnSearchInput'

export default {
  name: 'apiMetadata',
  type: 'object',
  title: 'Github',
  inputComponent: KnSearchInput,
  fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name',
            readOnly: true
        },
        {
            name: 'uri',
            type: 'string',
            title: 'URI',
            readOnly: true
        },
        {
            name: 'raw',
            type: 'text',
            title: 'Raw',
            readOnly: true
        },
        {
            name: 'crawledAt',
            type: 'datetime',
            readOnly: true,
            hidden: true
        }
    ]
}
