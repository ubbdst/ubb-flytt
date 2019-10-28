import {Link} from 'gatsby'
import React from 'react'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockText from './block-text'

import styles from './made-object-preview.module.css'
import {responsiveTitle3} from './typography.module.css'

function MadeObjectPreview (props) {
  return (
    <Link className={styles.root} to={`/made-object/${props.id}`}>
      <div className={styles.leadMediaThumb}>
        {props.mainRepresentation && props.mainRepresentation.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainRepresentation))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={props.mainRepresentation.alt}
          />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.label}</h3>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
    </Link>
  )
}

export default MadeObjectPreview
