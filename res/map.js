var map;
var plantNodes;
var plantTypes;
var plantCategoryIcons = [
	"berry",
];


(function() {

	function HomeControl(controlDiv, map) {

	  google.maps.event.addDomListener(controlUI, 'click', function() {
	    getMyLocation();
	  });

	}

	function initializeMap() {
	
		var nowhere = new google.maps.LatLng(43.65, -79.44);
		map = new google.maps.Map(document.getElementById("googleMap"), {
			center: nowhere,
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: true,
			panControl: false,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_TOP
			}
			
		});
				
		google.maps.event.addListener(map, 'click', function(event) {
			getPlaces(event.latLng, true);
		});
		
		google.maps.event.addListenerOnce(map, 'idle', function(){
			getMyLocation();
		});

	}

	google.maps.event.addDomListener(window, 'load', initializeMap);
		
})();


function nodesCallback(data) {
	plantNodes = data;

	//for (var x = 0, len = plantNodes.length; x < len; x++) {
	plantNodes.forEach(function(x){
		var ll = new google.maps.LatLng(x.lat, x.lng);
		var marker = new google.maps.Marker({
			icon: "img/icons/" + plantCategoryIcons[0] + ".png",
			position: ll,
			map: map
		});

		marker.plantData = plantNodes[x];
		x['marker'] = marker;

		(function(_plantData) {
			google.maps.event.addListener(marker, 'click', function(){
				//displayMarkerData(_plantData);
				toggleDataWindow();
			});
		})(marker.plantData);

		//markersArray.push(marker);
	//}
	});

	//remove loading gif
	$( "#mapWindow .loader" ).animate({
		opacity: 0
		}, 200, function() {
			$( "#mapWindow .loader" ).css('display','none');
		});
	
	displayNearestPlants();
}


function getPlaces(location, loadGif) {

	for (var x in plantNodes) {
		plantNodes[x].marker.setMap(null);
	}
	plantNodes = [];

	var radius = 100; //parseInt($("#radiusSelect").val());

	// loading gif
	if ( loadGif && loadGif == true ) {
		$( "#mapWindow .loader" ).css('display','block').animate({
    		opacity: 1
  		}, 200);
	}
	
	poller.fetchNodes(0, nodesCallback);
	
}

