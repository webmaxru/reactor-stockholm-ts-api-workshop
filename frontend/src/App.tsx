import React, { useState } from "react";
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
