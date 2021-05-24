import { GetServerSidePropsContext } from "next";
import { requireAuthen } from "../../../api/require.authen";
import User from "../../../api/user";
import Message from "../../../api/message";
import { useState, useEffect } from "react";
import socket from "../../../config/socket";
import router from "next/router";

const messageRoom = ({ user, visitor, }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    console.log([user.id, visitor.id])
    Message.getRoom(user.id, visitor.id)
      .then(room => {
        setRoom(room);
        socket.emit('connection');
        socket.emit('join room', { room });
        socket.on('recmsg', data => {
          setChat(chat => [...chat, data.msg]);
          console.log(chat);
        })
      })

  }, [])

  const handleChange = (e) => {

    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log("room", room)
    socket.emit('sendmsg', { room, msg: message })
  }
  return (
    <>
      {visitor.username} arrived at {user.username} <br />
      <input type="text" placeholder="message" value={message} onChange={handleChange} />

      <input type="button" onClick={handleSubmit} value='send' /> <br />

      {chat.map((d, index) => (<p key={index}> {d} </p>))}
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
