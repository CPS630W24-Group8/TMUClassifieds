# TMU Classifieds

<!-- TODO: Brief description here -->

### Structure

#### 1. Server (Back-end)

Project is set up with a basic NodeJS and Express server. Server code are located in the root directory.

#### 2. Client (Front-end)

Project is set up with a ReactJS app using Bootstrap styling. Client code are located in [root/tmuclassifieds-clients](https://github.com/CPS630W24-Group8/TMUClassifieds/tree/main/tmuclassifieds-client). Routing is also set up in client.

### How to run server

Remember to install [NodeJS](https://nodejs.org/en) and [MongoDB](https://www.mongodb.com/try/download/community) first.

To run server:

1. Open a terminal and navigate to the root directory `(C:/.../TMUClassifieds)`.
2. Run `npm start`.
3. Should see a message `Server started on port 3001`.
4. To make sure everything works, on your web browser, go to http://localhost:3001/api, should see a JSON message:
```
{
    "message": "Message from server: hello!"
}
```

Server is currently running on localhost for development. Reminder: before submitting project, replace every instance of `http://localhost:3001` with `https://tmuclassifieds.onrender.com` to use the hosted server. Server will be deployed on Git pushed.

### How to run client

1. Open a terminal and navigate the client directory `(C:/.../TMUClassifieds/tmuclassifieds-client)`.
2. Run `npm start`.
3. Should see a message `Compiled successfully`.
4. On your web browser, go to http://localhost:3000/, should see the landing page.