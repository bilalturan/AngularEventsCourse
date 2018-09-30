export class Event {
  id: number;
  name: string;
  date: Date;
  time: string;
  price: number;
  imageUrl: string;
  location: Location;
}

export class Location {
  address: string;
  city: string;
  country: string;
}
