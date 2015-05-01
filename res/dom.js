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

	//initialize array of plantTypes
	//will we need to do this again, if the user ever adds a new plant type?
		//nah - it'll have to be verified by someone else, right?
		//they'll have to close and restart the app to refresh it, in the unlikely event that they're adding plant types
	poller.fetchTypes(typesCallback);
		
	
	
	$("#addNode").click(function(){
		$("#modalAddNode").css("display", "inline-block");
	});

	$("#addNodeSubmit").click(function(){
		var lat, lng;
		navigator.geolocation.getCurrentPosition(function(position){
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			poster.addNode(
				$("#addNodeSelect").val(),	//plantType
				lat, 	//lat
				lng, 	//lng
				user.name, 	//discoverer
				addNodeCallback	//callback
			);
		});
		
	});

	$("#addNodeCancel").click(function(){
		$("#modalAddNode").css("display", "none");
	});
	
});

function addNodeCallback(data) {
	user.discoveries++;
    $("#modalAddNode").css("display", "none");
    console.log("Successfully added");
}


function typesCallback(data) {
	plantTypes = data;

	//populate the drop-down menu in the addNode popup
	plantTypes.forEach(function(element, index){
		$("#addNodeSelect").append($("<option value='" + plantTypes[index].plant_id + "'>" + plantTypes[index].name + "</option>"));
	});
}

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
		dataListItem.append("<div>Node ID: " + element.node_id + "</div>");
		dataListItem.append("<div>Lat: " + element.lat + "</div>");
		dataListItem.append("<div>Lng: " + element.lng + "</div>");
		if (plantTypes[element.plantType - 1]) {
			dataListItem.append("<div class='dataListItemName'>Type:" + element.plantType + ", aka " + plantTypes[element.plantType - 1].name + "</div>");
		}
		else {
			dataListItem.append("<div class='dataListItemName'>No type yet!</div>");
		}
		//dataListItem.append("<div class='dataListItemDistance'>" + element.distance + "m away</div>");
		//dataListItem.append("<div class='dataListItemVisited'>Visited " + element.timesVisited + " times</div>");
		
		dataListItem.click(function(){
			map.panTo(new google.maps.LatLng(element.lat, element.lng));
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
