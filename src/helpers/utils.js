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
