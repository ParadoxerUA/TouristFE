export class Trip {
  id?: number;
  name: string;
  start_date: string;
  end_date?: string;
  description?: string;
  points? : Checkpoint[];
  // admin_id: number;
}

export class Checkpoint {
  order_number : number;
  latitude: number;
  longitude: number;
}

export class Items {
  name: string;
  weight: number;
  amount: number;
}
