import React from 'react'
import './live.css'
function Mylive() {
  return (
    <div className='livecontainer'>
        <div className="left">
            <iframe
             src="https://www.youtube.com/embed/tgbNymZ7vqY">
            </iframe>
        </div>
        <div className="right">
            <div className='comment'>
                <h1>Live Stream</h1>
            </div>
            <div className='livecomments'>
                <div className='chats'>

                </div>
            </div>
            <div className='inputcomment'>
                <input className='btnsendcomment' type="text" name="" id="" required placeholder='Your Comment...' />
                <img src="https://w7.pngwing.com/pngs/818/816/png-transparent-paper-plane-airplane-computer-icons-send-angle-ribbon-rectangle-thumbnail.png" alt="" srcset="" />
            </div>
        </div>
    </div>
  )
}

export default Mylive