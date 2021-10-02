import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { GlobalEarthquakeContext } from './earthquakeContext';
import { Earthquakes } from './types';
import EarthquakeList from './components/EarthquakeList';
import { requestEarthquakeData } from './service';
import Toolbar from './components/Toolbar';
import { SortOption, sortOptions } from './sortUtils';
import { log, setStateAndRef } from './utility';

const App = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquakes>(new Earthquakes());
  const [sortOption, setSortOption] = useState<SortOption>(sortOptions.newest)
  const [pollTime, setPollTime] = useState<number>(60)
  const [pollTimer, setPollTimer] = useState<NodeJS.Timeout>();
  const pollTimerRef = useRef(pollTimer);
  const getNextRefreshTime = useCallback(() => new Date().getTime() + pollTime * 1000, [pollTime]);
  const [nextRefreshTime, setNextRefreshTime] = useState<number>(getNextRefreshTime())

  const updateEarthquakeData = async () => {
    log('fetching new data from server...')
    setEarthquakes(await requestEarthquakeData())
  };

  // set initial earthquake data
  useEffect(() => {
    (async () => {
      await updateEarthquakeData();
    })();
  }, []);

  // initialize poller / refresher
  useEffect(() => {
    const clearTimeoutCallback = () => pollTimerRef.current && clearTimeout(pollTimerRef.current);
    const resetTimeout = () => {
      clearTimeoutCallback();
      setNextRefreshTime(getNextRefreshTime());
      setStateAndRef(setPollTimer, pollTimerRef, setTimeout(pollItems, pollTime * 1000));
    }
    const pollItems = () => {
      (async () => {
        await updateEarthquakeData();
        resetTimeout();
      })();
    }
    resetTimeout();
    log('reinitializing timer...')
    return () => {
      clearTimeoutCallback();
    }
  }, [getNextRefreshTime, pollTime]);

  useEffect(() => {
    const sortedEarthquakes = new Earthquakes()
    sortedEarthquakes.results = [...earthquakes.results].sort(sortOption.sortFunction);
    if (sortedEarthquakes.results.length !== earthquakes.results.length ||
      sortedEarthquakes.results.some((value, index) => value !== earthquakes.results[index])) {
      // check if arrays are not equal to prevent useEffect loop
      setEarthquakes(sortedEarthquakes);
    }
    log('resorting list')
  }, [sortOption, earthquakes.results]);

  return (
    <GlobalEarthquakeContext.Provider value={{ sortOption, setSortOption, pollTime, setPollTime, nextRefreshTime }}>
      <div className="App">
        <header>
          <h1>&#x1f30e; Earthquake Index</h1>
        </header>
        <main style={{ width: '70%', margin: '0 auto' }}>
          <Toolbar/>
          <EarthquakeList earthquakes={earthquakes}/>
        </main>
      </div>
    </GlobalEarthquakeContext.Provider>
  );
}

export default App;
