import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';

dotenv.config()

const app = express();

// middleware
app.use(express.json()); 
app.use(cors({ origin: 'http://localhost:3000' }));

// routes
app.use('/api/users', userRoutes)
app.get('/', (req, res) => {
    res.json({ msg: "welcome to the app!!!" })
})

mongoose.connect(process.env.MONGODB_URI)
.then(() => app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
}))
.catch((err) => console.log(err))