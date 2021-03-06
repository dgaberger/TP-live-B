const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker');

/*
  * Instantiate the Map
  */

mapboxgl.accessToken = 'pk.eyJ1IjoiZGdhYmVyZ2VyIiwiYSI6ImNqNjg0NGFwNzBjMnczNHIwZzN2eGNzZnAifQ.Qlq7Y-6Zw2SjluyJGVxSTA';
const map = new mapboxgl.Map({
  container: 'map-canvas',
  center: [-74.0, 40.731],
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: 'mapbox://styles/mapbox/streets-v10'
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
	for (let key in data) {
		for (let i in data[key]) {
			const name = data[key][i].name 	// name of each activity
			addNameToSelect(name, key + '-choices')
			const coord = data[key][i].place.location // location of each
			locations[name] = coord
		}
	}
})
.catch()

// on click (+)

const state = {
	hotels: [],
	restaurants: [],
	activities: []
  };

function addByClick (attType) {
	document.getElementById(attType + '-add').addEventListener('click', function(){

		//create list item
		const child = document.createElement('li')
		child.className = 'itinerary-item'
		const selected = document.getElementById(attType + '-choices').value
		let isNew = true;
		for (let i = 0; i < state[attType].length; i++) {
			if (state[attType][i][0] === selected){
				isNew = false;
				break;
			}
		}
		if (isNew){
			document.getElementById(attType + '-list').append(child);
			state[attType].push([selected, locations[selected]]);
			buildMarker(attType, locations[selected]).addTo(map);
			map.flyTo({
				center: locations[selected],
				zoom: 16
			})
			console.log('after adding', state)

			//create button
			const button = document.createElement('button');
			button.className = 'btn btn-xs btn-danger remove btn-circle';
			button.append('x');
			button.addEventListener('click', function(){
				console.log(selected);
				child.remove();
				document.getElementById(locations[selected].toString()).remove();
				let removeIndex = state[attType].findIndex((elem) => {
					return elem[0] === selected;
				});
				state[attType].splice(removeIndex, 1);
				console.log('after remove', state)
			})
			child.append(selected, button);
		}
	})
}

['hotels', 'restaurants', 'activities'].forEach(addByClick)

