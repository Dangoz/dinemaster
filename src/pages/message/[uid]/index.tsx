import { GetServerSidePropsContext } from "next";
import { requireAuthen } from "../../../api/require.authen";
import User from "../../../api/user";
import Message from "../../../api/message";
import IMessage from "../../../interface/message.interface";
import { useState, useEffect } from "react";
import socket from "../../../config/socket";
import ChatStyle from "../../../styles/message/chat.module.css";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import router from "next/router";
import { CircularProgress } from "@material-ui/core";


const messageRoom = ({ user, visitor, }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<IMessage[]>([]);

  useEffect(() => {
    console.log([user.id, visitor.id])
    Message.getRoom(user.id, visitor.id)
      .then(room => {
        setRoom(room);
        socket.emit('connection');
        socket.emit('join room', { room });
        socket.emit('msg history', { room });
        socket.on('rec history', data => {
          setChat(data.messages);
          console.log("data", data);
        })
        socket.on('recmsg', data => {
          const newMessage: IMessage = data;
          setChat(chat => [...chat, newMessage]);
        })
      })

  }, [])

  const handleChange = (event) => {
    setMessage(event.target.value);
  }

  const handleSubmit = (event) => {
    if (message.trim() == "") return;
    const createdAt = new Date();
    const newMessage: IMessage = { message, userId: visitor.id, roomId: room, createdAt };
    setChat(chat => [...chat, newMessage]);
    socket.emit('sendmsg', { room, message, userId: visitor.id, createdAt })
    setMessage('');
  }
  const enterKey = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  }
  const backToMessage = (event) => {
    router.push("/message");
  }

  return (
    <>
      {visitor.username} arrived at {user.username} <br />
      <ArrowBackIosIcon onClick={backToMessage} className={ChatStyle.backButton}/>
      <input type="text" placeholder="message" value={message} onChange={handleChange} onKeyDown={enterKey} />

      <input type="button" onClick={handleSubmit} value='send' /> <br />

      {chat.map((msg, index) => (
        msg.userId === visitor.id
          ? <div key={index}>
            <img src={visitor.photo} className={ChatStyle.myProfilePhoto + " " + ChatStyle.profilePhoto}/>
            <div className={ChatStyle.myChat}> {msg.message} </div>
          </div>
          : <div key={index}>
            <img src={user.photo} className={ChatStyle.otherProfilePhoto + " " + ChatStyle.profilePhoto} />
            <div className={ChatStyle.otherChat}> {msg.message} </div>
          </div>
      ))}
    </>
  )
}

export const getServerSideProps = requireAuthen(async function (context: GetServerSidePropsContext, visitor) {
  // fetch user profile from server
  const id: string = context.params.uid.toString();
  if (id === visitor.id) return {
    redirect: {
      destination: '/message',
      permanent: false
    }
  }
  const user = await User.getUser(context, id);

  return {
    props: {
      user,
      visitor,
    }
  }
})

export default messageRoom
