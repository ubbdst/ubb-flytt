import React from 'react'

import styles from './activity-stream.module.css'

function ActivityStream (items) {
  console.log(items)
  let streams = Object.values(items)
  console.log(streams)
  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {streams.map(item => (
          <li key={item._key} className={styles.listItem}>
            {item._type && (
              <h1>{item._type}</h1>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivityStream
