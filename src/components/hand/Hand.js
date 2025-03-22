import React from 'react';
import Card from '../card/Card';
import * as styles from '../../pages/styles/Hand.module.css';

const Hand = ({ hand, participant, dealCardToPlayer }) => {
  console.log('hand', hand);

  return (
    <div>
      <div className={participant === 'player' ? styles.player : styles.dealer}>
        <div className={styles.handText}>{participant} Hand</div>
      </div>
      {participant === 'player' && (
        <div className={styles.playerBtnContainer}>
          <button className={styles.btn} onClick={dealCardToPlayer}>
            Hit
          </button>
          <button className={styles.btn}>Stand</button>
        </div>
      )}
      <div className={styles.cardContainer}>
        {hand.map((card, index) => (
          <Card key={index} rank={card.rank} suit={card.suit} />
        ))}
      </div>
    </div>
  );
};

export default Hand;
