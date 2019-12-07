import * as React from "react";
import { ReactComponent as Spinner } from "./spinner.svg";

export const FullPageSpinner = () => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      backgroundColor: 'white',
      alignItems: "center",
      width: "100vw",
      height: "100vh"
    }}
  >
    <Spinner/>
  </div>
);
