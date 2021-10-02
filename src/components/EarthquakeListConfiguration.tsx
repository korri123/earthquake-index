import React, { MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { sortOptions } from '../sortUtils';
import { GlobalEarthquakeContext } from '../earthquakeContext';
import { log, setStateAndRef } from '../utility';


const SortOptions = () => {
  const { setSortOption } = useContext(GlobalEarthquakeContext);
  return <div style={{ width: '50%', maxWidth: '20rem', margin: '0.5rem' }}>
    <Select options={Object.values(sortOptions).map(option => {
      return { label: option.name, value: option.id };
    })} placeholder="Sort by" onChange={(val) => {
      if (val) {
        setSortOption(sortOptions[val.value]);
      }
    }}
    />
  </div>
}

const PollOptions = () => {
  const { pollTime, setPollTime } = useContext(GlobalEarthquakeContext);

  return <div>
    <span>Fetch time</span>
    <input type={'number'} value={pollTime} onChange={(e) => {
      setPollTime(parseFloat(e.currentTarget.value))
    }}/></div>
}

const NextFetchTimer = () => {
  const { nextRefreshTime } = useContext(GlobalEarthquakeContext);
  const getSecondsLeft = useCallback(() => Math.floor((nextRefreshTime - new Date().getTime()) / 1000),
    [nextRefreshTime]);
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft())
  const [intervalCallback, setIntervalCallback] = useState<NodeJS.Timeout>();
  const intervalCallbackRef = useRef(intervalCallback);
  const clearIntervalCallback = () => intervalCallbackRef.current && clearInterval(intervalCallbackRef.current);

  useEffect(() => {
    clearIntervalCallback();
    const interval = setInterval(() => {
      setSecondsLeft(getSecondsLeft())
    }, 1000);
    // setIntervalCallback(interval);
    setStateAndRef(setIntervalCallback, intervalCallbackRef, interval);
    log('reinitializing visual timer')
    return () => {
      clearIntervalCallback();
    }
  }, [getSecondsLeft]);

  return <div>
    <span>Fetching in {secondsLeft >= 0 ? secondsLeft : 0} seconds</span>
  </div>
}

const EarthquakeListConfiguration = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <NextFetchTimer/>
      <PollOptions/>
      <SortOptions/>
    </div>
  );
};

export default EarthquakeListConfiguration;