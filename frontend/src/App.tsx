import { map, sum, values } from "lodash";
import * as React from "react";
import { FormEvent, Suspense, useState } from "react";
import { FullPageSpinner } from "./FullPageSpinner";
import { useServerState } from "./useServerState";

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

const App: React.FC = () => {
  const [signedIn, setSignedIn] = useState(window.localStorage.getItem("USER"));
  const [state, dispatch] = useServerState("ws://jukebox.horv.se");

  return (
    <div>
      {!signedIn && <LoginForm setSubmitted={setSignedIn} />}
      {signedIn &&
        map(state?.jukebox?.songs ?? [], (song: any, id: string) => {
          const upvoted = song.votes[signedIn] > 0;
          const downvoted = song.votes[signedIn] < 0;

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
                    color: upvoted ? "#f0f0f0" : "#ec5133",
                    backgroundColor: upvoted ? "#ec5133" : "#f0f0f0",
                    borderRadius: "50%"
                  }}
                  className="no-button"
                  onClick={() =>
                    dispatch({
                      type: "VOTE",
                      songId: id,
                      username: signedIn,
                      voteDirection: 1
                    })
                  }
                >
                  ⬆
                </button>
                <div style={{ padding: 5 }}>{sum(values(song.votes))}</div>
                <button
                  style={{
                    width: 30,
                    height: 30,
                    color: downvoted ? "#f0f0f0" : "#5d77bf",
                    backgroundColor: downvoted ? "#5d77bf" : "#f0f0f0",
                    borderRadius: "50%"
                  }}
                  className="no-button"
                  onClick={() =>
                    dispatch({
                      type: "VOTE",
                      songId: id,
                      username: signedIn,
                      voteDirection: -1
                    })
                  }
                >
                  ⬇
                </button>
              </div>
              <div>{song.name}</div>
            </div>
          );
        })}
    </div>
  );
};
