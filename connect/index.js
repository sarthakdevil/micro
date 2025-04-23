import express from 'express';
import {config} from 'dotenv';
import proxy from 'express-http-proxy';
config();
const app = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/products', proxy('http://localhost:3000'));
app.use('/customer', proxy('http://localhost:3001'));

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});