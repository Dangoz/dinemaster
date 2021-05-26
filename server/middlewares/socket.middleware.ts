import { Server } from "socket.io";
import MessageModel from "../model/message.model";

module.exports = (app) => {
  console.log('initializing socket');
  const messagedb = new MessageModel();
  const io = new Server(app);

  io.on('connection', socket => {
    console.log('connection opened');
    console.log(`${socket.id} is online`);

    socket.on('join room', ({ room }) => {
      console.log(`join room at: ${room}`);
      socket.join(room);
    })

    socket.on('leave room', (room) => {
      socket.leave(room);
    })

    socket.on('sendmsg', ({ room, message, userId, createdAt }) => {
      console.log(message);
      messagedb.createMessage(message, userId, room, createdAt)
      socket.to(room).emit('recmsg', { message, userId, roomId: room, createdAt });
    })

    socket.on('msg history', ({ room }) => {
      messagedb.getMessagesByRoom(room).
        then(messages => {
          socket.emit('rec history', ({ messages }))
        })
    })
  })
}