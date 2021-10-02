import { SortOption, sortOptions } from './sortUtils';
import React from 'react';

export interface EarthquakeContext {
  sortOption: SortOption;
  setSortOption: (sortOption: SortOption) => void;
  pollTime: number;
  setPollTime: (time: number) => void;
  nextRefreshTime: number
}

export const defaultCtx: EarthquakeContext = {
  sortOption: sortOptions.newest,
  setSortOption: () => {},
  pollTime: 60,
  setPollTime: (time: number) => {},
  nextRefreshTime: 0
};

export const GlobalEarthquakeContext = React.createContext<EarthquakeContext>(defaultCtx);
