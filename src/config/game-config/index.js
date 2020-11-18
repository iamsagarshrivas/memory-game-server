function getCardDeck() {
  const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  const suites = ["SPADES", "HEART", "DIAMOND", "CLUB"];

  let deck = [];
  suites.forEach((suite) => {
    ranks.forEach((rank) => {
      deck.push({
        rank,
        suite,
      });
    });
  });

  return deck;
}

module.exports = {
  COMPLEXITY: {
    EASY: 5,
    MEDIUM: 10,
    HARD: 25,
  },
  CARDS_DECK: getCardDeck(),
};
