import express from 'express'
import path from 'path'
import statesData from './states.json' with { type: "json" };
import expData from './exp.json' with { type: "json" };
import cataData from './cata.json' with { type: "json" };
import fs from 'fs'
import { expenseRouter } from './routes/expenseRouter.js'
import { statesRouter } from './routes/statesRouter.js'

const __dirname = path.resolve();
const app = express();
const port = 8080;

let arr = expData;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/api/categories', (req, res) => {
    res.status(200).send(newData)
})

app.use('/api/states', statesRouter)

app.use('/api/expenses', expenseRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})