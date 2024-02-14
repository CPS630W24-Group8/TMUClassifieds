// import modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./db");
const router = require("./router");

// port for server to listen to
const PORT = process.env.PORT || 3001;

// create app
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use("/api/auth", router);

// connect to database
connectDB();

// return something when this url is fetched
app.get("/api", (request, response) => {
  response.json({ message: "Message from server: hello!" });
});

server.listen(PORT, (request, response) => {
  console.log(`Server started on port ${PORT}`);
});

// Reference https://dev.to/pratham10/how-to-set-up-a-node-js-express-server-for-react-2fja
