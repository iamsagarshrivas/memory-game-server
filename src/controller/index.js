const {
  generateGameService,
  openCardFaceService,
  gameOverService,
} = require("../services");
module.exports = {
  generateGame: (req, res) => {
    try {
      res.send(generateGameService(req.body.complexity));
    } catch (error) {
      res.status(500);
      res.render("error", { error });
    }
  },
  openCardFace: (req, res) => {
    try {
      const { file_id, index } = req.body;
      res.send(openCardFaceService(file_id, index));
    } catch (error) {
      res.status(500);
      res.render("error", { error });
    }
  },
  handleGameOver: (req, res) => {
    try {
      const { file_id } = req.body;
      res.send(gameOverService(file_id));
    } catch (error) {
      res.status(500);
      res.render("error", { error });
    }
  },
};
