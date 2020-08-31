const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight
};



function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
        res.render('flights/show', {flight, tickets, title: 'Details', destDate: getDefaultDate()})
        })
    })
}

function create(req, res) {
    let flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) {
            return res.render('flights/new', { title: 'New Flight', destDate: getDefaultDate() });
        } 
        res.redirect('/flights');
    })
}

function getDefaultDate() {
    let testFlight = new Flight();
    let dt = testFlight.departs
    let destDate = dt.toISOString().slice(0, 16);
    return destDate;
}

function newFlight(req, res) {
    res.render('flights/new', {title: 'New Flight', destDate: getDefaultDate()})
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
            res.render('flights/index', { flights, title: 'Flights' });
    });
};


function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, function(err) {
        res.redirect('/flights');
    });
}

// flight.create({airline: 'Delta', airport: 'DEN', flightNo: '12'}, function(err, flightDoc) {
//     console.log(flightDoc);
// })