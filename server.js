const express = require('express');
const app = express();
const port = 8080;
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
})

app.get('/compound', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/comp.html'))
})

app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/re.html'))
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})