import React, { useState, useEffect } from "react";
import "../blog/blog.css";
// import path from "path";
import Images from "./sadfasdf.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Blog({ name }) {
  const [posts, setPosts] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // fetch data from server
    fetch("http://localhost:8060/post/getPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setPosts(data);
      });
    });
    getResult();
  }, []);

  const getResult = () => {
    posts.forEach((post) => {
      console.log(post.video);
      const filename = post.video.split("/").pop();
      setFileName(filename);
    });
  };

  return (
    <div className="blogcontainer">
      {" "}
      {posts.map((post) => (
        <div className="blog" key={post._id}>
          <a href={`/live/${post.room}`}>

          <h1 className="title"> {post.postTitle} </h1>{" "}
          <img
            className="thumbnail"
            src={post.live ? Images : null}
            alt="blog"
            />
            </a>
        </div>
      ))}{" "}
    </div>
  );
}

export default Blog;