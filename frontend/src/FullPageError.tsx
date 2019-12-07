import * as React from "react";

export const FullPageError = () => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#008CFF",
      fontFamily: 'sans-serif',
      color: "white",
      padding: 10,
      width: "100vw",
      height: "100vh"
    }}
  >
    <h1>:(</h1>
    <p>
      Your website ran into a problem and needs to refresh. We're just
      collecting some error info, and then we'll restart for you.
    </p>
  </div>
);
