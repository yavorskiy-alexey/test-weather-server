import RSSParser from 'rss-parser';
import cors from 'cors';
import express from 'express';

let app = express();
app.use(cors());

const parser = new RSSParser();

app.get('/weather', (req, res) => {
    const country = req.query.country;

    const feedURL = `https://rss.accuweather.com/rss/liveweather_rss.asp?locCode=${country}`;

    let weatherItems = [];
    const parse = async url => {
        const feed = await parser.parseURL(url);

        weatherItems = feed.items;
        res.send(weatherItems);
    };

    parse(feedURL);

});

const server = app.listen('4000', () => {
    console.log('App is listening at http://localhost:4000');
});

export default server;