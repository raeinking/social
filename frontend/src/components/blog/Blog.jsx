import React, { useState, useEffect } from "react";
import "../blog/blog.css";
// import path from "path";

function Blog({ name }) {
  const [posts, setPosts] = useState([]);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    // fetch data from server
    fetch("http://localhost:8040/post/getPosts", {
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
      // Extract filename from the file path
      // const filename = path.basename(post.video);
      const filename = post.video.split("/").pop();
      setFileName(filename);
    });
  };

  return (
    <div className="blogcontainer">
      {" "}
      {posts.map((post) => (
        //// const filename = path.basename(post.video);

        <div className="blog" key={post._id}>
          <h1> {post.title} </h1>{" "}
          <video
            src={`http://localhost:8040/api/video/${fileName}`}
            controls
            width="500"
            height="auto"
          />
        </div>
      ))}{" "}
    </div>
  );
}

export default Blog;
