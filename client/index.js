const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker");

/*
  * Instantiate the Map
  */

mapboxgl.accessToken = "pk.eyJ1IjoiZGdhYmVyZ2VyIiwiYSI6ImNqNjg0NGFwNzBjMnczNHIwZzN2eGNzZnAifQ.Qlq7Y-6Zw2SjluyJGVxSTA";
const map = new mapboxgl.Map({
  container: "map-canvas",
  center: [-74.0, 40.731],
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: "mapbox://styles/mapbox/streets-v10"
});

/// Initial fetch

function addNameToSelect (attName, attSelect){ 	//create option els
	const opElement = document.createElement('option')
	opElement.text = attName
	document.getElementById(attSelect).append(opElement) // Child????
}

const locations = {}	//store location data

fetch('./api')
.then(result => result.json())		// jsonify
.then(function(data){				// parse errthang
	for (let key in data){
		for(let i in data[key]){
			const name = data[key][i].name 	// name of each activity
			addNameToSelect(name, key + '-choices')
			const coord = data[key][i].place.location // location of each
			locations[name] = coord
		}
	}
})
.catch()

// on click (+)
function getCoords(value){
	return locations[value]
}

document.getElementById('hotels-add').addEventListener('click', function(){
	const child = document.createElement('li')
	const selected = document.getElementById('hotels-choices').value
	child.innerHTML = selected
	document.getElementById('hotels-list').append(child)
	buildMarker('hotels', locations[selected]).addTo(map)
})

document.getElementById('restaurants-add').addEventListener('click', function(){
	const child = document.createElement('li')
	const selected = document.getElementById('restaurants-choices').value
	child.innerHTML = selected
	document.getElementById('restaurants-list').append(child)
	buildMarker('restaurants', locations[selected]).addTo(map)
})

document.getElementById('activities-add').addEventListener('click', function(){
	const child = document.createElement('li')
	const selected = document.getElementById('activities-choices').value
	child.innerHTML = selected
	document.getElementById('activities-list').append(child)
	buildMarker('activities', locations[selected]).addTo(map)
})


