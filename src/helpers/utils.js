import { PLAYER, DEALER, DRAW } from './constants';

export const calculateHandValue = (hand) => {
  if (!hand) {
    throw new Error('calculateHandValue() requires a non-null hand');
  }

  let totalValue = 0;
  let aceCount = 0;

  for (const card of hand) {
    if (!card || typeof card.rank !== 'string') {
      throw new Error(
        `calculateHandValue() encountered an invalid card: ${JSON.stringify(
          card
        )}`
      );
    }

    const rankValue =
      card.rank === 'A'
        ? 11
        : ['J', 'Q', 'K'].includes(card.rank)
        ? 10
        : parseInt(card.rank, 10);
    totalValue += rankValue;
    if (card.rank === 'A') aceCount++;
  }

  while (totalValue > 21 && aceCount > 0) {
    totalValue -= 10;
    aceCount--;
  }

  return totalValue;
};

export const getRandomCardFromDeck = (deck, setDeck) => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const randomCard = deck[randomIndex];

  const newDeck = deck.filter((card, index) => index !== randomIndex);
  setDeck(newDeck);

  return randomCard;
};

export const dealCardToDealerWithDelay = ({
  dealerHand,
  dealerScore,
  playerScore,
  getRandomCard,
  setDealerHand,
  calculateHandValue,
  handlePlayerTurnOver,
  timeout = 1000,
}) => {
  let updatedDealerHand = [...dealerHand];
  let updatedDealerScore = dealerScore;
  let dealerIndex = 0;

  const deal = () => {
    if (updatedDealerScore < 17 && dealerIndex < 5) {
      const card = getRandomCard();
      updatedDealerHand.push(card);
      updatedDealerScore = calculateHandValue(updatedDealerHand);
      setDealerHand([...updatedDealerHand]);
      dealerIndex++;
      setTimeout(deal, timeout);
    } else {
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

  deal();
};

export const dealInitialCards = ({
  setPlayerHand,
  setDealerHand,
  setPlayerScore,
  setDealerScore,
  setDeck,
  combinations,
  getRandomCard,
  PLAYER_DEAL_TIMEOUT,
}) => {
  // Reset state before dealing
  setDeck(combinations);
  setPlayerHand([]);
  setDealerHand([]);
  setPlayerScore(0);
  setDealerScore(0);

  let playerCards = [];
  let dealerCards = [];

  const dealFirstCardToDealer = () => {
    const dealerCard = getRandomCard();
    dealerCards.push(dealerCard);
    setDealerHand([...dealerCards]);

    const dealerValue = calculateHandValue(dealerCards);
    setDealerScore(dealerValue);

    setTimeout(dealSecondCardToDealer, PLAYER_DEAL_TIMEOUT);
  };

  const dealSecondCardToDealer = () => {
    const dealerCard = getRandomCard();
    dealerCards.push(dealerCard);
    setDealerHand([...dealerCards]);

    const dealerValue = calculateHandValue(dealerCards);
    setDealerScore(dealerValue);

    setTimeout(dealFirstCardToPlayer, PLAYER_DEAL_TIMEOUT);
  };

  const dealFirstCardToPlayer = () => {
    const playerCard = getRandomCard();
    playerCards.push(playerCard);
    setPlayerHand([...playerCards]);

    const playerValue = calculateHandValue(playerCards);
    setPlayerScore(playerValue);

    setTimeout(dealSecondCardToPlayer, PLAYER_DEAL_TIMEOUT);
  };

  const dealSecondCardToPlayer = () => {
    const playerCard = getRandomCard();
    playerCards.push(playerCard);
    setPlayerHand([...playerCards]);

    const playerValue = calculateHandValue(playerCards);
    setPlayerScore(playerValue);
  };

  // Start the sequence
  dealFirstCardToDealer();
};
