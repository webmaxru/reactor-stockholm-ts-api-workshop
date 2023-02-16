import React, { useState, useEffect } from "react";

export interface DisplayTime {
  stationId: number;
  results: Results;
}

export interface Results {
  LatestUpdate: string;
  DataAge: number;
  Metros: Metro[];
  Buses: Buse[];
  Trains: Train[];
  Trams: any[];
  Ships: any[];
  StopPointDeviations: StopPointDeviation[];
}

export interface Metro {
  GroupOfLine: string;
  DisplayTime: string;
  TransportMode: string;
  LineNumber: string;
  Destination: string;
  JourneyDirection: number;
  StopAreaName: string;
  StopAreaNumber: number;
  StopPointNumber: number;
  StopPointDesignation: string;
  TimeTabledDateTime: string;
  ExpectedDateTime: string;
  JourneyNumber: number;
  Deviations: any;
}

export interface Buse {
  GroupOfLine?: string;
  TransportMode: string;
  LineNumber: string;
  Destination: string;
  JourneyDirection: number;
  StopAreaName: string;
  StopAreaNumber: number;
  StopPointNumber: number;
  StopPointDesignation: string;
  TimeTabledDateTime: string;
  ExpectedDateTime?: string;
  DisplayTime: string;
  JourneyNumber: number;
  Deviations?: Deviation[];
}

export interface Deviation {
  Text: string;
  Consequence: string;
  ImportanceLevel: number;
}

export interface Train {
  SecondaryDestinationName: any;
  GroupOfLine: string;
  TransportMode: string;
  LineNumber: string;
  Destination: string;
  JourneyDirection: number;
  StopAreaName: string;
  StopAreaNumber: number;
  StopPointNumber: number;
  StopPointDesignation: string;
  TimeTabledDateTime: string;
  ExpectedDateTime: string;
  DisplayTime: string;
  JourneyNumber: number;
  Deviations: any;
}

export interface StopPointDeviation {
  StopInfo: StopInfo;
  Deviation: Deviation2;
}

export interface StopInfo {
  StopAreaNumber: number;
  StopAreaName: string;
  TransportMode: string;
  GroupOfLine: string;
}

export interface Deviation2 {
  Text: string;
  Consequence: any;
  ImportanceLevel: number;
}

export interface stationID {
  stationID: string;
}

const BASE_API_URL = "http://localhost:3000/times/";
const TransitTimes = ({ stationID }: stationID) => {
  // const TransitTimes: React.FC<Props> = ({ stationID }) => {};
  const [data, setData] = useState<DisplayTime | null>(null);

  function getTimes(): Promise<DisplayTime> {
    const url = BASE_API_URL + stationID;
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        if (err instanceof Error) console.log(err.message);
      })
      .then((data) => data as DisplayTime);
  }

  useEffect(() => {
    getTimes().then((item) => setData(item));
  }, [stationID]);

  if (!data) {
    return <div>Data is Loading..</div>;
  }
  return (
    <div>
      <h1>Train Number 1 to {data?.results?.Metros[0]?.Destination} </h1>
      <h2>The train will arrive in {data?.results?.Metros[0]?.DisplayTime}</h2>
      <h1>Train Number 2 to {data?.results?.Metros[1]?.Destination} </h1>
      <h2>The train will arrive in {data?.results?.Metros[1]?.DisplayTime}</h2>
      <h1>Train Number 3 to {data?.results?.Metros[2]?.Destination} </h1>
      <h2>The train will arrive in {data?.results?.Metros[2]?.DisplayTime}</h2>
    </div>
  );
};

export default TransitTimes;
