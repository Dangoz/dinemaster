import { Server } from "socket.io";


module.exports = (app) => {
  console.log('initializing socket');
  const io = new Server(app);

  io.on('connection', socket => {
    console.log('connection opened');
    console.log(`${socket.id} is online`);

    socket.on('join room', ({ room }) => {
      console.log(`join room at: ${room}`);
      socket.join(room);
    })

    socket.on('sendmsg', ({ room, msg }) => {
      console.log(msg);
      io.to(room).emit('recmsg', { msg });
    })
  })
}