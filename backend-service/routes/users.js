const express = require("express");
const UserCtrl = require("../controllers/user-controller");

const router = express.Router();

router.get("/Signup", UserCtrl.Signup);

router.post("/update/:userId", UserCtrl.ChangeProfile);

module.exports = router;
