import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/ordercontroller.js";
import adminAuth from '../middleware/adminauth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

// User Features
orderRouter.post('/userorders',authUser,userOrders)

// verfiy payment
orderRouter.post('/verfiyStripe',authUser,verifyStripe)

export default orderRouter