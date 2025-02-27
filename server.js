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
    res.status(200).send(statesData)
})

app.get('/api/categories', (req, res) => {
    res.status(200).send(newData)
})

app.get('/api/expenses', (req, res) => {
    res.status(200).send(expData)
})

app.get('/api/expense/:id', (req, res) => {
    console.log("request.params object: ", req.params)
    const id = Number(req.params.id)
    let foundItem = expData.find(function (expenseData) {
        if (expenseData.id === id) return true
    })

    console.log(foundItem)

    if (!foundItem) {
        res.status(404).send({ error: "Expense data not found" })
    }

    if (foundItem) {
        res.status(200).send(foundItem)
    }
})

app.post('/api/expense', (req, res) => {
    const newData = req.body
    if (!newData.amount || !newData.category) {
        res.status(400).send({ error: "Amount or category missing from request" })
    }
    newData.id = arr[arr.length - 1].id + 1;
    arr.push(newData)

    fs.writeFile('exp.json', JSON.stringify(arr), (err) => {
        if (err) {
            res.status(500).send({ error: "Error with server: cannot write to database" })
        } else {
            console.log("Successfully wrote to data.json")
        }
    })
    res.status(201).send(arr)
})

app.put('/api/expense', (req, res) => {
    let updatedItem = req.body
    if (!updatedItem.amount || !updatedItem.category || !updatedItem.id) {
        res.status(400).send({ error: "Amount or category or id missing from request" })
    }
    let foundItem = expData.find(function (expenseData) {
        if (expenseData.id === req.body.id) return true
    })

    if (!foundItem) {
        res.status(404).send({ error: "Expense data not found" })
    }

    const newData = expData.map((expense, index) => {
        if (expense.id === updatedItem.id) {
            return updatedItem
        } else {
            return expense
        }
    })
    fs.writeFile('exp.json', JSON.stringify(newData), (err) => {
        if (err) {
            res.status(500).send({ error: "Error with server: cannot write to database" })
        } else {
            console.log("Successfully wrote to data.json");
        }
    })

    res.status(200).send(newData)
})

app.delete('/api/expense', (req, res) => {
    if (!req.body.id) {
        res.status(400).send({ error: "ID missing from request" })
    }
    let foundItem = expData.find(function (expenseData) {
        if (expenseData.id === req.body.id) return true
    })

    if (!foundItem) {
        res.status(404).send({ error: "Expense data not found" })
    }

    let newArr = arr.filter((expense) => {
        if (req.body.id != expense.id) {
            return true;
        }
    });
    fs.writeFile('exp.json', JSON.stringify(newArr), (err) => {
        if (err) {
            res.status(500).send({ error: "Error with server: cannot write to database" })
        } else {
            console.log("Successfully wrote to data.json");
        }
    })
    res.status(200).send(expData)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})