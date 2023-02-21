import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer';
import fs from 'fs'
import checkAuth from './utils/checkAuth.js';
import * as ProductsController from './controllers/ProductsController.js';
import * as UsersController from './controllers/UsersController.js';
import * as CategoriesController from './controllers/CategoriesController.js';
import * as OrdersController from './controllers/OrdersController.js';
import { log } from 'console';

dotenv.config();
const app = express();
const DB = 'mongodb+srv://rostiko_455:qwerty12345@cluster0.dtlw0a8.mongodb.net/?retryWrites=true&w=majority'

const storage = multer.diskStorage({
    destination: (_,__,cd) => {
        if(!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cd(null,'uploads')
    },
    filename: (_,file,cd) => {
        cd(null, file.originalname)
    },
})

const upload = multer({storage})

mongoose
.connect(DB)
.then(() => {
    console.log('DB Strat')
})
app.use(cors());
app.use(express.json())

app.use('/uploads',express.static('uploads'))

app.post('/upload', upload.single('image'), (req,res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/',(req,res) => {
    res.send('Hello start page')
})

app.post('/products',ProductsController.create)

app.patch('/products/:id',ProductsController.update)

app.delete('/products/:id', ProductsController.remove)

app.get('/products/:id', ProductsController.getOne)

app.post('/registration',UsersController.register)

app.post('/login',UsersController.login)

app.get('/get-me',checkAuth,UsersController.getMe)

app.get('/get-all-user',UsersController.getAll)

app.patch('/update-user/:id', UsersController.update)

app.post('/create-order',OrdersController.create)

app.get('/get-all-orders',OrdersController.getAll)

app.patch('/admin-orders/:id', OrdersController.update)

app.get('/admin-orders/:id',OrdersController.getOne)

app.delete('/admin-orders/:id', OrdersController.remove)

app.post('/createcategories', CategoriesController.create)

app.get('/get-all-categories', CategoriesController.getAll)

app.delete('/remove-categories/:id', CategoriesController.remove)

app.patch('/update-categories/:id', CategoriesController.update)

app.get('/get-one-category/:id', CategoriesController.getOne)

app.get('/get-all-products', ProductsController.getAll)

app.listen(process.env.PORT || 4444,() => {
    console.log('server start',process.env.PORT)
})