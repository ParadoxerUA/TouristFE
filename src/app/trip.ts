export class Trip {
  id?: number;
  name: string;
  start_date: string;
  end_date?: string;
  description?: string;
  points? : Checkpoint[];
  admin?: string;
  participants?: number;
  status?: string;
}

export class Checkpoint {
  order_number : number;
  latitude: number;
  longitude: number;
}
