import React from 'react';
import { EarthquakeData, Earthquakes } from '../types';

interface Props {
  earthquakes: Earthquakes
}

const ListColumn = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ flex: 1, marginBottom: '1em', alignSelf: 'center' }} className='list-column'>{children}</div>
}

const HeaderListColumn = ({ children }: { children: React.ReactNode }) => {
  return <ListColumn><h4>{children}</h4></ListColumn>
}

const ListItem = ({ earthquake }: { earthquake: EarthquakeData }) => {
  const { depth, humanReadableLocation, latitude, longitude, quality, size } = earthquake;
  return <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '4em' }} key={earthquake.timestamp}
    className='list-item'>
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