const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=b0c98a3458a749e488243b213a29ea0d&include=minutely`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Please check in with coordinates', undefined);
    } else if (response.body.error) {
      callback('Unable to find the location', undefined);
    } else {
      callback(
        undefined,
        `It is currently ${response.body.data[0].temp} degrees here; There is ${response.body.data[0].precip}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
