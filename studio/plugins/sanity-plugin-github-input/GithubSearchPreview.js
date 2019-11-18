import React from 'react'
import DefaultPreview from 'part:@sanity/components/previews/default'

const GithubSearchBlockPreview = props => {
  const value = props.value || {}
  const title = value.title || '<Untitled>'
  return (
    <div>
      <h2>{title}</h2>
      <p>{value.description || ''}</p>
    </div>
  )
}

class GithubSearchPreview extends React.Component {
  render () {
    if (this.props.layout !== 'block') {
      return <DefaultPreview item={this.props.value} {...this.props} />
    }

    return <GithubSearchBlockPreview {...this.props} />
  }
}

export default GithubSearchPreview
