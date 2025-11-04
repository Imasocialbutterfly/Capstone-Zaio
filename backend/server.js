import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';

dotenv.config()

const requiredEnvVars = ['MONGODB_URL', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// routes
app.use('/api/users', userRoutes)
app.get('/', (req, res) => {
    res.json({ msg: "welcome to the app!!!" })
})

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log('Server listening on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });