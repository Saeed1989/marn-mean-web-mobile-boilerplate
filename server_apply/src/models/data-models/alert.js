const mongoose = require("mongoose");
const mongo = require("../../mongo");
const connectWithAlertDb = mongo.connectWithAlertDb;

// schema
const alertSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    priority: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true},
    createdAt: { type: String, required: false},
    updatedAt: { type: String, required: false},
});

// reference model
const Alert = connectWithAlertDb().model("Alert", alertSchema);

Alert.createNew = async (alert) => {
    alert._id = new mongoose.Types.ObjectId();
    const model = new Alert(alert);
    return model;
};

module.exports = Alert;