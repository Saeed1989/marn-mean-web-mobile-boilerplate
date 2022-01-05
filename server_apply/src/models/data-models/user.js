const mongoose = require('mongoose');
const mongo = require("../../mongo");
const bcrypt = require('bcrypt');
const connectWithUserDb = mongo.connectWithUserDb;

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    roleName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const User = connectWithUserDb().model("User", userSchema);

async function getPasswordHash(password) {
        return await bcrypt.hash(password, 5);
}


User.createNew = async (user) => {
        user._id = new mongoose.Types.ObjectId();
        const model = new User(user);
        return model;
};

User.getHashedPassword = async (newPassword) => {
        return await getPasswordHash(newPassword);
}

User.setPassword = async (model, newPassword) => {
        model.passwordHash = await getPasswordHash(newPassword);
        return model;
}

module.exports = User;