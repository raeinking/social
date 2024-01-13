const express = require("express");
const Posts = require("../models/postsModel");

exports.PostVedio = async (req, res) => {
  const { title, thumbnail, video, userId } = req.body;
  console.log(title, thumbnail, userId, video);
  try {
    const post = await Posts.create({
      postTitle: title,
      thumbnail: thumbnail,
      userId: userId,
      video: video,
      room,
    });
    post.save();
    res.send("post created successfully");
  } catch (error) {
    console.error(error);
  }
};
