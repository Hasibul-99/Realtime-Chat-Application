const exporess = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const router = require('./router');

const app = exporess();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials:true
  }
});


app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', ({name, room}) => {
      console.log( name, room );
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});



server.listen(PORT,  () => console.log(`Server has started on port  ${PORT}`));