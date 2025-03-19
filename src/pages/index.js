import * as React from 'react';
import { useState } from 'react';

import { combinations } from '../../assets/cardDeck';

import Card from './Card/Card';

import * as styles from '../pages/styles/Main.module.css';

export default function Home() {
  const [deck, setDeck] = useState(combinations);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

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

  return (
    <div className={styles.main}>
      <large className={styles.title}>Black Jack</large>
      <button className={styles.btn} onClick={reset}>
        New Game
      </button>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.dealer}>
            <div className={styles.handText}>Dealer Hand</div>
            <button className={styles.btn} onClick={dealCardToDealer}>
              Hit
            </button>
          </div>
          <div className={styles.cardContainer}>
            {dealerHand.map((card, index) => (
              <Card key={index} rank={card.rank} suit={card.suit} />
            ))}
          </div>
        </div>

        <div className={styles.header}>
          <div className={styles.player}>
            <div className={styles.handText}>Player Hand</div>
            <button className={styles.btn} onClick={dealCardToPlayer}>
              Hit
            </button>
          </div>
          <div className={styles.cardContainer}>
            {playerHand.map((card, index) => (
              <Card key={index} rank={card.rank} suit={card.suit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
