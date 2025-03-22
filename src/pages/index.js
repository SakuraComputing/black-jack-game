import * as React from 'react';
import { useState } from 'react';

import { combinations } from './helpers/cardDeck';

import * as styles from '../pages/styles/Main.module.css';
import Hand from '../components/hand/hand';

export default function Home() {
  const [deck, setDeck] = useState(combinations);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  // const [gameOver, setGameOver] = useState(false);

  const getRandomCardFromDeck = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const randomCard = deck[randomIndex];

    const newDeck = deck.filter((card, index) => index !== randomIndex);
    setDeck(newDeck);

    return randomCard;
  };

  // Deal Card to Player
  const dealCardToPlayer = () => {
    const card = getRandomCardFromDeck();
    setPlayerHand([...playerHand, card]);
    // const playerValue = calculateHandValue(playerHand);
    // if (playerValue > 21) {
    //   setGameOver(true);
    // }
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
    console.log('deal cards', playerHand, dealerHand);
    reset();

    // Deal 2 cards to player and dealer in one go
    const playerCards = [getRandomCardFromDeck(), getRandomCardFromDeck()];
    const dealerCards = [getRandomCardFromDeck(), getRandomCardFromDeck()];

    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
  };

  return (
    <div className={styles.main}>
      <div className={styles.topContainer}>
        <div className={styles.title}>Black Jack</div>
        <button className={styles.btn} onClick={dealCards}>
          Deal
        </button>
      </div>
      <div className={styles.container}>
        {dealerHand.length > 0 && (
          <Hand
            hand={dealerHand}
            participant={'dealer'}
            dealCardToDealer={dealCardToDealer}
          />
        )}
        <div className={styles.deck} id="deck"></div>
        {playerHand.length > 0 && (
          <Hand
            hand={playerHand}
            participant={'player'}
            dealCardToPlayer={dealCardToPlayer}
          />
        )}
      </div>
    </div>
  );
}
