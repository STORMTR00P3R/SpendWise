import express from 'express'
import path from 'path'
import { expenseRouter } from './routes/expenseRouter.js'
import { statesRouter } from './routes/statesRouter.js'
import { catagoryRouter } from './routes/catagoryRouter.js';

const __dirname = path.resolve();
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use('/api/catagories', catagoryRouter)

app.use('/api/states', statesRouter)

app.use('/api/expenses', expenseRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})