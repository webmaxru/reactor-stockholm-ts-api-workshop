import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ZodError } from 'zod';
import { loadConfig } from './app-config';
const config = loadConfig()!;

type Deviation = {
  Text: string;
  Consequence: 'CANCELLED' | 'INFORMATION' | null;
  ImportanceLevel: number;
}[];

interface TransportInfo {
  GroupOfLine: string;
  TransportMode: string;
  LineNumber: string;
  Destination: string;
  JourneyDirection: number;
  StopAreaName: string;
  StopAreaNumber: number;
  StopPointNumber: number;
  StopPointDesignation: string;
  TimeTabledDateTime: Date;
  ExpectedDateTime: Date;
  DisplayTime: string;
  JourneyNumber: number;
  Deviations: Deviation[] | null;
  SecondaryDestinationName?: null;
}

interface StationInfo {
  ResponseData: {
    LatestUpdate: string;
    DataAge: number;
    Metros: TransportInfo[];
    Buses: TransportInfo[];
    Trains: TransportInfo[];
    Trams: TransportInfo[];
    Ships: TransportInfo[];
    StopPointDeviations: {
      StopInfo: {
        StopAreaNumber: number;
        StopAreaName: string;
        TransportMode: string;
        GroupOfLine: string;
      };
      Deviation: Deviation;
    };
  };
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const stationId = context.bindingData.stationId;

  try {
    const apiCall = await fetch(
      `${config.apiUrl}?key=${config.apiKey}&siteid=${stationId}&timewindow=60`
    );
    const data: StationInfo = await apiCall.json();

    context.res = {
      body: {
        stationId,
        results: data.ResponseData,
      },
    };
  } catch (err) {
    if (err instanceof ZodError) {
      context.res = {
        status: 422 /* Defaults to 200 */,
        body: {
          message: err.message,
          errors: err.errors,
          cause: err.issues,
        },
      };
    }
  }
};

export default httpTrigger;
