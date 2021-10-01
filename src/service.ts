import { Earthquakes } from './types';
import { plainToClass } from 'class-transformer';

const EARTHQUAKE_URL = 'https://apis.is/earthquake/is';

export const requestEarthquakeData = async () : Promise<Earthquakes> => {
  const response = await fetch(EARTHQUAKE_URL);
  const json = await response.json();
  return plainToClass(Earthquakes, json);
}

