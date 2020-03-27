import React from "react";

import * as styles from "./Footer.module.scss";

export default props => {
  return (
    <React.Fragment>
      <div className={styles.Footer}>All Rights are reserved © guestbook.com</div>
      <div className={styles.footerPlaceholder}></div>
    </React.Fragment>
  );
};
