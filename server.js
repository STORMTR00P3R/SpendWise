const express = require('express');
const app = express();
const port = 8080;
const path = require('path')
const statesData = require('./states.json')
const expData = require('./exp.json')
const cataData = require('./cata.json')
const fs = require('fs');
let arr = expData;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/api/states', (req, res) => {
    res.send(statesData)
})

app.get('/api/categories', (req, res) => {
    res.send(cataData)
})

app.get('/api/expenses', (req, res) => {
    res.send(arr)
})

app.post('/api/expense', (req, res) => {
    arr.push(req.body)
    const newData = JSON.stringify(arr)
    fs.writeFile('exp.json', newData, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("Successfully wrote to data.json");
        }
    })
    res.send(arr);
})

app.delete('/api/expense', (req, res) => {
    let newArr = arr.filter((expense) => {
        if (req.body.id != expense.id) {
            return true;
        }
    });
    res.send(newArr);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})