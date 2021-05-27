import { useState, useEffect } from 'react';
import MessageStyle from "../../styles/message/message.module.css";
import SwiperStyle from "../../styles/home/swiper.module.css";
import { CircularProgress } from "@material-ui/core";
import Message from "../../api/message";
import router from "next/router";

const RecentChats = ({ userId }) => {
  const [isMobile, setIsMobile] = useState(null);
  const [chats, setChats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // detect if device is mobile
    setIsMobile(require("../../config/isMobile")(navigator.userAgent));

    Message.getRecentChats(userId)
      .then(chats => {
        setChats(chats);
        console.log(JSON.stringify(chats, null, 2));
        setIsLoading(false);
      })
  }, [])

  const message = (event, userId) => {
    router.push(`/message/${userId}`)
  }

  return (
    <>
      <div className={isMobile ? MessageStyle.mobileWrapper : MessageStyle.wrapper}>
        {isLoading
          ? <div className={SwiperStyle.CircularProgressContainer + " " + MessageStyle.progress}>
            <CircularProgress className={SwiperStyle.CircularProgress} value={100} color="inherit" size={33} />
          </div>

          : chats.map((chat, index) => (
            <div onClick={(e) => message(e, chat.id)} key={index} className={isMobile ? MessageStyle.mobileItem : MessageStyle.item}>
              <img className={MessageStyle.photo} src={chat.photo} />
              <div className={MessageStyle.description}>
                <span className={MessageStyle.username}>{chat.username}</span><br/>
                <span className={MessageStyle.bio}>{chat.bio}</span>
              </div>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default RecentChats
