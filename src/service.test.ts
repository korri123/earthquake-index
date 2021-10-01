import { requestEarthquakeData } from './service';

describe('Earthquake fetch API test', () => {
  it('Test if earthquake API returns data corresponding to our structures', (done) => {
    (async () => {
      const earthquakeResponse = await requestEarthquakeData();
      earthquakeResponse.results.forEach((earthquake) => {
        expect(typeof earthquake.depth).toEqual('number');
        expect(typeof earthquake.latitude).toEqual('number');
        expect(typeof earthquake.longitude).toEqual('number');
        expect(typeof earthquake.quality).toEqual('number');
        expect(typeof earthquake.timestamp).toEqual('string');
        expect(typeof earthquake.humanReadableLocation).toEqual('string');
      })
      done();
    })();
  });
});
