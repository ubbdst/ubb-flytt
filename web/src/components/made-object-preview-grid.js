import {Link} from 'gatsby'
import React from 'react'
import MadeObjectPreview from './made-object-preview'

import styles from './made-object-preview-grid.module.css'

function MadeObjectPreviewGrid (props) {
  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id}>
              <MadeObjectPreview {...node} />
            </li>
          ))}
      </ul>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Se flere</Link>
        </div>
      )}
    </div>
  )
}

MadeObjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default MadeObjectPreviewGrid
