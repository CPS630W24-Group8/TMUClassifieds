// import modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./db");
const authenticationRouter = require("./authenticationRouter");
const itemWantedRouter = require("./itemWantedRouter");
const itemSaleRouter = require("./itemSaleRouter");
const serviceRouter = require("./serviceRouter");

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
