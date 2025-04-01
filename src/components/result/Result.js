import React from 'react';
import * as styles from '../../pages/styles/Result.module.css';

const Result = ({ result: { type, message } }) => {
  if (!type || !message) return null;

  let winnerClassName;

  switch (type) {
    case 'player':
      winnerClassName = styles.playerWin;
      break;
    case 'dealer':
      winnerClassName = styles.dealerWin;
      break;
    default:
      winnerClassName = styles.draw;
  }

  return <div className={`${styles.result} ${winnerClassName}`}>{message}</div>;
};

export default Result;
