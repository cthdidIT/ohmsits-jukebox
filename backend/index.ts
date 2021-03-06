import WebSocket from "ws";
import { store } from "./src/reducer";

console.log("Running jukebox backend");

const wss = new WebSocket.Server({ host: "0.0.0.0", port: 8080 });
let connections: WebSocket[] = [];
wss.on("connection", function connection(ws) {
  connections.push(ws);
  let { users, ...state } = store.getState();
  ws.send(JSON.stringify(state));

  ws.on("message", function incoming(message) {
    try {
      console.log("received: %s", message);
      console.log(JSON.parse(message.toString()));

      store.dispatch(JSON.parse(message.toString()));
      let { users, ...state } = store.getState();
      const statePayload = JSON.stringify(state);
      connections.forEach(conn => conn.send(statePayload));
    } catch (e) {
      console.error(e);
    }
  });
});
