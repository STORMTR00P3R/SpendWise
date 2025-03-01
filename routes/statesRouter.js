import * as express from 'express'
import statesData from '../states.json' with { type: "json" };

const statesRouter = express.Router()

statesRouter.get('/api/states', (req, res) => {
    res.status(200).send(statesData)
})

export { statesRouter } 