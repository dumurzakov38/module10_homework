import React from 'react';

function Message({ message }) {
  return (
    <div className={message.myMess ? "message myMessage" : "message interlocutorsMessage"}>
      {message.p !== "" ? (
        <p>{message.p}</p>
      ) : (
        <a href={message.link} target="_blank">Гео-локация</a>
      )}
    </div>
  );
}

export default Message;
