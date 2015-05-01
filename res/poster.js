//AJAX post function

var poster;

poster = (function($){

	var addNode = function(plantType, lat, lng, discoverer, callback){
		 var paramObj = {
            "table" : "PlantNodes",
            "PlantType" : plantType,
            "lat" : lat,
            "lng" : lng,
            "discoverer" : discoverer
        };
        var params = $.param(paramObj);

        $.ajax({
            url : "http://localhost/UrbanPlantzHtml/dbConnect.php?" + params,
            //url : "http://urbanplants.ca/dbConnect.php?" + params,
            dataType: "jsonp"
        })
        .done(function (data){
            callback(data);
        })
        .fail(function(data){
            console.log("Error adding plantNode with params:" + params);
            console.log(data);
        });
	};

	return {addNode: addNode};
	
})(jQuery);