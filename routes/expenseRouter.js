import Expense from "../models/expenseSchema.js"
import * as express from 'express'

const expenseRouter = express.Router()

expenseRouter.get('/', async (req, res) => {
    const result = await Expense.find()
    res.status(200).send(result)
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

expenseRouter.put('/', async (req, res) => {
    let updatedItem = req.body
    if (!updatedItem.amount || !updatedItem.category || !updatedItem._id) {
        res.status(400).send({ error: "Amount or category or id missing from request" })
    }

    let result = await Expense.findByIdAndUpdate(updatedItem._id, updatedItem, {new: true})

    res.status(200).send(result)
})

expenseRouter.delete('/', async (req, res) => {
    if (!req.body._id) {
        res.status(400).send({ error: "ID missing from request" })
    }

    try {
        let result = await Expense.findByIdAndDelete(req.body._id)
        res.status(200).send(result)
    } catch(err) {
        res.status(500).send({message: "ID not found"})
    }
})

export { expenseRouter }