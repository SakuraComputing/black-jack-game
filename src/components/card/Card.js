import React from 'react';

import * as styles from '../../pages/styles/Card.module.css';

const Card = ({ rank, suit = 0, isFaceDown }) => {
  const cardClass = `${styles.card} ${!isFaceDown ? styles.flipped : ''}`;

  return (
    <div className={cardClass}>
      <div className={styles.faceDownCard} />
      <div className={styles.faceUpCard}>
        <div className={styles.rank}>{rank}</div>
        <div className={styles.suit}>{suit}</div>
        <div className={styles.rank}>{rank}</div>
      </div>
    </div>
  );
};

export default Card;
