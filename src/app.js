const geocode = require('../src/geocode');
const forecast = require('../src/weather-request');
const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express(3000);
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
  res.render('index', {
    title: 'Webpage',
    name: 'Sashi',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Sashi',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'What do you need help with?',
    title: 'Help page',
    name: 'Sashi',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide address',
    });
  }
  geocode(req.query.address, (error, { lat, long } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render(`404`, {
    errorMsg: `Couldn't find the help page you are loo  ing for`,
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMsg: '404 Page not found',
  });
});

app.listen(3000);
