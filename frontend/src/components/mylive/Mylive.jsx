// import React from 'react'
// import './live.css'
// function Mylive() {
//   return (
//     <div className='livecontainer'>
//         <div className="left">
//             <iframe
//              src="https://www.youtube.com/embed/tgbNymZ7vqY">
//             </iframe>
//         </div>
//         <div className="right">
//             <div className='comment'>
//                 <h1>Live Stream</h1>
//             </div>
//             <div className='livecomments'>
//                 <div className='chats'>

//                 </div>
//             </div>
//             <div className='inputcomment'>
//                 <input className='btnsendcomment' type="text" name="" id="" required placeholder='Your Comment...' />
//                 <img src="https://w7.pngwing.com/pngs/818/816/png-transparent-paper-plane-airplane-computer-icons-send-angle-ribbon-rectangle-thumbnail.png" alt="" srcset="" />
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Mylive

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function Mylive() {
  const [videoFilename, setVideoFilename] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:8040"); // Replace with your server URL

    socket.on("video", (data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.event === "video" && parsedData.filename) {
        setVideoFilename(parsedData.filename);
      }
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection on component unmount
    };
  }, []);

  return (
    <div className="livecontainer">
      {" "}
      {videoFilename && (
        <video controls width="500" height="auto">
          <source
            src={`http://localhost:8040/video/${videoFilename}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.{" "}
        </video>
      )}{" "}
    </div>
  );
}

export default Mylive;
