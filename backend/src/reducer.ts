import { createStore, combineReducers } from "redux";
import { VoteAction, VOTE, AUTHENTICATE_USER } from "./actions";

interface User {
  name: string;
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
    tejp: { name: "tejp" }
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
    jukebox,
    mutationCount: mutationCountReducer,
    users: userReducer
  })
);
