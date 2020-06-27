const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//define paths for express config
publicDirPath = path.join(__dirname, '../public');
viewPath = path.join(__dirname, '../templates/views');
partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'anynomous'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        name: 'anynomous'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name: 'anynomous',
        msg: 'this is a help page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            err: 'Please provide an address'
        })
    }

    geocode(req.query.address, (err, {longitude, latitude, location} = {}) => {
        if(err) {
           return res.send({
                err,
            })
        }

        forecast(longitude, latitude, (err, data2) => {
            if(err) {
               return res.send({
                    err,
                })
            }

            res.send({
                forecast: data2,
                location,
                address: req.query.address
            });

        })
    })

    
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '404',
        name: 'anynomous',
        errMsg:'help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'anynomous',
        errMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up and running in port 3000');
})