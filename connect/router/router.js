const { getSecureProducts } = require('../controller/connect');

import { Router } from 'express';
const router = new Router();
router.get("/getproducts",getSecureProducts)