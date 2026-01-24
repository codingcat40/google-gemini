const express = require("express");

const auth = require("../middlewares/auth.js");

const {
  SendAPIRequest,
  getMyData,
  deleteQuery,
} = require("../controllers/homeController.js");

const router = express.Router();

router.post("/prompt", auth, SendAPIRequest);
router.get("/history", auth, getMyData);
router.delete("/history/:id", auth, deleteQuery);

module.exports = router;
