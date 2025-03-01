import * as express from 'express'
import expData from '../exp.json' with { type: "json" };

const expenseRouter = express.Router()

expenseRouter.get('/', (req, res) => {
    res.status(200).send(expData)
})

expenseRouter.get('/:id', (req, res) => {
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

expenseRouter.post('/', (req, res) => {
    const newData = req.body
    if (!newData.amount || !newData.category) {
        res.status(400).send({ error: "Amount or category missing from request" })
    }
    newData.id = arr[arr.length - 1].id + 1;
    arr.push(newData)

    fs.writeFile('exp.json', JSON.stringify(arr), (err) => {
        if (err) {
            res.status(500).send({ error: "Error with server: cannot write to database" })
        }
    })
    res.status(201).send(arr)
})

expenseRouter.put('/', (req, res) => {
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
        }
    })

    res.status(200).send(newData)
})

expenseRouter.delete('/', (req, res) => {
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
        }
    })
    res.status(200).send(expData)
})

export { expenseRouter }