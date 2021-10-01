import { SortOption, sortOptions } from './sortFunctions';
import React from 'react';

export interface EarthquakeContext {
  sortOption: SortOption,
  setSortOption: (sortOption: SortOption) => void
}

export const defaultCtx: EarthquakeContext = {
  sortOption: sortOptions.newest,
  setSortOption: () => {}
};

export const GlobalEarthquakeContext = React.createContext<EarthquakeContext>(defaultCtx);
