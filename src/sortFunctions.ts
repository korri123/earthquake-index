import { EarthquakeData, SortFunction } from './types';

export interface SortOption {
  name: string
  id: string
  sortFunction: SortFunction
}

const makeSortFn = (fieldFn: (earthquake: EarthquakeData) => number, reverse?: boolean): SortFunction => {
  return (a: EarthquakeData, b: EarthquakeData) => {
    return !reverse ? fieldFn(a) - fieldFn(b) : fieldFn(b) - fieldFn(a);
  };
};

export const sortByNew = makeSortFn(earthquake => earthquake.getTime().getTime());
export const sortByOld = makeSortFn(earthquake => earthquake.getTime().getTime(), true)
export const sortBySize = makeSortFn(earthquake => earthquake.size);
export const sortByQuality = makeSortFn(earthquake => earthquake.quality);
export const sortByDepth = makeSortFn(earthquake => earthquake.depth);
export const sortByLongitude = makeSortFn(earthquake => earthquake.longitude);
export const sortByLatitude = makeSortFn(earthquake => earthquake.latitude);

interface SortOptions {
  newest: SortOption;
  oldest: SortOption;
  size: SortOption;
  quality: SortOption;
  depth: SortOption;
  longitude: SortOption;
  latitude: SortOption;
  [key:string]: SortOption;
}

export const sortOptions: SortOptions = {
  newest: { name: 'Newest', id: 'newest', sortFunction: sortByNew },
  oldest: { name: 'Oldest', id: 'oldest', sortFunction: sortByOld },
  size: { name: 'Size', id: 'size', sortFunction: sortBySize },
  quality: { name: 'Quality', id: 'quality', sortFunction: sortByQuality },
  depth: { name: 'Depth', id: 'depth', sortFunction: sortByDepth },
  longitude: { name: 'Longitude', id: 'longitude', sortFunction: sortByLongitude },
  latitude: { name: 'Latitude', id: 'latitude', sortFunction: sortByLatitude },
}