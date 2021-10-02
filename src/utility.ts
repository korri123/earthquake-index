import { MutableRefObject } from 'react';

// utility function for setting both state and ref for use in useEffect
export const setStateAndRef = <T>(setState: (t: T) => void, ref: MutableRefObject<T|undefined>, value: T) => {
  setState(value);
  ref.current = value;
}

export const log = (...data: any[]) => {
  if (process.env.NODE_ENV !== 'production')
    console.log(`DEBUG: ${data}`);
}