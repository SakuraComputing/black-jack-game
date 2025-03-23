import * as React from 'react';
import { useState, useEffect } from 'react';

import { combinations } from './helpers/cardDeck';

import * as styles from '../pages/styles/Main.module.css';
import * as buttonStyles from '../pages/styles/Button.module.css';

import Hand from '../components/hand/hand';

import { calculateHandValue } from './helpers/utils';

export default function Home() {
  const [deck, setDeck] = useState(combinations);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const getRandomCardFromDeck = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const randomCard = deck[randomIndex];

    const newDeck = deck.filter((card, index) => index !== randomIndex);
    setDeck(newDeck);

    return randomCard;
  };

  useEffect(() => {
    if (playerHand.length > 0) {
      const playerValue = calculateHandValue(playerHand);
      setPlayerScore(playerValue);

      if (playerValue > 21) {
        setGameOver(true);
      } else if (playerValue === 21) {
        setGameOver(true);
      }
    }
  }, [playerHand]);

  // Deal Card to Player
  const dealCardToPlayer = () => {
    if (gameOver) {
      return;
    }

    const card = getRandomCardFromDeck();
    setPlayerHand([...playerHand, card]);
  };

  const playerStand = () => {
    setGameOver(true);
  };

  // Deal card to Dealer
  const dealCardToDealer = () => {
    const card = getRandomCardFromDeck();
    setDealerHand([...dealerHand, card]);
  };

  const reset = () => {
    setDeck(combinations);
    setPlayerHand([]);
    setDealerHand([]);
  };

  const dealCards = () => {
    reset();

    // Deal 2 cards to player and dealer in one go
    const playerCards = [getRandomCardFromDeck(), getRandomCardFromDeck()];
    const dealerCards = [getRandomCardFromDeck(), getRandomCardFromDeck()];

    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setPlayerScore(calculateHandValue(playerCards));
    setDealerScore(calculateHandValue(dealerCards));
  };

  return (
    <div className={styles.main}>
      <div className={styles.deck} id="deck"></div>
      <div className={styles.topContainer}>
        <div className={styles.title}>Black Jack</div>
        <button className={buttonStyles.btn} onClick={dealCards}>
          Deal
        </button>
      </div>
      <div className={styles.container}>
        {dealerHand.length > 0 && (
          <Hand
            hand={dealerHand}
            participant={'dealer'}
            dealCardToDealer={dealCardToDealer}
            count={dealerScore}
          />
        )}
        {playerHand.length > 0 && (
          <Hand
            hand={playerHand}
            participant={'player'}
            dealCardToPlayer={dealCardToPlayer}
            count={playerScore}
            playerStand={playerStand}
          />
        )}
      </div>
    </div>
  );
}
