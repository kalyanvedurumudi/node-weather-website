const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for express config
const publicFol = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicFol));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        content: 'Some sample content',
        name: 'Kalyan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        content: 'I love to travel',
        name: 'Kalyan'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: 'Call me on my number for help',
        name: 'Kalyan'
    });
});

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404',
        content: 'Help article not found',
        name: 'Kalyan'
    });
    // res.send('Help article not found')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        });
    } 
    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(lat, lon, (err, foreCastData) => {
            if (err) {
                return res.send({
                    error: err
                });
            }
            res.send({
                foreCastData: foreCastData,
                location,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        res.send({
            products: []
        });
    }
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        content: '404 - Page not found',
        name: 'Kalyan'
    });
    // res.send('404 - Page not found')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})
