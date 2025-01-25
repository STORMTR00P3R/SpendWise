const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const statesData = require('./states.json')
const expData = require('./exp.json')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/states', (req, res) => {
    res.send(statesData)
})

app.get('/api/exp', (req, res) => {
    res.send(expData)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})