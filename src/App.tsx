import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { defaultCtx, EarthquakeContext, GlobalEarthquakeContext } from './earthquakeContext';
import { Earthquakes } from './types';
import EarthquakeList from './components/EarthquakeList';
import { requestEarthquakeData } from './service';
import EarthquakeListConfiguration from './components/EarthquakeListConfiguration';
import { SortOption, sortOptions } from './sortUtils';

const App = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquakes>(new Earthquakes());
  const [sortOption, setSortOption] = useState<SortOption>(sortOptions.newest)

  useEffect(() => {
    (async () => {
      const earthquakes = await requestEarthquakeData();
      setEarthquakes(earthquakes);
    })();
  }, []);

  useEffect(() => {
    const sortedEarthquakes = new Earthquakes()
    sortedEarthquakes.results = [...earthquakes.results].sort(sortOption.sortFunction);
    setEarthquakes(sortedEarthquakes);
  }, [sortOption]);
  return (
    <GlobalEarthquakeContext.Provider value={{sortOption, setSortOption}}>
      <div className="App">
        <header>
          <h1>Earthquake Index</h1>
        </header>
        <main>
          <EarthquakeListConfiguration/>
          <EarthquakeList earthquakes={earthquakes}/>
        </main>
      </div>
    </GlobalEarthquakeContext.Provider>

  );
}

export default App;
