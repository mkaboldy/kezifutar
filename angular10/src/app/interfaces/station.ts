export interface Station {
  ID: string;
  name: string;
  vehicleTypes?: {
    bus: boolean,
    tram: boolean,
    trolleybus: boolean,
    rail: boolean,
    subway: boolean,
  };
  stops?: Array<Stop>;
  stopCodeList: string;
}

export interface Stop {
  id: string;
}
