const {User} = require("../../../models/user");
const {Trip} = require("../../../models/Trip");

const createTrip = (req, res, next) => {
    const driverId = req.user.id;
    User.findById(driverId)
    .then(driver => {
        if(!driver) return Promise.reject({errors: "Driver does not exists"})

        const trip = {...req.body, driverId}
        const newTrip = new Trip(trip)
        return newTrip.save()
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(400).json(err));
}

const bookTrip = async (req, res, next) => {
    const {tripId} = req.params;
    const passengerId = req.user.id;
    const passenger = await User.findById(passengerId);
    const trip = await Trip.findById(tripId)

    if(!passenger) return res.status(404).json({errors: "Passenger not found"})
    if(!trip) return res.status(404).json({errors: "Trip not found"})

    trip.passengerIds.push(passengerId);
    const tripFound = await trip.save();
    res.status(200).json(tripFound)
}


module.exports = {createTrip , bookTrip}