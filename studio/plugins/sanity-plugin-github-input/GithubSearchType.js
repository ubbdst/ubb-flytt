import GithubSearchInput from './GithubSearchInput'

export default {
  name: 'apiMetadata',
  type: 'object',
  title: 'Github',
  inputComponent: GithubSearchInput,
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
