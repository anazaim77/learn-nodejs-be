const express = require("express");
const router = express.Router();
const controller = require("../controllers/trades");

router.post("", controller.createTrade);
router.get("", controller.getAllTrades);
router.get("/:id", controller.getAllTradeById);
router.put("/:id", controller.defaultNotAllowedMethod);
router.patch("/:id", controller.defaultNotAllowedMethod);
router.delete("/:id", controller.defaultNotAllowedMethod);

module.exports = router;
