import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SortOption, sortOptions } from '../sortUtils';
import { GlobalEarthquakeContext } from '../earthquakeContext';
import { log, setStateAndRef } from '../utility';
import '../styles/global.css'


const SortOptions = () => {
  const { setSortOption } = useContext(GlobalEarthquakeContext);
  return <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    <div className="toolbar-label">Sort by</div>
    <select onChange={event => setSortOption(sortOptions[event.currentTarget.value])}>
      {Object.values(sortOptions).map((option: SortOption) => {
        return <option value={option.id} key={option.id}>{option.name}</option>
      })}
    </select>
  </div>
}

const PollOptions = () => {
  const { pollTime, setPollTime } = useContext(GlobalEarthquakeContext);

  return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <div className='toolbar-label'>Refresh time</div>
    <input type={'number'} value={pollTime} onChange={(e) => {
      setPollTime(parseFloat(e.currentTarget.value))
    }} style={{width: '5em', height: '2.1em', textAlign: 'center', color: '#888', fontSize: '1em'}}/>
    <div className="toolbar-label">seconds</div>
  </div>
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
    <span>Refreshing in <b>{secondsLeft >= 0 ? secondsLeft : 0}</b> seconds</span>
  </div>
}

const Toolbar = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className='toolbar'>
      <PollOptions/>
      <NextFetchTimer/>
      <SortOptions/>
    </div>
  );
};

export default Toolbar;