import React from 'react';

import * as styles from '../../pages/styles/Counter.module.css';

const Counter = ({ count }) => {
  return <div className={styles.counter}>{count}</div>;
};

export default Counter;
