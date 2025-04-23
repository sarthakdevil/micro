import {Router} from 'express';
import { getproducts } from '../controller/products';
import { getProductById } from '../services/products.services';
const router = new Router;

router.get("/products",getproducts)
router.get("/products/:id",getProductById)