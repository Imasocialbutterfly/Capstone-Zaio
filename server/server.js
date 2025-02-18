require('dotenv').config();
import express, { json } from 'express';
import { connect } from 'mongoose';
import { sign } from 'jsonwebtoken';
import cors from 'cors';
import { findOne } from './models/User';

const app = express()

app.use(cors())
app.use(json())

connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findOne({ email })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const token = sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.json({ token, username: user.username })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))