import * as React from 'react';
import { useState, useEffect } from 'react';
import { combinations } from '../helpers/cardDeck';
import { calculateHandValue } from '../helpers/utils';

import Hand from '../components/hand/hand';
import Result from '../components/result/result';
import Button from '../components/button/button';

import * as styles from '../pages/styles/Main.module.css';
import {
  DEALER,
  PLAYER,
  DRAW,
  DEALER_DEAL_TIMEOUT,
  PLAYER_DEAL_TIMEOUT,
} from '../helpers/constants';

export default function Home() {
  const [deck, setDeck] = useState(combinations);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerTurnOver, setPlayerTurnOver] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [result, setResult] = useState({ type: '', message: '' });

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
        handlePlayerTurnOver({ type: DEALER, message: 'Dealer Wins' });
      } else if (playerValue === 21) {
        handlePlayerTurnOver({ type: PLAYER, message: 'Player Wins' });
      }
    }
  }, [playerHand]);

  const dealCardToPlayer = () => {
    if (playerTurnOver) return;

    // Add delay before dealing the card to player
    setTimeout(() => {
      const card = getRandomCardFromDeck();
      setPlayerHand((prevHand) => [...prevHand, card]);
    }, PLAYER_DEAL_TIMEOUT); // PLAYER_DEAL_TIMEOUT ms = 1 second delay
  };

  // Deal one card to dealer with a delay
  const dealCardToDealer = () => {
    // Add delay before dealing the card to dealer
    setTimeout(() => {
      const card = getRandomCardFromDeck();
      setDealerHand((prevHand) => [...prevHand, card]);
    }, PLAYER_DEAL_TIMEOUT); // PLAYER_DEAL_TIMEOUT ms = 1 second delay
  };

  const playerStand = () => {
    setPlayerTurnOver(true);

    let updatedDealerHand = [...dealerHand];
    let updatedDealerScore = dealerScore;
    let dealerIndex = 0;

    // Recursive function to deal cards to the dealer one by one with delay
    const dealCardToDealerWithDelay = () => {
      // Check if the dealer needs another card
      if (updatedDealerScore < 17 && dealerIndex < 5) {
        // Adding max 5 cards to prevent infinite loop
        const card = getRandomCardFromDeck();
        updatedDealerHand = [...updatedDealerHand, card];
        updatedDealerScore = calculateHandValue(updatedDealerHand);

        // Update dealer's hand and score
        setDealerHand(updatedDealerHand);

        // Increment the dealerIndex to keep track of the number of cards dealt
        dealerIndex++;

        // Recursively call the function after the delay
        setTimeout(dealCardToDealerWithDelay, DEALER_DEAL_TIMEOUT); // PLAYER_DEAL_TIMEOUT can be 1000ms (1 second)
      } else {
        // Once the dealer's hand is done, check the results
        if (updatedDealerScore > 21 || updatedDealerScore < playerScore) {
          handlePlayerTurnOver({ type: PLAYER, message: 'Player Wins' });
        } else if (
          updatedDealerScore === 21 ||
          updatedDealerScore > playerScore
        ) {
          handlePlayerTurnOver({ type: DEALER, message: 'Dealer Wins' });
        } else {
          handlePlayerTurnOver({ type: DRAW, message: "It's a draw!" });
        }
      }
    };

    // Start the dealer card dealing process
    dealCardToDealerWithDelay();
  };

  const reset = () => {
    setResult({ type: '', message: '' });
    setDealerScore(0);
    setPlayerScore(0);
    setDeck(combinations);
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerTurnOver(false);
  };

  const dealCards = () => {
    reset();

    let playerCards = [];
    let dealerCards = [];

    // Deal cards to the dealer first, with a delay
    const dealFirstCardToDealer = () => {
      const dealerCard = getRandomCardFromDeck();
      dealerCards.push(dealerCard);
      setDealerHand([...dealerCards]);

      const dealerValue = calculateHandValue(dealerCards);
      setDealerScore(dealerValue);

      // After the dealer’s first card, deal the dealer’s second card
      setTimeout(dealSecondCardToDealer, PLAYER_DEAL_TIMEOUT);
    };

    const dealSecondCardToDealer = () => {
      const dealerCard = getRandomCardFromDeck();
      dealerCards.push(dealerCard);
      setDealerHand([...dealerCards]);

      const dealerValue = calculateHandValue(dealerCards);
      setDealerScore(dealerValue);

      // After the dealer's cards, deal the player's first card
      setTimeout(dealFirstCardToPlayer, PLAYER_DEAL_TIMEOUT);
    };

    const dealFirstCardToPlayer = () => {
      const playerCard = getRandomCardFromDeck();
      playerCards.push(playerCard);
      setPlayerHand([...playerCards]);

      const playerValue = calculateHandValue(playerCards);
      setPlayerScore(playerValue);

      // After the player’s first card, deal the player’s second card
      setTimeout(dealSecondCardToPlayer, PLAYER_DEAL_TIMEOUT);
    };

    const dealSecondCardToPlayer = () => {
      const playerCard = getRandomCardFromDeck();
      playerCards.push(playerCard);
      setPlayerHand([...playerCards]);

      const playerValue = calculateHandValue(playerCards);
      setPlayerScore(playerValue);
    };

    // Start dealing cards, starting with the dealer
    dealFirstCardToDealer();
  };

  const handlePlayerTurnOver = (result) => {
    setPlayerTurnOver(true);
    setResult(result);
  };

  return (
    <div className={styles.main}>
      <div className={styles.deck} id="deck"></div>

      {playerTurnOver && <Result result={result} />}
      <div className={styles.topContainer}>
        <div className={styles.title}>Black Jack</div>

        <Button text="Reset" onClick={dealCards} />
      </div>
      <div className={styles.container}>
        <div className={styles.handContainer}>
          <div className={styles.handHeader}>
            <div className={styles.handText}>Dealers Hand</div>
          </div>

          {dealerHand.length > 0 && (
            <Hand
              hand={dealerHand}
              participant={DEALER}
              dealCardToDealer={dealCardToDealer}
              count={dealerScore}
              playersTurnOver={playerTurnOver}
            />
          )}
        </div>
        <div className={styles.handContainer}>
          <div className={styles.handHeader}>
            <div className={styles.handText}>Players Hand</div>
          </div>

          {playerHand.length > 0 && (
            <Hand
              hand={playerHand}
              participant={PLAYER}
              dealCardToPlayer={dealCardToPlayer}
              count={playerScore}
              playerStand={playerStand}
              playersTurnOver={playerTurnOver}
            />
          )}
        </div>
      </div>
    </div>
  );
}
