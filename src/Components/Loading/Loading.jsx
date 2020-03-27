import React from 'react';

import * as styles from './Loading.module.scss';

export default props => {
  return (
    <div className={styles.Loading}>
      Loading<span>.</span><span>.</span><span>.</span>
    </div>
  )
}