const express = require("express");
const router = express.Router();
const { PostVedio } = require("../controller/PostsController"); // Import the user controller
const { authurizer } = require("../middleWare/authorizeUser");
const User = require("../models/userModel");
const multer = require("multer");
const gridfs = require("multer-gridfs-storage");

router.post("/create", PostVedio);
module.exports = router;
