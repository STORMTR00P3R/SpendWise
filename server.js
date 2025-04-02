import express from 'express'
import mongoose from 'mongoose';
import path from 'path'
import { expenseRouter } from './routes/expenseRouter.js'
import { statesRouter } from './routes/statesRouter.js'
import { catagoryRouter } from './routes/catagoryRouter.js';

const __dirname = path.resolve();
const app = express();
const port = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/betwise').then(() => console.log('Connected!'));


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
    
app.use('/api/categories', catagoryRouter)

app.use('/api/states', statesRouter)

app.use('/api/expenses', expenseRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})