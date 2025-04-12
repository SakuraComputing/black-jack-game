import React, { useState, useEffect } from 'react';

import Card from '../card/Card';
import Counter from '../counter/counter';
import Button from '../button/button';
import { PLAYER, DEALER } from '../../helpers/constants';

import * as styles from '../../pages/styles/Hand.module.css';

const Hand = ({
  hand,
  participant,
  count,
  dealCardToPlayer,
  playerStand,
  playersTurnOver,
}) => {
  const isPlayersHand = participant === PLAYER;
  const isDealersHand = participant === DEALER;
  const [hasFlipped, setHasFlipped] = useState(false);

  useEffect(() => {
    if (isDealersHand && playersTurnOver && !hasFlipped) {
      setHasFlipped(true);
    }
  }, [isDealersHand, hasFlipped, playersTurnOver]);

  return (
    <>
      <div className={styles.cardContainer}>
        {hand.map((card, index) => {
          const isDealerSecondCard = isDealersHand && index === 1;
          const shouldFlip = isDealerSecondCard && hasFlipped;
          const isFaceDown = isDealerSecondCard && !playersTurnOver;

          return (
            <div
              key={index}
              className={`${styles.cardWrapper} ${
                shouldFlip ? styles.flipped : ''
              }`}
            >
              <Card
                key={index}
                rank={card.rank}
                suit={card.suit}
                isFaceDown={isFaceDown}
              />
            </div>
          );
        })}
      </div>
      {(isPlayersHand || playersTurnOver) && (
        <div className={styles.counterContainer}>
          <Counter count={count} />
        </div>
      )}
      {isPlayersHand && (
        <div className={styles.playerContainer}>
          <div className={styles.btnContainer}>
            <Button text="Hit" onClick={dealCardToPlayer} />
            <Button text="Stand" onClick={playerStand} />
          </div>
        </div>
      )}
    </>
  );
};

export default Hand;
