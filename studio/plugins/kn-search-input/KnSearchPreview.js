import React from 'react'
import DefaultPreview from 'part:@sanity/components/previews/default'

const KnSearchBlockPreview = props => {
  const value = props.value || {}
  const title = value.title || '<Untitled>'
  return (
    <div>
      <div>
        
      </div>
      <h2>{title}</h2>
      <p>{value.description || ''}</p>
    </div>
  )
}

class KnSearchPreview extends React.Component {
  render() {
    // No room to show a big chess board in lists, so just defer to the default in those cases
    if (this.props.layout !== 'block') {
      return <DefaultPreview item={this.props.value} {...this.props} />
    }

    // Inside of the block content editor, we'll allow ourselves a richer preview
    return <KnSearchBlockPreview {...this.props} />
  }
}

export default KnSearchPreview
