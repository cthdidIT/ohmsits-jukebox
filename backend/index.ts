import uuid from "uuid/v4";
import WebSocket from "ws";
import { createStore, combineReducers } from "redux";
import { AUTHENTICATE_USER, VOTE, VoteAction } from "./actions";

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
  votes: Record<string, number>;
}

interface JukeboxState {
  songs: Record<string, Song>;
}

const initialState: RootState = {
  mutationCount: 0,
  jukebox: {
    songs: {
      piano_man: {
        id: "piano_man",
        name: "Piano man",
        votes: {}
      }
    }
  },
  users: {
    "123123": { name: "tejp", password: "apabepa", token: "123123" }
  }
};

interface RootState {
  jukebox: JukeboxState;
  mutationCount: number;
  users: Record<string, User>;
}

const mutationCountReducer = (state: number = 0, action: any): number => {
  return state + 1;
};

const userReducer = (
  state: Record<string, User> = initialState.users,
  action: any
): Record<string, User> => {
  switch (action.type) {
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

const jukebox = (
  state: JukeboxState = initialState.jukebox,
  action: VoteAction
): JukeboxState => {
  switch (action.type) {
    case VOTE:
      return {
        ...state,
        songs: {
          ...state.songs,
          [action.songId]: {
            ...state.songs[action.songId],
            votes: {
              ...state.songs[action.songId].votes,
              [action.userId]: action.voteDirection
            }
          }
        }
      };
    default:
      return state;
  }
};

const store = createStore(
  combineReducers<RootState>({
    jukebox,
    mutationCount: mutationCountReducer,
    users: userReducer
  })
);

console.log("Running jukebox backend");

const wss = new WebSocket.Server({ host: "0.0.0.0", port: 8080 });
let connections: WebSocket[] = [];
wss.on("connection", function connection(ws) {
  connections.push(ws);
  ws.send(JSON.stringify(store.getState()));

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    console.log(JSON.parse(message.toString()));

    store.dispatch(JSON.parse(message.toString()));
    let { users, ...state } = store.getState();
    connections.forEach(conn => conn.send(JSON.stringify(state)));
  });
});
