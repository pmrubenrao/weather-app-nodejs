const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoicnViZW4xMDEwIiwiYSI6ImNrdnF1aHozYjBsMHczMXFwY2FoYzF4azAifQ.Ymv4c1GimbQTP1fxaNb8MQ';
  // console.log(URL);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to location services', undefined);
    } else if (body.features.length == 0) {
      callback('Unable to find location. Try another location', undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        place_name: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
