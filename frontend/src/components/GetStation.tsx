import React, { useState } from "react";

type StationProps = {
  onSubmit: (stationID: string) => void; //function returns nothing
};

const GetStation = ({ onSubmit }: StationProps) => {
  const [stationID, setStationID] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof stationID === "string") {
      onSubmit(stationID);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setStationID(newValue);
  };

  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={stationID || ""}
        placeholder="Enter the Station ID"
        onChange={handleChange}
      />

      <button type="submit">Lookup</button>
    </form>
  );
};

export default GetStation;
