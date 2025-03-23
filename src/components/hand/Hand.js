import React from 'react';

import Card from '../card/Card';
import Counter from '../counter/counter';

import * as styles from '../../pages/styles/Hand.module.css';
import * as buttonStyles from '../../pages/styles/Button.module.css';

const Hand = ({
  hand,
  participant,
  count,
  dealCardToPlayer,
  playerStand,
  gameOver,
}) => {
  const isPlayersHand = participant === 'player';

  console.log('gameOver', gameOver);

  return (
    <>
      <div className={styles.cardContainer}>
        {hand.map((card, index) => (
          <Card key={index} rank={card.rank} suit={card.suit} />
        ))}
      </div>
      {isPlayersHand && (
        <div className={styles.playerContainer}>
          <div className={buttonStyles.btnContainer}>
            <button className={buttonStyles.btn} onClick={dealCardToPlayer}>
              Hit
            </button>
            <button className={buttonStyles.btn} onClick={playerStand}>
              Stand
            </button>
          </div>

          <Counter count={count} />
        </div>
      )}
    </>
  );
};

export default Hand;
