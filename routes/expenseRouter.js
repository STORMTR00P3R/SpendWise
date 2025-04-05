import Expense from "../models/expenseSchema.js"
import * as express from 'express'
import expData from '../exp.json' with { type: "json" };
import fs from 'fs'

const expenseRouter = express.Router()

expenseRouter.get('/', async (req, res) => {
    const result = await Expense.find()
    res.status(200).send(result)
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

expenseRouter.post('/', async (req, res) => {
    const newData = req.body
    
    console.log(newData)
    if (!newData.amount || !newData.category) {
        res.status(400).send({ error: "Amount or category missing from request" })
    } 

    const newExpense = await Expense.create(req.body) 

    res.status(201).send(newExpense)
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

    let newArr = expData.filter((expense) => {
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