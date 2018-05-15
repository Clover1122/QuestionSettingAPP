//the following data is adapted from Practical-Leaflet & Javascript Part1.pdf-Step1
//load the basic map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

//load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
maxZoom: 18,
attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>', id: 'mapbox.streets'
}).addTo(mymap);

// create a geoJSON feature - 
var geojsonFeature = { 
	"type": "Feature", 
	"properties": { 
	"name": "London", 
	"popupContent": "This is where UCL is based" 
	}, 
	"geometry": { 
	"type": "Point", 
	"coordinates": [-0.134040, 51.524559] 
	} 
	}; 

// create the custom Maker icon 
var testMarkerPink = L.AwesomeMarkers.icon({ 
	icon: 'play', 
	markerColor: 'pink' 
	}); 
	
// and add it to the map 
L.geoJSON(geojsonFeature, { 
	  pointToLayer: function (feature, latlng) { 
	  return L.marker(latlng, {icon:testMarkerPink}); 
	  } 
	}).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+""+geojsonFeature.properties.popupContent+"<b>"); 
	
//show where the user clicks
//create a custom popup
var popup = L.popup();
//then create an event detector to wait the user to click and show where he/she is through the popup
//note that don't need to do anycomplicated maths to convert screen coordinates to real world coordiantes
function onMapClick(e) {
	popup.setLatLng(e.lating).setContent("Where you click is " + e.latlng.toString()).openOn(mymap);
}
//then add the click event detector to the map
mymap.on('click', onMapClick);

//use AJAX to change the content of a DIV dynamically without reloading the entire page
//the following data is adapted from Practical-Servers & AJAX.pdf/Testing with AJAX
var xhr; // define the global variable to process the AJAX request

function callDivChange() {
	xhr = new XMLHttpRequest();
	var filename = document.getElementById("filename").value;
	xhr.open("GET", filename, true);
	xhr.onreadystatechange = processDivChange;
	try {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	xhr.send();
}

function processDivChange() {
	if (xhr.readyState < 4) // while waiting response from server
	        document.getElementById('div1').innerHTML = "Loading...";
		else if (xhr.readyState === 4) { // 4 = Response from server has been completely loaded.
		     if (xhr.status == 200 && xhr.status < 300)
				 // http status between 200 to 299 are all successful
			     document.getElementById('div1').innerHTML = xhr.responseText;
			}
	}

