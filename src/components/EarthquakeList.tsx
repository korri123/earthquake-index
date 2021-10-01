import React, { useContext, useEffect } from 'react';
import { EarthquakeData, Earthquakes } from '../types';
import { EarthquakeContext, GlobalEarthquakeContext } from '../earthquakeContext';

interface Props {
  earthquakes: Earthquakes
}

const ListColumn = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ flex: 1, marginBottom: '0.2em' }}>{children}</div>
}

const HeaderListColumn = ({ children }: { children: React.ReactNode }) => {
  return <ListColumn><h4>{children}</h4></ListColumn>
}

const ListItem = ({ earthquake }: { earthquake: EarthquakeData }) => {
  const { depth, humanReadableLocation, latitude, longitude, quality, size } = earthquake;
  return <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
    <ListColumn>{humanReadableLocation}</ListColumn>
    <ListColumn>{latitude}</ListColumn>
    <ListColumn>{longitude}</ListColumn>
    <ListColumn>{quality}</ListColumn>
    <ListColumn>{earthquake.getTime().toDateString()}</ListColumn>
    <ListColumn>{size}</ListColumn>
    <ListColumn>{depth}</ListColumn>
  </div>
}

const EarthquakeList = ({ earthquakes }: Props) => {
  const { sortOption } = useContext<EarthquakeContext>(GlobalEarthquakeContext);
  useEffect(() => {
    earthquakes.sort(sortOption.sortFunction)
  }, [sortOption, earthquakes]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <HeaderListColumn>Location</HeaderListColumn>
        <HeaderListColumn>Latitude</HeaderListColumn>
        <HeaderListColumn>Longitude</HeaderListColumn>
        <HeaderListColumn>Quality</HeaderListColumn>
        <HeaderListColumn>Time</HeaderListColumn>
        <HeaderListColumn>Size</HeaderListColumn>
        <HeaderListColumn>Depth</HeaderListColumn>
      </div>
      {earthquakes.results.map(earthquake => <ListItem earthquake={earthquake}/>)}
    </div>
  );
};

export default EarthquakeList;