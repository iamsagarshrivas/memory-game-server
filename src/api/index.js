const { Router } = require("express");
const { generateGame, openCardFace, handleGameOver } = require("../controller");

const router = new Router();

router.post("/generate-game", generateGame);
router.post("/open-card-face", openCardFace);
router.post("/game-over", handleGameOver);

//checking if server is ruuning
router.get("/helloServer", (req, res) => {
  res.send("Server says hello");
});

module.exports = router;
