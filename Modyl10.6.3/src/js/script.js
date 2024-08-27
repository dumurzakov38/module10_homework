const messages = [];

function addMessage(data, isMyMessage = false) {
  const message = {
    id: generateUUID(),
    myMess: isMyMessage,
    p: "",
    link: "",
  };

  if (isValidUrl(data)) {
    message.link = data;
  } else {
    message.p = data;
  }

  messages.push(message);
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function geolocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position;
          resolve(coords);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Геолокация не поддерживается браузером"));
    }
  });
}

const renderMess = () => {
  const container = document.querySelector(".container__chat");
  container.textContent = "";

  messages.map((message) => {
    const containerMess = document.createElement("div");
    containerMess.setAttribute("id_message", message.id);

    containerMess.className = message.myMess
      ? "message myMessage"
      : "message interlocutorsMessage";

    if (message.p !== "") {
      const pMess = document.createElement("p");
      pMess.textContent = message.p;

      containerMess.appendChild(pMess);
    }

    if (message.link !== "") {
      const aMess = document.createElement("a");
      aMess.href = message.link;
      aMess.textContent = "Гео-локация";
      aMess.target = "_blank";

      containerMess.appendChild(aMess);
    }

    container.appendChild(containerMess);
  });
};

const wsUri = "wss://echo-ws-service.herokuapp.com";

const inpMess = document.querySelector(".chat__input");
const btnSendMess = document.querySelector(".btn--submitMessage");
const btnSendGeoLoc = document.querySelector(".btn--submitGeoLoacation");

let websocket = new WebSocket(wsUri);

websocket.onmessage = function (evt) {
  if (!evt.data.startsWith("https://www.openstreetmap.org")) {
    addMessage(evt.data, false);
    renderMess();
  }
};

websocket.onerror = function (evt) {
  alert("ERROR: " + evt.data);
};

btnSendMess.addEventListener("click", () => {
  const message = inpMess.value.trim();
  if (message) {
    websocket.send(message);
    addMessage(message, true);
    renderMess();
    inpMess.value = "";
  }
});

btnSendGeoLoc.addEventListener("click", async () => {
  try {
    const coords = await geolocation();
    const mapLink = `https://www.openstreetmap.org/?mlat=${coords.latitude}&mlon=${coords.longitude}#map=18/${coords.latitude}/${coords.longitude}`;
    websocket.send(mapLink);
    addMessage(mapLink, true);
    renderMess();
    console.log(mapLink);
  } catch (error) {
    console.error("Ошибка получения геолокации:", error);
  }
});

window.addEventListener("beforeunload", () => {
  websocket.close();
});
