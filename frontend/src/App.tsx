import { map, sum, values } from "lodash";
import * as React from "react";
import { FormEvent, Suspense, useState } from "react";
import { ReactComponent as ChevronDown } from "./chevron-down.svg";
import { ReactComponent as ChevronUp } from "./chevron-up.svg";
import { FullPageSpinner } from "./FullPageSpinner";
import { ServerAction, useServerState } from "./useServerState";

export const Root = () => (
  <Suspense fallback={<FullPageSpinner />}>
    <App />
  </Suspense>
);

interface LoginFormProps {
  setSubmitted: (v: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setSubmitted }) => {
  const [name, setName] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    window.localStorage.setItem("USER", name);
    setSubmitted(name);
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        onChange={event => setName(event.target.value)}
        value={name}
      />
      <button type={"submit"}>Login</button>
    </form>
  );
};

interface VotingArrowsProps {
  dispatch: <T extends ServerAction>(a: T) => T;
  username: string;
  song: any;
}

const VotingArrows: React.FC<VotingArrowsProps> = ({
  dispatch,
  username,
  song
}) => {
  const songId = song.id;
  const upvoted = song.votes[username] > 0;
  const downvoted = song.votes[username] < 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0 5px"
      }}
    >
      <button
        style={{
          width: 30,
          height: 30,
          backgroundColor: upvoted ? "#ec5133" : "#f0f0f0",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="no-button"
        onClick={() =>
          dispatch({
            type: "VOTE",
            songId,
            username,
            voteDirection: upvoted ? 0 : 1
          })
        }
      >
        <ChevronUp height={15} width={15} fill={upvoted ? "#f0f0f0" : "#ec5133"} />
      </button>
      <div style={{ padding: 5 }}>{sum(values(song.votes))}</div>
      <button
        style={{
          width: 30,
          height: 30,
          backgroundColor: downvoted ? "#5d77bf" : "#f0f0f0",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="no-button"
        onClick={() =>
          dispatch({
            type: "VOTE",
            songId,
            username,
            voteDirection: downvoted ? 0 : -1
          })
        }
      >
        <ChevronDown height={15} width={15} fill={downvoted ? "#f0f0f0" : "#5d77bf"} />
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [signedIn, setSignedIn] = useState(window.localStorage.getItem("USER"));
  const [state, dispatch] = useServerState("ws://jukebox.horv.se/ws");

  if (!state) {
    return <FullPageSpinner />;
  }

  return (
    <div>
      {!signedIn && <LoginForm setSubmitted={setSignedIn} />}
      {signedIn &&
        map(state?.jukebox?.songs ?? [], (song: any, id: string) => {
          return (
            <div
              key={id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderBottom: "1px solid black"
              }}
            >
              <VotingArrows
                dispatch={dispatch}
                username={signedIn}
                song={song}
              />
              <div>{song.name}</div>
            </div>
          );
        })}
    </div>
  );
};
