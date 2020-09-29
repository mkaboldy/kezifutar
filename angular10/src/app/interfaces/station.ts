export interface Station {
    ID: string;
    name: string;
    vehicleTypes: {
        bus: boolean,
        tram: boolean,
        trolleybus: boolean,
        rail: boolean,
        subway: boolean,
      };
      stops: Array<string>;
}
