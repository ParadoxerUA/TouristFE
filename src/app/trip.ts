export class Trip {
  trip_id?: number;
  name: string;
  start_date: string;
  end_date?: string;
  description?: string;
  points? : Checkpoint[];
  admin?: string;
  participants?: number;
  status?: string;
  trip_uuid?: string;

}

export class Checkpoint {
  order_number : number;
  latitude: number;
  longitude: number;
}

export class Items {
  name: string;
  weight: number;
  quantity: number;
}

export class Role {
  id: number;
  name: string;
}
