const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' });
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    preferences: {
        type: [String], 
        default: [],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model('User', userSchema);
module.exports = User;