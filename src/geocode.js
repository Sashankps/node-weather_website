const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=pk.eyJ1IjoiaGFsbGxsbCIsImEiOiJjbGoxZ2poYTUwa2djM2xsZDk4Z3N5bHA0In0.6z-HSufliutTkuwmTt6C1w`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find the location, try another search', undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
