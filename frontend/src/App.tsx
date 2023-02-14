import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import DisplayTime from "./components/DisplayTime";
import GetStation from "./components/GetStation";

function App() {
  const [stationID, setStationID] = useState<string>("");

  const handleSubmit = (stationID: string) => {
    setStationID(stationID);
  };

  return (
    <div className="App">
      <GetStation onSubmit={handleSubmit} />
      <DisplayTime stationID={stationID} />
    </div>
  );
}

export default App;

//https://www.learnbestcoding.com/post/121/react-js-json-response-to-typescript-object
