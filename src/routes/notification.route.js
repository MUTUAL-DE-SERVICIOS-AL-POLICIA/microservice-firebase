const { Router } = require("express");

const {
  notificationGroupUsers,
} = require("../controllers/notification.controller");
const router = Router();



router.post(
  "/groupusers",
  notificationGroupUsers
);


module.exports = router;
