import { geolocation } from "./getGeolocation";
import { isValidUrl } from "./helper";

import { v4 as uuidv4 } from "uuid";

export function webSocket(setMessages) {
  const wsUri = "wss://echo-ws-service.herokuapp.com";

  const inpMess = document.querySelector(".chat__input");
  const btnSendMess = document.querySelector(".btn--submitMessage");
  const btnSendGeoLoc = document.querySelector(".btn--submitGeoLoacation");

  let websocket = new WebSocket(wsUri);

  function setDataInState(data, isMyMessage = false) {
    const uuid = uuidv4();
    const messageData = {
      id: uuid,
      myMess: isMyMessage,
      p: "",
      link: "",
    };

    if (isValidUrl(data)) {
      messageData.link = data;
    } else {
      messageData.p = data;
    }

    setMessages((prevMessages) => [...prevMessages, messageData]);
  }

  websocket.onmessage = function (evt) {
    if (!evt.data.startsWith("https://www.openstreetmap.org")) {
      setDataInState(evt.data);
    }
  };

  websocket.onerror = function (evt) {
    alert("ERROR: " + evt.data);
  };

  btnSendMess.addEventListener("click", () => {
    const message = inpMess.value.trim();
    if (message) {
      websocket.send(message);
      setDataInState(message, true);
      inpMess.value = "";
    }
  });

  btnSendGeoLoc.addEventListener("click", async () => {
    try {
      const coords = await geolocation();
      const mapLink = `https://www.openstreetmap.org/?mlat=${coords.latitude}&mlon=${coords.longitude}#map=18/${coords.latitude}/${coords.longitude}`;
      websocket.send(mapLink);
      setDataInState(mapLink, true);
    } catch (error) {
      console.error("Ошибка получения геолокации:", error);
    }
  });

  window.addEventListener("beforeunload", () => {
    websocket.close();
  });
}
