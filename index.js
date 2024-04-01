// import modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const socketio = require('socket.io');
const connectDB = require("./db");
const authenticationRouter = require("./authenticationRouter");
const itemWantedRouter = require("./itemWantedRouter");
const itemSaleRouter = require("./itemSaleRouter");
const serviceRouter = require("./serviceRouter");
const contactRouter = require("./contactRouter");

// port for server to listen to
const PORT = process.env.PORT || 3001;

// create app
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use("/api/auth", authenticationRouter);
app.use("/api/item-wanted", itemWantedRouter);
app.use("/api/item-sale", itemSaleRouter);
app.use("/api/service", serviceRouter);
app.use("/api/contact", contactRouter);

// connect to database
connectDB();

// web socket connection
const io = socketio(server);
io.on('connection', socket => {
  socket.on('join-room', data => {
    socket.join(data.room);
  });
  
  // listen for chat messages and send message to both users
  socket.on('chat-message', (data) => {
    io.to(data.room).emit('message', data);
  });
});

// return something when this url is fetched
app.get("/api", (request, response) => {
  response.json({ message: "Message from server: hello!" });
});

server.listen(PORT, (request, response) => {
  console.log(`Server started on port ${PORT}`);
});

// Reference https://dev.to/pratham10/how-to-set-up-a-node-js-express-server-for-react-2fja
