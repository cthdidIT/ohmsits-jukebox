import { createStore, combineReducers } from "redux";
import { VoteAction, VOTE, AUTHENTICATE_USER } from "./actions";
import { songs } from "./songs";
const uuid = require("uuid/v3");
const uuid4 = require("uuid/v4");

interface User {
  name: string;
}

interface Vote {
  userid: string;
  vote: number;
}

interface Song {
  id: string;
  new: boolean;
  name: string;
  votes: Record<string, number>;
}

interface JukeboxState {
  songs: Record<string, Song>;
}

const createSong = (name: string, description: string) => {
  return {
    id: uuid(name, uuid.DNS),
    name,
    description,
    votes: {}
  };
};

const initialState: RootState = {
  sessionId: uuid4(),
  mutationCount: 0,
  jukebox: {
    songs: songs.reduce((songs, s) => ({ ...songs, [s.id]: s }), {})
  },
  users: {
    tejp: { name: "tejp" }
  }
};

interface RootState {
  sessionId: string;
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
      const { name } = action;
      return {
        ...state,
        users: {
          ...state.users,
          [action.name]: { name }
        }
      };
    case VOTE:
      const { username }: VoteAction = action;
      return {
        ...state,
        users: {
          ...state.users,
          [username]: username
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
              [action.username]: action.voteDirection
            }
          }
        }
      };
    default:
      return state;
  }
};

export const store = createStore(
  combineReducers<RootState>({
    sessionId: () => initialState.sessionId,
    jukebox,
    mutationCount: mutationCountReducer,
    users: userReducer
  })
);
