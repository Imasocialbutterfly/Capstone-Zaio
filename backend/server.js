import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';
import listingRoutes from './routes/listings.js';

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
app.use(express.json({ limit: '10mb'}));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// routes
app.use('/api/users', userRoutes)
app.use('/api/listings', listingRoutes)
app.get('/', (req, res) => {
    res.json({ msg: "welcome to the app!!!" })
})

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

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