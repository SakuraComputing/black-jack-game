import React from 'react';

import { DEALER, PLAYER } from '../../helpers/constants';
import * as styles from '../../pages/styles/Result.module.css';

const Result = ({ result: { type, message } }) => {
  if (!type || !message) return null;

  let winnerClassName;

  switch (type) {
    case PLAYER:
      winnerClassName = styles.playerWin;
      break;
    case DEALER:
      winnerClassName = styles.dealerWin;
      break;
    default:
      winnerClassName = styles.draw;
  }

  return <div className={`${styles.result} ${winnerClassName}`}>{message}</div>;
};

export default Result;
