const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const UserModel = mongoose.model('Users',UserSchema);

module.exports = UserModel