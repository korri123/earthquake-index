import { Type } from 'class-transformer';
import 'reflect-metadata';

export class EarthquakeData {
  'depth': number;
  'humanReadableLocation': string;
  'latitude': number;
  'longitude': number;
  'quality': number;
  'size': number;
  'timestamp': string;

  getTime() : Date {
    return new Date(this.timestamp);
  }
}

export class Earthquakes {
  @Type(() => EarthquakeData)
  results: EarthquakeData[] = [];
}