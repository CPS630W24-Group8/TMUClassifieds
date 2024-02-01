// import modules
const express = require("express");
const http =  require("http");

// port for server to listen to
const PORT = process.env.PORT || 3001;

// create app
const app = express();
const server = http.createServer(app);

// return something when this url is fetched
app.get("/api", (req, res) => {
  res.json({ message: "Message from server: hello!" });
});

server.listen(PORT, (request, response) => {
	console.log(`Server started on port ${PORT}`);
});

// Reference https://dev.to/pratham10/how-to-set-up-a-node-js-express-server-for-react-2fja
