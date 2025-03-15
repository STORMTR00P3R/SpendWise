import * as express from 'express'
import cataData from '../cata.json' with { type: "json" };

const catagoryRouter = express.Router()

catagoryRouter.get('/', (req, res) => {
    res.status(200).send(cataData)
})

export { catagoryRouter }