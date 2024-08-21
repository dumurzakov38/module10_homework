import React, { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/message";
import { webSocket } from "./js/websocket";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    webSocket(setMessages);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="container__inputAndBtn">
          <input
            className="chat__input"
            type="text"
            placeholder="Введите сообщение"
          />
          <div className="btn__container">
            <button
              className="chat__btn btn--submitMessage"
              title="Отправить сообщение"
            >
              Отправить
            </button>
            <button
              className="chat__btn btn--submitGeoLoacation"
              title="Отправить Гео-локацию"
            >
              Гео-локация
            </button>
          </div>
        </div>
        <div className="container__chat">
          {messages.map((element) => (
            <Message id={element.id} key={element.id} message={element} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
