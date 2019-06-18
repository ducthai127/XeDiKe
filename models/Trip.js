const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
    driverId: {type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    required: true},
    locationFrom: {type: String, required: true},
    locationTo: {type: String, required: true},
    startTime: {type: Date, required: true},
    availabeSeats: {type: Number, required: true},
    passengerIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    fee: {type: Number, required: true},
    isFinished: {type: Boolean, required: false}
})

const Trip = mongoose.model("Trip", TripSchema)

module.exports = {
    Trip, TripSchema
}