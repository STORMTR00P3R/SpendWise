const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const statesData = require('./states.json')
const expData = require('./exp.json')
const cataData = require('./cata.json')
let arr = expData;

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/states', (req, res) => {
    res.send(statesData)
})

app.get('/api/categories', (req, res) => {
    res.send(cataData)
})

app.get('/api/expenses', (req, res) => {
    res.send(arr)
})

app.post('/api/expenses', (req, res) => {
    res.send(arr)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})