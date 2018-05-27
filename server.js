const express = require('express');
const app = express();
const request = require('request-promise');

const API_URL = 'https://codetest.kube.getswift.co/drones';
const getDroneData = () => request(API_URL);

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    getDroneData().then(data => res.json(JSON.parse(data)));
});

app.listen(3001, () => console.log('app listening on port 3001!'));