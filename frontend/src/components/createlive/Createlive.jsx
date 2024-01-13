import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Createlive() {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);

  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("userId", "65a1e4ad44248b2036513325");
    formData.append("title", title);
    formData.append("thumbnail", e.target[1].value);
    formData.append("myFile", video);
    formData.append("live", true);
    formData.append("room", Math.random().toString(36).substring(2, 15));

    console.log(title, video);

    try {
      const response = await fetch("http://localhost:8060/post/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('eeror');
      }

      const data = await response.json();
      console.log(data.message, data.post);
    } catch (error) {
      console.error("Error creating post:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const id = "65a1e4ad44248b2036513325"; // Replace with your dynamic ID

  return (
    <>
      <div className="loginpage">
        <div className="blackcover">
          <form className="formlogin" action="" onSubmit={createPost}>
            <h1> Create Live </h1> <label> Title </label>{" "}
            <input
              type="text"
              placeholder="Your Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label> Video </label>{" "}
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files[0])} // Handle the file
              required
            />
            <input className="btnlogin" type="submit" value="Create" />
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default Createlive;