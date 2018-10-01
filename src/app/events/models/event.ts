export class Event {
  id: number;
  name: string;
  date: Date;
  time: string;
  price: number;
  imageUrl: string;
  location: Location;
  onlineUrl: string;
}

export class Location {
  address: string;
  city: string;
  country: string;
}
