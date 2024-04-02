import React, { useState, useEffect } from "react";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UnauthDisplay from "../components/UnauthDisplay";
import { getCookie } from "../cookieManager";
import ChatMessage from "../components/ChatMessage";

const ContactPage = () => {
  const [loggedIn, setLoggedIn] = useState(0);
  const [selectButton, setSelectButton] = useState();
  const [allChats, setAllChats] = useState();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageUpdating, setMessageUpdating] = useState(false);
  const [usersInChat, setUsersInChat] = useState(null);

  useEffect(() => {
    setLoggedIn(getCookie("email") !== "");
  }, []);

  useEffect(() => async () => {
    const response = await fetch(`http://localhost:3001/api/contact/get-user-chat?user=${getCookie('email')}`)
    response.json().then(data => {
      setAllChats(data.data);
    });
  }, []);

  useEffect(() => {
    if (socket === null) {
      setSocket(io());
    }
    if (socket) {
      // message from server
      socket.on('message', async (data) => {
        let name = data.user;
        if (data.user === getCookie('email')) {
          name = "You";
          await fetch("http://localhost:3001/api/contact/add-message", {
            method: "POST",
            body: JSON.stringify({ user: data.user, room: data.room, message: data.message, date: data.date }),
            headers: { "Content-Type": "application/json" }
          });
        }
        setMessageUpdating(true);
        let list = messages.concat([<ChatMessage user={name} message={data.message} date={data.date} />]);
        list = getUniqueMessage(list);
        setMessages(list);

        // scroll down
        const messageContainer = document.getElementById("message-container");
        messageContainer.scrollTo(0, messageContainer.scrollHeight);
      });
    }
  }, [messages, socket]);

  useEffect(() => {
    if (messageUpdating) {
      addInitialMessages(selectButton);
    }
  }, [messageUpdating, selectButton]);

  // send input message to the socket server
  const sendMessage = (event) => {
    event.preventDefault();
    if (event.target[0].value.trim() !== "") {
      const date = new Date();
      socket.emit('chat-message', { user: getCookie('email'), room: selectButton, message: event.target[0].value, date: date.toLocaleString("en-US") });
      // clear input
      event.target[0].value = "";
    }
  }

  // return a list of unique messages
  const getUniqueMessage = (list) => {
    let unique = [];
    for (let i = 0; i < list.length - 1; i++) {
      let isSame = false;
      for (let j = i + 1; j < list.length; j++) {
        if (list[i].user === list[j].user && list[i].body === list[j].body && list[i].date === list[j].date) {
          isSame = true;
          break;
        }
      }
      if (!isSame) {
        unique.push(list[i]);
      }
    }
    unique.push(list[list.length - 1]);
    return unique;
  }

  // add initial chat messages from database when user first click on a chat
  const addInitialMessages = async (selected) => {
    // get all messages from the chat
    const response = await fetch(`http://localhost:3001/api/contact/get-chat?user=${getCookie('email')}&title=${selected}`)
    response.json().then(data => {
      if (data.data != null) {
        setUsersInChat(data.data.users);

        let printMessages = [];
        if (data.data.messages.length > 0) {
          let list = data.data.messages;

          list = getUniqueMessage(list);

          for (let message of list) {
            let name = message.user;

            if (message.user === getCookie('email')) {
              name = "You";
            }
            printMessages.push(<ChatMessage user={name} message={message.body} date={message.date} />);
          }
        }
        setMessages(printMessages);
        setMessageUpdating(false);
      }
    });
  }

  // start the selected chat room
  const selectChat = (event) => {
    event.preventDefault();
    setMessageUpdating(true);
    setSelectButton(event.target.value);
    
    addInitialMessages(event.target.value);
    // start chatroom
    socket.emit('join-room', { room: event.target.value });
  }

  // remove user from the chat room's users list in database
  const leaveChat = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to leave the chat room?")) {
      await fetch("http://localhost:3001/api/contact/remove-user", {
        method: 'POST',
        body: JSON.stringify({ user: getCookie("email"), room: selectButton }),
        headers: { "Content-Type": "application/json" }
      }).then(async (response) => {
        if (response.status === 200) {
          // delete the room from database if there are no users
          await fetch("http://localhost:3001/api/contact/delete-room", {
            method: 'POST',
            body: JSON.stringify({ room: selectButton }),
            headers: { "Content-Type": "application/json" }
          });
          window.location.reload();
        }
        else {
          alert(response.status + " - " + response.statusText);
        }
      });
    }
  }

  if (!loggedIn) {
    return (
      <div>
        <Navbar />
        <Header title="Contact" />
        <br />
        <UnauthDisplay />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Header title="Contacts" />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-3 overflow-auto" style={{ minWidth: "150px", maxHeight: '450px', marginBottom: "20px" }}>
            <div className="d-grid gap-2">
              {allChats == null || allChats.length === 0
                ? <p>You are in no chat rooms.</p>
                : allChats.map(chat =>
                  <button className="btn btn-secondary" value={chat.title} onClick={selectChat}>{chat.title}</button>
                )}
            </div>
          </div>
          <div className="col-9">
            {selectButton == null
              ? ""
              : <div className="container">
                <p className="fs-3 text-center">{selectButton}</p>
                <div className="row">
                  <div className="col">
                    {usersInChat == null
                      ? ""
                      : <p className="fw-bold">Users: 
                        {usersInChat.map((message, i) =>
                          <div key={i} className="fw-normal">{message}</div>
                        )}
                      </p>
                    }
                  </div>
                  <div className="col text-end">
                    <button type="button" class="btn btn-danger" onClick={leaveChat}>Leave chat</button>
                  </div>
                </div>
                <div className="container">
                  <div id="message-container" className="overflow-auto" style={{ height: '410px', marginTop: '20px' }}>
                    {messages.map((message, i) =>
                      <div key={i}>{message}</div>
                    )}
                  </div>
                  <div id="send-container" style={{ marginTop: '20px' }}>
                    <form onSubmit={sendMessage}>
                      <div className="input-group mb-3">
                        <input type="text" className="form-control" aria-describedby="message-input" />
                        <button className="btn btn-outline-secondary" type="submit" id="message-input">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;