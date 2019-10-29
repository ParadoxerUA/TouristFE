export class Trip {
  id?: number;
  name: string;
  start_date: string;
  end_date?: string;
  description?: string;
  points? : Checkpoint[];
}

export class Checkpoint {
  order_number : number;
  latitude: number;
  longitude: number;
}
