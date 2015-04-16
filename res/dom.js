var myScroll;

$(document).ready(function(){

	myScroll = new IScroll( '#dataListWrapper', {
		//disableMouse: true,
		eventPassthrough: true,
		scrollX: true,
		scrollY: false,
		preventDefault: false,
		fadeScrollbars: true,
		scrollbars: true,
		mouseWheel: true
	});
	
	$("#marcsButton").click(function(){
		console.log("SUP JIGGA!!!");
	});
	
});


function resetIScroll() {
	myScroll.scrollTo( 0, 0, 0);
	setTimeout(function () {
		myScroll.refresh();
	}, 0);
}


function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			getPlaces(loc, true);
			map.panTo(loc);
			map.setZoom(12);
			displayNearestPlants();
		}, function(error){
			//nah
		});
	} else {
		//nah
	}
}


function toggleDataWindow(){
	if (window.matchMedia('(max-width: 767px)')) {
		if ($("#dataWindow").css("left") == "0px") {	
			$("#dataWindow").css("left", "-110%");
			$("#googleMap").off("mousedown");
		} 
		else {
			$("#dataWindow").css("left", "0px");
			$("#googleMap").on("mousedown", function() {
				$("#dataWindow").css("left", "-110%");
			});
		}
		
	}
}



function displayNearestPlants() {
	
	$("#dataList").html("");

	plantNodes.forEach(function(element) {
		var dataListItem;
		dataListItem = $("<div class='dataListItem'></div>");
		dataListItem.append("<div class='dataListItemName'>" + element.plantType.name + "</div>");
		dataListItem.append("<div class='dataListItemDistance'>" + element.distance + "m away</div>");
		dataListItem.append("<div class='dataListItemVisited'>Visited " + element.timesVisited + " times</div>");
		
		dataListItem.click(function(){
			map.panTo(new google.maps.LatLng(element.latitude, element.longitude));
			map.setZoom(18);
		});

		$("#dataList").append(dataListItem);

	});
	
	//$("#dataList").attr("width", (plantNodes.length * 200) + "px");
	resetIScroll();
}


//need displayMarkerData, or something like it 
//should it pop up data over icon, or display it in infoWindow?
//probably the latter - have infoWindow on the left on big screens, on the top on small
	//on small: can scroll sideways through a list of nearby plants
	//click on one: zooms to that location, displays plant data, offers "back" button?
