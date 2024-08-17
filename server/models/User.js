// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
