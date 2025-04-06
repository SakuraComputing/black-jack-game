import * as React from 'react';

import * as styles from '../../pages/styles/Card.module.css';

const Card = ({ rank, suit = 0, isDisplayFaceDown }) => {
  if (isDisplayFaceDown) {
    return <div className={styles.faceDownCard} />;
  }

  return (
    <div className={styles.card}>
      <div className={styles.rank}>{rank}</div>
      <div className={styles.suit}>{suit}</div>
      <div className={styles.rank}>{rank}</div>
    </div>
  );
};
export default Card;
