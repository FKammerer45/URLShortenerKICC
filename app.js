const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Add your routes here

app.listen(3000, () => {
    console.log('URL shortener listening on port 3000');
});
// URL shortening logic goes here
const shortenUrl = (longUrl) => {
    const shortUrlPath = generateShortUrlPath();
    saveUrlMapping(shortUrlPath, longUrl);
    return 'https://urlshortenerkicc.azurewebsites.net/' + shortUrlPath;
};

// Homepage route
app.get('/', (req, res) => {
    res.render('index', { shortUrl: null });
});


// Add a route for handling the shortened URLs
app.get('/:shortUrlPath', (req, res) => {
    const shortUrlPath = req.params.shortUrlPath;

    // Look up the shortUrlPath in the in-memory storage to find the associated long URL
    const longUrl = findLongUrlByShortUrlPath(shortUrlPath);

    if (longUrl) {
        // If the long URL is found, redirect the user to the original URL
        res.redirect(longUrl);
    } else {
        // If the long URL is not found, return a 404 error or a custom error page
        res.status(404).send('Short URL not found');
    }
});

// Shorten URL route
app.post('/shorten', (req, res) => {
    const longUrl = req.body.url;

    // Validate and shorten the URL
    if (longUrl) {
        const shortUrl = shortenUrl(longUrl);
        res.render('index', { shortUrl });
    } else {
        res.render('index', { shortUrl: null });
    }
});
// In-memory storage object for URL mappings
const urlMappings = {};

// Function to generate a unique short URL path
const generateShortUrlPath = () => {
    return Math.random().toString(36).substring(7);
};

// Function to save the URL mapping in the in-memory storage
const saveUrlMapping = (shortUrlPath, longUrl) => {
    urlMappings[shortUrlPath] = longUrl;
};

// Function to find the long URL associated with a short URL path
const findLongUrlByShortUrlPath = (shortUrlPath) => {
    return urlMappings[shortUrlPath];
};

