import React from 'react';
import Navigation from './Navigation/Navigation';
import Logo from './Logo/Logo';

import * as styles from "./Header.module.scss";

export default props => {
  return (
    <div className={styles.Header}>
      <Logo className={styles.logo}/>
      <Navigation />
    </div>
  );
}