export class WeatherData {
  lat: number;
  lon: number;
  name: string;
  state: {
    text: string;
    icon: string;
  };
  temp: number;
  fetched: boolean;

  constructor() {
    this.lat = 0;
    this.lon = 0;
    this.name = '';
    this.state = { text: '', icon: '' };
    this.temp = 0;
    this.fetched = false;
  }
}
