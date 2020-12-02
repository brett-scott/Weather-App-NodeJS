//  Core Modules
const path = require('path');

//  NPM Modules
const express = require('express');
const hbs = require('hbs');

//  Custom Modules
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

//  Path directories
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//  Using Handlebars for the view engine and view directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//  Setup static directory to serve
app.use(express.static(publicPath))

//  Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brett'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Brett'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
    
        forecast(latitude, longitude, req.query.units, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

//  404 Error Handling (This must stay last)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Brett'
    });
});

//  Server
app.listen(port, () => {
    console.log('Express running on port ' + port)
});