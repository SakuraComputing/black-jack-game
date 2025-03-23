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
  const [result, setResult] = useState({ type: '', message: '' });
  const [newGame, setNewGame] = useState(false);

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
        handleGameOver({ type: 'dealer', message: 'Dealer Wins' });
      } else if (playerValue === 21) {
        handleGameOver({ type: 'player', message: 'Player Wins' });
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

    let updatedDealerHand = [...dealerHand];
    let updatedDealerScore = dealerScore;

    while (updatedDealerScore < 17) {
      const card = getRandomCardFromDeck();
      updatedDealerHand = [...updatedDealerHand, card];
      updatedDealerScore = calculateHandValue(updatedDealerHand);
    }

    setDealerHand(updatedDealerHand);

    if (updatedDealerScore > 21 || updatedDealerScore < playerScore) {
      handleGameOver({ type: 'player', message: 'Player Wins' });
    } else if (updatedDealerScore === 21 || updatedDealerScore > playerScore) {
      handleGameOver({ type: 'dealer', message: 'Dealer Wins' });
    } else {
      handleGameOver({ type: 'draw', message: "It's a draw!" });
    }
  };

  // Deal card to Dealer
  const dealCardToDealer = () => {
    const card = getRandomCardFromDeck();
    setDealerHand([...dealerHand, card]);
  };

  const reset = () => {
    setResult({ type: '', message: '' });
    setDealerScore(0);
    setPlayerScore(0);
    setDeck(combinations);
    setPlayerHand([]);
    setDealerHand([]);
    setGameOver(false);
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

  const handleGameOver = (result) => {
    setGameOver(true);
    setResult(result);
    setNewGame(true);
  };

  return (
    <div className={styles.main}>
      <div className={styles.deck} id="deck"></div>
      {gameOver && <div className={styles.result}>{result.message}</div>}
      <div className={styles.topContainer}>
        <div className={styles.title}>Black Jack</div>

        <button className={buttonStyles.btn} onClick={dealCards}>
          Deal
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.handContainer}>
          <div className={styles.dealer}>
            <div className={styles.handText}>Dealers Hand</div>
          </div>

          {dealerHand.length > 0 && (
            <Hand
              hand={dealerHand}
              participant={'dealer'}
              dealCardToDealer={dealCardToDealer}
              count={dealerScore}
            />
          )}
        </div>
        <div className={styles.handContainer}>
          <div className={styles.player}>
            <div className={styles.handText}>Players Hand</div>
          </div>

          {playerHand.length > 0 && (
            <Hand
              hand={playerHand}
              participant={'player'}
              dealCardToPlayer={dealCardToPlayer}
              count={playerScore}
              playerStand={playerStand}
              gameOver={gameOver}
            />
          )}
        </div>
      </div>
    </div>
  );
}
