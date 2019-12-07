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

const createSong = (name: string, description: string) => {
  return {
    id: name.toLowerCase().replace(/ /g, "_"),
    name,
    description,
    votes: {}
  };
};

const songs = [
  createSong(
    "Du vet hur man gör med tangenterna",
    "En sång om gamlingar och vad de tillfört under oich kanske tillochmed efter sitt år i digIT"
  ),
  createSong("Datakrisen - 1. Integrationsdebattle", ""),
  createSong("Datakrisen - 2. Patetflyktingvals", ""),
  createSong("Datakrisen - Vända hoodien efter vinden", ""),
  createSong("Datakrisen - 3. Min rad kod", ""),
  createSong("Datakrisen - 6. Systemkollaps", ""),
  createSong("Datakrisen - 8. Ndushis tårar", ""),
  createSong("Datakrisen - 4. Den där builden", ""),
  createSong("Datakrisen - 7. Datalagringens spöke", ""),
  createSong("Datakrisen - 5.Hela servern skramlar", ""),
  createSong("Jag har bara Windows (Verkligen inte klar)", "")
  //createSong("En feature kan va en bugg (EJ KLAR)", "")
  //createSong("Internetsladd i hårddisken - Blå skärm", ""),
  //createSong("Ohm", ""),
  //createSong("Tester", ""),
  //createSong("Internetsladd i hårddisken - 1177", ""),
  //createSong("Internetsladd i hårddisken - Tommy spelar in mig", ""),
];

const initialState: RootState = {
  mutationCount: 0,
  jukebox: {
    songs: songs.reduce((songs, s) => ({ ...songs, [s.id]: s }), {})
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
