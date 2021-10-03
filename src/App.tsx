import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { GlobalEarthquakeContext } from './earthquakeContext';
import { Earthquakes } from './types';
import EarthquakeList from './components/EarthquakeList';
import { requestEarthquakeData } from './service';
import Toolbar from './components/Toolbar';
import { SortOption, sortOptions } from './sortUtils';
import { log, setStateAndRef } from './utility';
import Insights from './components/Insights';

const calculateInsights = (earthquakes: Earthquakes) => {
  const data = earthquakes.results;
  if (!data.length)
    return {averageSize: 0, biggest: 0, latestDate: new Date()};
  const averageSize = data.map(e => e.size).reduce((a, b) => a + b) / data.length;
  const biggest = Math.max(...data.map(e => e.size));
  const latestDate: Date = data.map(e => e.getTime()).reduce((a, b) => a.getTime() > b.getTime() ? a : b);
  return {averageSize, biggest, latestDate};
}

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
    log('sorting list')
  }, [sortOption, earthquakes.results]);

  const { averageSize, biggest, latestDate } = calculateInsights(earthquakes);
  return (
    <GlobalEarthquakeContext.Provider value={{ sortOption, setSortOption, pollTime, setPollTime, nextRefreshTime }}>
      <div className="App">
        <header>
          <h1>&#x1f30e; Earthquake Index</h1>
        </header>
        <main style={{ width: '70%', margin: '0 auto' }}>
          <Toolbar/>
          <Insights averageSize={averageSize} biggest={biggest} latestDate={latestDate}/>
          <EarthquakeList earthquakes={earthquakes}/>
        </main>
      </div>
    </GlobalEarthquakeContext.Provider>
  );
}

export default App;
