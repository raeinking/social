import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './live.css';
import video from '../../images/SnapTik_App_7206465953721322794-HD.mp4';

const socket = io.connect('http://localhost:8060');

function Mylive() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState( true || false);
  const playPauseVideo = () => {
    const video = document.getElementById('myVideo');

    if (isPlaying) {
      video.pause();
      socket.emit('control_video', 'pause');
    } else {
      video.play();
      socket.emit('control_video', 'play');
    }

    setIsPlaying(!isPlaying);
  };

  const speedslow = () => {
    const video = document.getElementById('slow');

    if (isPlaying) {
      video.pause();
      socket.emit('control_video', 'pause');
    } else {
      video.play();
      socket.emit('control_video', 'play');
    }

    setIsPlaying(!isPlaying);
  };
  const sppednormal = () => {
    const video = document.getElementById('midle');

    if (isPlaying) {
      video.pause();
      socket.emit('control_video', 'pause');
    } else {
      video.play();
      socket.emit('control_video', 'play');
    }

    setIsPlaying(!isPlaying);
  };
  const speedfast = () => {
    const video = document.getElementById('fast');
    console.log(video);

    video.playbackRate = 2; // Set playback rate to 2

  };

  const copyurl = () => {
    const urlToCopy = window.location.href;
    navigator.clipboard.writeText(urlToCopy)
      .then(() => {
        console.log('URL copied to clipboard!');
        alert('URL copied')
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      });
  };



  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('your_message', message);
    setMessages([...messages, message]);
    setMessage('');
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });


    socket.on('All', (data) => {
      if (Array.isArray(data)) {
        setMessages(prevMessages => [...prevMessages, ...data]);
      }
      console.log('prevMessages', data);
    });

    socket.on('control_video', (control) => {
      const video = document.getElementById('myVideo');
      if (control === 'pause') {
        video.pause();
        setIsPlaying(false);
      } else if (control === 'play') {
        video.play();
        setIsPlaying(true);
      }
    });

  }, []);

  

  return (
    <div className='livecontainer'>
      <div className="left">
      <video id="myVideo">
        <source src={video} type="video/mp4"/>
      </video>

      </div>
      <button className='speed1' id="slaw" onClick={speedslow}>X0.5</button>
      <button className='speed2' id="midle" onClick={sppednormal}>X1</button>
      <button className='speed3' id="fast" onClick={speedfast}>X2</button>
      <button className='btnplay' onClick={playPauseVideo}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button className='btnplays' onClick={copyurl}>Share This Party</button>

      <div className="right">
        <div className='comment'>
          <h1>Live Stream</h1>
        </div>
        <div className='livecomments'>
          <div className='chats'>

            {Array.isArray(messages) && messages.map((msg, index) => (
              <p key={index}>{msg}</p>
              ))}
          </div>
        </div>
        <div className='inputcomment'>
          <form onSubmit={sendMessage}>
            <input
              id="commentInput"
              className='btnsendcomment'
              type="text"
              name=""
              required
              placeholder='Your Comment...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">
              <img
                src="https://w7.pngwing.com/pngs/818/816/png-transparent-paper-plane-airplane-computer-icons-send-angle-ribbon-rectangle-thumbnail.png"
                alt=""
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Mylive;
