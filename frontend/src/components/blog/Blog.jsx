import React from "react";
import "../blog/blog.css";
function Blog({ name }) {
  return (
    <div className="blogcontainer">
      <div className="header">
        <h1>{name}</h1>
        <div className="avatar">H</div>
      </div>
    </div>
  );
}

export default Blog;
