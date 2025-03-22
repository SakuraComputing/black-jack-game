const calculateHandValue = (hand) => {
  let value = 0;
  let aceCount = 0;

  for (const card of hand) {
    if (card.rank === 'A') {
      aceCount++;
    } else if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  }

  for (let i = 0; i < aceCount; i++) {
    if (value + 11 <= 21) {
      value += 11;
    } else {
      value += 1;
    }
  }

  return value;
};

export { calculateHandValue };
