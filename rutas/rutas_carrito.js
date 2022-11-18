import { Router } from "express";
import cartController from "../controlador/cart.controller.js.js";
import {isLogged} from '../services.js'
const router = Router()

router
  .route("/")
  .get(isLogged, cartController.getCart)



router
  .route('/:id')
  .post(isLogged, cartController.addCart)

router
  .route('/:cartId/:prodId')
  .post(cartController.deleteProduct)
  

  export default router