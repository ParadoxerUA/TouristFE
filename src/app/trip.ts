export class Trip {
  id?: number;
  name: string;
  startDate?: string;
  endDate?: string;
  description: string;
  listOfPoints? : Checkpoint[];
}

export class Checkpoint {
  orderNumber : number;
  latitude: number;
  longitude: number;
}
