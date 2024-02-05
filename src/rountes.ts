import express from 'express'
import {
  getItemSet,
  getRolMarket,
  updateItemSet
} from './services/rol/controllers/market'

export const routes = express.Router()

routes.post('/get/market', getRolMarket)
routes.post('/get/item/set/price', getItemSet)
routes.post('/update/item/set/price', updateItemSet)
