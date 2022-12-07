const express = require("express");
const router = express.Router();
const { ensureAuthenticated, authenticationMiddleware,isAdmin } = require("../middleware/checkAuth");
const reminderController = require("../controller/reminder_controller");

router.get("/", (req, res) => {
  res.send("welcome");
});


router.get("/reminders", ensureAuthenticated,  reminderController.list);
//router.get("/reminders",  reminderController.list);

router.get("/reminder/new", reminderController.new);

router.get("/reminder/:id", reminderController.listOne);

router.get("/reminder/:id/edit", reminderController.edit);

router.post("/reminder/", reminderController.create);

// Implement this yourself
router.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
router.post("/reminder/delete/:id", reminderController.delete);

module.exports = router;
