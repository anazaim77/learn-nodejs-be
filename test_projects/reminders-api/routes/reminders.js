const router = require("express").Router();
const controller = require("../controllers/reminders");

router.post("", controller.createReminder);
router.get("", controller.getAllReminder);
router.get("/:id", controller.getAllReminderById);
router.put("/:id", controller.notAllowedMethod);
router.patch("/:id", controller.notAllowedMethod);
router.delete("/:id", controller.notAllowedMethod);

module.exports = router;
