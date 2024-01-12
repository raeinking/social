const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Posts = require("../models/postsModel");
const multer = require("multer");
const path = require("path");

//! Create a storage engine
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, "/files");
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  const validImageTypes = ["png", "svg", "webp", "jpg", "jpeg", "mp4", "mov"];
  if (validImageTypes.includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(new Error("Not a valid image file!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post("/create", upload.single("myFile"), async (req, res) => {
  const { title, thumbnail, video, userId } = req.body;
  try {
    const post = await Posts.create({
      postTitle: title,
      thumbnail: thumbnail,
      userId: userId,
      video: req.file ? req.file.path : null, // Store the file path in the video field,
      live: true,
    });

    post.save();
    res.send("Post created successfully");
  } catch (error) {
    console.error(error);

    // Handle validation errors more gracefully
    if (error.name === "ValidationError") {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      return res.status(400).json({ errors: validationErrors });
    }

    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
