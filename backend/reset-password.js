import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const resetPasswords = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        const newPassword = 'test123';

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.updateMany(
            { username: { $in: ['freddy', 'butterfly'] } },
            { $set: { password: hashedPassword } }
        );

        console.log(`Passwords reset to "${newPassword}" for users: freddy, butterfly`);
        process.exit(0);
    } catch (error) {
        console.error('Error resetting passwords:', error);
        process.exit(1);
    }
};

resetPasswords();