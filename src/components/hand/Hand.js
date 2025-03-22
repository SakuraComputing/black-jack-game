import React from 'react';
import Card from '../card/Card';
import * as styles from '../../pages/styles/Hand.module.css';
import * as buttonStyles from '../../pages/styles/Button.module.css';

const Hand = ({ hand, participant, dealCardToPlayer }) => {
  console.log('hand', hand);

  return (
    <div className={styles.handContainer}>
      <div className={participant === 'player' ? styles.player : styles.dealer}>
        <div className={styles.handText}>{participant} Hand</div>
      </div>
      <div className={styles.cardContainer}>
        {hand.map((card, index) => (
          <Card key={index} rank={card.rank} suit={card.suit} />
        ))}
      </div>
      {participant === 'player' && (
        <div className={buttonStyles.btnContainer}>
          <button className={buttonStyles.btn} onClick={dealCardToPlayer}>
            Hit
          </button>
          <button className={buttonStyles.btn}>Stand</button>
        </div>
      )}
    </div>
  );
};

export default Hand;
