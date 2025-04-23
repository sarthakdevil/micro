import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
config();
const app = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get('/', (req, res) => {
    res.send('Products Home Page');
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});