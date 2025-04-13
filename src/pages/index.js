import * as React from 'react';
import { useState, useEffect } from 'react';
import { combinations } from '../helpers/cardDeck';
import {
  calculateHandValue,
  getRandomCardFromDeck,
  dealCardToDealerWithDelay,
  dealInitialCards,
} from '../helpers/utils';

import Hand from '../components/hand/hand';
import Result from '../components/result/result';
import Button from '../components/button/button';

import * as styles from '../pages/styles/Main.module.css';
import {
  DEALER,
  PLAYER,
  DEALER_DEAL_TIMEOUT,
  PLAYER_DEAL_TIMEOUT,
  CARD_FLIP_DURATION,
} from '../helpers/constants';

export default function Home() {
  const [deck, setDeck] = useState(combinations);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerTurnOver, setPlayerTurnOver] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [result, setResult] = useState({ type: '', message: '' });

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
      const card = getRandomCardFromDeck(deck, setDeck);
      setPlayerHand((prevHand) => [...prevHand, card]);
    }, PLAYER_DEAL_TIMEOUT);
  };

  // Deal one card to dealer with a delay
  const dealCardToDealer = () => {
    setTimeout(() => {
      const card = getRandomCardFromDeck(deck, setDeck);
      setDealerHand((prevHand) => [...prevHand, card]);
    }, PLAYER_DEAL_TIMEOUT);
  };

  const playerStand = () => {
    setPlayerTurnOver(true);

    setTimeout(() => {
      dealCardToDealerWithDelay({
        dealerHand,
        dealerScore,
        playerScore,
        getRandomCard: () => getRandomCardFromDeck(deck, setDeck),
        setDealerHand,
        calculateHandValue,
        handlePlayerTurnOver,
        timeout: DEALER_DEAL_TIMEOUT,
      });
    }, CARD_FLIP_DURATION);
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
    reset(); // optional if you keep the `reset` logic, otherwise move it into the helper

    dealInitialCards({
      setPlayerHand,
      setDealerHand,
      setPlayerScore,
      setDealerScore,
      setDeck,
      combinations,
      getRandomCard: () => getRandomCardFromDeck(deck, setDeck),
      PLAYER_DEAL_TIMEOUT,
    });
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
