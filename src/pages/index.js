import * as React from 'react';
import { useState, useEffect } from 'react';

import { combinations } from './helpers/cardDeck';

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

  const dealCards = () => {
    reset();

    // Deal 2 cards to player and dealer in one go
    const playerCards = [getRandomCardFromDeck(), getRandomCardFromDeck()];
    const dealerCards = [getRandomCardFromDeck(), getRandomCardFromDeck()];

    setTimeout(setPlayerHand(playerCards), 500);
    setTimeout(setDealerHand(dealerCards), 1000);
  };

  const calculateScore = () => {};

  return (
    <div className={styles.main}>
      <div className={styles.topContainer}>
        <large className={styles.title}>Black Jack</large>
        <button className={styles.btn} onClick={dealCards}>
          Deal
        </button>
      </div>
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
              <Card
                key={index}
                rank={card.rank}
                suit={card.suit}
                animationDelay={index * 0.5}
              />
            ))}
          </div>
        </div>

        <div className={styles.deck} id="deck"></div>

        <div className={styles.header}>
          <div className={styles.player}>
            <div className={styles.handText}>Player Hand</div>
            <div className={styles.playerBtnContainer}>
              <button className={styles.btn} onClick={dealCardToPlayer}>
                Hit
              </button>
              <button className={styles.btn}>Stand</button>
            </div>
          </div>
          <div className={styles.cardContainer}>
            {playerHand.map((card, index) => (
              <Card
                key={index}
                rank={card.rank}
                suit={card.suit}
                animationDelay={index * 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
