//AJAX post function

var poster;

poster = (function($){

	var addNode = function(plantType, lat, lng, discoverer){
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
            dataType: "json"
        })
        .done(function (data){
            user.discoveries++;
            $("#modalAddNode").css("display", "none");
            console.log("Successfully added: " + params);
        })
        .fail(function(data){
            console.log("Error adding plantNode with params:" + params);
            console.log(data);
        });
	};

	return {addNode: addNode};
	
})(jQuery);