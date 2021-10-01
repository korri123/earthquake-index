import { Type } from 'class-transformer';
import 'reflect-metadata';
import { SortOption } from './sortFunctions';

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

export type SortFunction = (a: EarthquakeData, b: EarthquakeData) => number;

export class Earthquakes {
  @Type(() => EarthquakeData)
  results: EarthquakeData[] = [];

  sort(sortFn: SortFunction) {
    this.results.sort(sortFn);
  }
}