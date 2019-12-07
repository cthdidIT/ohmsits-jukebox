import uuid from "uuid/v4";
import WebSocket from "ws";
import { createStore } from "redux";
import { AUTHENTICATE_USER } from "./actions";

interface User {
  name: string;
  password: string;
  token: string;
}

interface Vote {
  userid: string;
  vote: number;
}

interface Song {
  id: string;
  name: string;
  votes: Vote[];
}

interface JukeboxState {
  songs: Song[];
  users: {
    [key: string]: User;
  };
}

interface FrontendState {
  songs: Song[];
}

const initialState = {
  songs: [
    {
      id: "piano_man",
      name: "Piano man",
      votes: []
    }
  ],
  users: {
    tejp: { name: "tejp", password: "apabepa" }
  }
};

const jukebox = (state = initialState, action: any) => {
  switch (action.type) {
    // we'll handle only one action: when new tweets arrive
    case AUTHENTICATE_USER:
      const { name, password } = action;
      return {
        ...state,
        users: {
          ...state.users,
          [action.name]: { name, password }
        }
      };
    default:
      return state;
  }
};

const store = createStore(jukebox);

console.log("Running jukebox backend");

const wss = new WebSocket.Server({ host: "0.0.0.0", port: 8080 });
let connections: WebSocket[] = [];
wss.on("connection", function connection(ws) {
  connections.push(ws);

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    console.log(JSON.parse(message.toString()));

    store.dispatch(JSON.parse(message.toString()));
    let { users, ...state } = store.getState();
    connections.forEach(conn => conn.send(JSON.stringify(state)));
  });

  ws.send("something");
});
