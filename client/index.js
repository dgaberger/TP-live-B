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

function addName (attName, attSelect){ 	//create option els
	const opElement = document.createElement('option')
	opElement.text = attName
	document.getElementById(attSelect).append(opElement) // Child????
}

const locations = {}

fetch('./api')
.then(result => result.json())		// parse errthang
.then(function(data){
	for (let key in data){
		// console.log('keys: ', key)
		for(let i in data[key]){
			const name = data[key][i].name
			const coord = data[key][i].place.location
			addName(name, key + '-choices')
			locations[name] = coord
		}
	}
})
.catch()


// on click (+)
function getCoords(value){
	return locations[value]
}

// const attractions = ['hotels', 'restaurants', 'activities']

// for (att in attractions){
// 	document.getElementById(attractions[att] + '-add').addEventListener('click', function(){
// 		const child = document.createElement('li')
// 		const selected = document.getElementById(attractions[att] + '-choices').value
// 		child.innerHTML = selected
// 		document.getElementById(attractions[att] + '-list').append(child)
// 		buildMarker(attractions[att], getCoords(selected)).addTo(map)
// 	})
// }



document.getElementById('hotels-add').addEventListener('click', function(){
	const child = document.createElement('li')
	const selected = document.getElementById('hotels-choices').value
	child.innerHTML = selected
	document.getElementById('hotels-list').append(child)
	buildMarker('hotels', getCoords(selected)).addTo(map)
})

// document.getElementById('hotels-add').addEventListener('click', function(){
// 	const child = document.createElement('li')
// 	const selected = document.getElementById('hotels-choices').value
// 	child.innerHTML = selected
// 	document.getElementById('hotels-list').append(child)
// 	buildMarker('hotels', getCoords(selected)).addTo(map)
// })


