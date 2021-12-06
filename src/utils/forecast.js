const request = require('request');

const forecast = (lat, long, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=59aea8743e3f1b066527bd97a8ebec6e&query=' +
    lat +
    ',' +
    long +
    '&units=f';

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      // console.log(body);
      const actualTemp = body.current.temperature;
      const feelsLikeTemp = body.current.feelslike;
      const humidity = body.current.humidity;

      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. Its currently ' +
          actualTemp +
          ' Fah out there. But it feels like ' +
          feelsLikeTemp +
          ' and the humidity of ' +
          humidity +
          '%.'
      );
    }
  });
};

module.exports = forecast;
