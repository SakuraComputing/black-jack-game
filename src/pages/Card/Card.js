import * as React from 'react';
import * as styles from '../styles/Card.module.css';

const Card = ({ rank, suit, animationDelay = 0 }) => {
  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${animationDelay}s` }} // Set animation delay for sequential animation
    >
      <div className={styles.rank}>{rank}</div>
      <div className={styles.suit}>{suit}</div>
      <div className={styles.rank}>{rank}</div>
    </div>
  );
};

export default Card;
