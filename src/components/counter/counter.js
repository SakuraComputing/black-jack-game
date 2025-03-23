import React from 'react';

import CountUp from 'react-countup';

import * as styles from '../../pages/styles/Counter.module.css';

const Counter = ({ count }) => {
  return (
    <div className={styles.counter}>
      <CountUp end={count} />
    </div>
  );
};

export default Counter;
