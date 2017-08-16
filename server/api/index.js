const express = require('express')
const apiRouter = express.Router()

const Hotel = require('../models').Hotel
const Restaurant = require('../models').Restaurant
const Activity = require('../models').Activity

apiRouter.get('/', function(req, res, next){

		var allAttractions = {};
		let hotelProm = Hotel.findAll({include: [{all: true}]})
		let restaurantProm = Restaurant.findAll({include: [{all: true}]})
		let actProm = Activity.findAll({include: [{all: true}]})

		Promise.all([hotelProm, restaurantProm, actProm]).then(function(values){
			allAttractions.hotels = values[0]
			allAttractions.restaurants = values[1]
			allAttractions.activities = values[2]
			res.json(allAttractions);
		})
		.catch()
	})

module.exports = apiRouter
