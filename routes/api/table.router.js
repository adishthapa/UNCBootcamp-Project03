const router = require("express").Router();
const tableController = require("../../controllers/table.controller");

router.route("/").get(tableController.flash);
router
  .route("/init")
  .get(tableController.init)
  .post(tableController.init);
router.route("/join").post(tableController.addPlayer);
router.route("/bet/:position/:amount").get(tableController.placeBet);
router.route("/deal").get(tableController.dealCards);
router.route("/flop").get(tableController.doFlop);
router.route("/turn").get(tableController.doTurn);
router.route("/river").get(tableController.doRiver);
router.route("/cards").get(tableController.getTableCards);
router.route("/hands").get(tableController.calculateHands);
module.exports = router;