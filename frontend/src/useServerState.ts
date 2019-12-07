import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

export type ServerState = any;

export type ServerAction = { type: string };

export const useServerState = (
  url: string
): [ServerState, <T extends ServerAction>(action: T) => T, boolean] => {
  const conn = useRef<WebSocket | null>(null);
  const [error, setError] = useState(false);
  const [state, setState] = useState<ServerState | null>();

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      setError(false);
      setState((prevState: ServerState) => {
        const state: ServerState = JSON.parse(event.data);
        if (!prevState || state.mutationCount > prevState.mutationCount) {
          return state;
        } else {
          return prevState;
        }
      });
    };

    const setupConnection = () => {
      conn.current = new WebSocket(url);
      conn.current.onmessage = onMessage;
      const onerror = debounce(setupConnection, 1000);
      conn.current.onerror = () => {
        setError(true);
        onerror();
      };
    };

    setupConnection();
  }, [url]);

  const dispatch = useCallback(<T extends ServerAction>(action: T): T => {
    if (conn.current) {
      conn.current.send(JSON.stringify(action));
    }
    return action;
  }, []);

  return [state, dispatch, error];
};
