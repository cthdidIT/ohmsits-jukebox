import { useCallback, useEffect, useRef, useState } from "react";

export type ServerState = any;

export type ServerAction = { type: string };

export const useServerState = (
  url: string
): [ServerState, <T extends ServerAction>(action: T) => T] => {
  const conn = useRef<WebSocket | null>(null);
  const [state, setState] = useState<ServerState | null>();

  useEffect(() => {
    conn.current = new WebSocket(url);

    conn.current.onmessage = (event: MessageEvent) => {
      setState((prevState: ServerState) => {
        const state: ServerState = JSON.parse(event.data);

        if (!prevState || state.mutationCount > prevState.mutationCount) {
          return state;
        } else {
          return prevState;
        }
      });
    };
  }, [url]);

  const dispatch = useCallback(<T extends ServerAction>(action: T): T => {
    if (conn.current) {
      conn.current.send(JSON.stringify(action));
    }
    return action;
  }, []);

  return [state, dispatch];
};
