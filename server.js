import express from 'express'
import mongoose from 'mongoose';
import path from 'path'
import { expenseRouter } from './routes/expenseRouter.js'
import { statesRouter } from './routes/statesRouter.js'
import { catagoryRouter } from './routes/catagoryRouter.js';
import { userRouter } from './routes/userRouter.js';

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 8080

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected!'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
    
app.use('/api/categories', catagoryRouter)

app.use('/api/states', statesRouter)

app.use('/api/expenses', expenseRouter)

app.use('/api/auth', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})