import React, { useContext } from 'react';
import Select from 'react-select';
import { SortOption, sortOptions } from '../sortUtils';
import { GlobalEarthquakeContext } from '../earthquakeContext';


const SortOptions = () => {
  const {setSortOption, sortOption} = useContext(GlobalEarthquakeContext);
  return <div style={{width: '50%', maxWidth: '20rem', margin: '0.5rem'}}>
    <Select options={Object.values(sortOptions).map(option => {
      return { label: option.name, value: option.id };
    })} placeholder='Sort by' onChange={(val) => {
      if (val) {
        setSortOption(sortOptions[val.value]);
      }
    }}
    />
  </div>
}

const EarthquakeListConfiguration = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <SortOptions/>
    </div>
  );
};

export default EarthquakeListConfiguration;