const { v4: uuid } = require("uuid");
const path = require("path");
const { writeFileSync, existsSync, unlinkSync } = require("fs");
const { CARDS_DECK, COMPLEXITY } = require("../config/game-config");
const { gameFilePath } = require("../config");

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generateRandomCards(complexity) {
  let cardDeck = [...CARDS_DECK];
  // generate random deck of cards by suffling
  shuffle(cardDeck);

  const numCards = COMPLEXITY[complexity.toUpperCase()];

  // picking a number of cards according to complexity and making copy of each card
  const selectedCards = cardDeck
    .slice(0, numCards)
    .reduce(function (res, current) {
      return res.concat([current, current]);
    }, []);

  // shuffle again to ensure no copy element make a pattern
  shuffle(selectedCards);

  return selectedCards;
}

module.exports = {
  generateGameService: (complexity) => {
    try {
      // generate a unique random name of the file;
      const file_id = uuid();
      const cards = generateRandomCards(complexity);

      const gameConfig = {
        complexity,
        file_id,
        cards,
        numCards: cards.length,
      };

      // writing file sync
      writeFileSync(
        path.join(gameFilePath, `${file_id}.json`),
        JSON.stringify(gameConfig)
      );

      // deleting the cards from object to ensure this value is not sent to client side
      delete gameConfig.cards;

      return gameConfig;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  openCardFaceService: (file_id, index) => {
    try {
      // get the json objectfor the file
      const { cards } = require(path.join(gameFilePath, `${file_id}.json`));

      // check if given index is under the array length
      if (cards.length < index) throw new Error("Array Index out of bound");
      return cards[index];
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  gameOverService: (file_id) => {
    try {
      const filePath = path.join(gameFilePath, `${file_id}.json`);
      // delete file when game is over
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
      return;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};
