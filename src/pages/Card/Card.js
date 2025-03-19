import * as React from 'react';

import * as styles from '../styles/Card.module.css';

const Card = ({ rank, suit }) => {
  return (
    <div className={styles.card}>
      <div>{rank}</div>
      <div>{suit}</div>
      <div>{rank}</div>
    </div>
  );
};
export default Card;
