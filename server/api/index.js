const express = require('express')
const APIrouter = express.Router()
const db = require('../models').db

const Hotel = require('../models').Hotel
const Restaurant = require('../models').Restaurant
const Activity = require('../models').Activity

APIrouter.get('/', function(req, res, next){

	var allAttractions = {};
	Hotel.findAll({include:[{all: true}]})
	.then(function(hotels) {
	  allAttractions.hotels = hotels;
	  return Restaurant.findAll({include:[{all: true}]});
	})
	.then(function(restaurants) {
	  allAttractions.restaurants = restaurants;
	  return Activity.findAll({include:[{all: true}]});
	})
	.then(function(activities) {
	  allAttractions.activities = activities;
	})
	.then(function() {
	  res.json(allAttractions);
	})
	.catch(next);
})

module.exports = APIrouter