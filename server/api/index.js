const express = require('express')
const APIrouter = express.Router()
const db = require('../models').db

const Hotel = require('../models').Hotel
const Restaurant = require('../models').Restaurant
const Activity = require('../models').Activity

APIrouter.get('/', function(req, res, next){

		var allAttractions = {};
		let hotelProm = Hotel.findAll({include:[{all: true}]})
		let restaurantProm = Restaurant.findAll({include:[{all: true}]})
		let actProm = Activity.findAll({include:[{all: true}]})

		Promise.all([hotelProm, restaurantProm, actProm]).then(function(values){
			allAttractions.hotels = values[0]
			allAttractions.restaurants = values[1]
			allAttractions.activities = values[2]
			res.json(allAttractions);
		})
		.catch()
	})

	module.exports = APIrouter