var poller;

/*
//DUMMY POLLER - uses dummy data for testing
poller = (function( $ ) {

    var plantTypes = {
        "blueberry" : {
            "name" : "Blueberry",
            "wikipediaLink" : "http://en.wikipedia.org/wiki/Blueberry",
            "icon" : "berry",
            "seasonStart" : "May",
            "seasonEnd" : "August"
        }, //icon should be compiled to "/img/icons/berry.png" or something like it
        "raspberry" : {
            "name" : "Raspberry",
            "wikipediaLink" : "http://en.wikipedia.org/wiki/Raspberry",
            "icon" : "berry",
            "seasonStart" : "May",
            "seasonEnd" : "August"
        },
        "apple" : {
            "name" : "Apple",
            "wikipediaLink" : "http://en.wikipedia.org/wiki/Apple",
            "icon" : "fruit",
            "seasonStart" : "May",
            "seasonEnd" : "August"
        },
        "raspberry" : {
            "name" : "Raspberry",
            "wikipediaLink" : "http://en.wikipedia.org/wiki/Raspberry",
            "icon" : "berry",
            "seasonStart" : "May",
            "seasonEnd" : "August"
        },
    };

    var users = {
        "Ed" : {
        	"userName" : "Ed",
            "joined" : "04/07/2015",
            "confirmations" : 5,
            "discoveries" : 12,
        },
        "Marc" : {
        	"userName" : "Marc",
            "joined" : "04/07/2015",
            "confirmations" : 7,
            "discoveries" : 42,
        },
    };

    //list of plantNode
    var plantNodes = [
        {
            "id" : "000000001",
            "distance" : "1",
            "latitude" : 43.652900,
            "longitude" : -79.443800,
            //"discovererUser" : users["Ed"],
            //"confirmerUser" : users["Marc"],
            //"plantType" : plantTypes["blueberry"],
            "timesVisited" : 5,
        },
        {
            "id" : "000000002",
            "distance" : "2",
            "latitude" : 43.653080,
            "longitude" : -79.443800,
            //"discovererUser" : users["Ed"],
            //"confirmerUser" : users["Marc"],
            //"plantType" : plantTypes["blueberry"],
            "timesVisited" : 4, 
        },
        {
            "id" : "000000003",
            "distance" : "3",
            "latitude" : 43.654200,
            "longitude" : -79.444000,
            //"discovererUser" : users["Marc"],
            //"confirmerUser" : users["Marc"],
            //"plantType" : plantTypes["raspberry"],
            "timesVisited" : 8,
        },
        {
            "id" : "000000004",
            "distance" : "4",
            "latitude" : 43.653500,
            "longitude" : -79.443400,
            //"discovererUser" : users["Marc"],
            //"confirmerUser" : users["Marc"],
            //"plantType" : plantTypes["raspberry"],
            "timesVisited" : 8,
        },
    ];
    plantNodes[0].discovererUser = users["Ed"];
    plantNodes[1].discovererUser = users["Ed"];
    plantNodes[2].discovererUser = users["Marc"];
    plantNodes[3].discovererUser = users["Marc"];
    plantNodes[0].plantType = plantTypes["blueberry"];
    plantNodes[1].plantType = plantTypes["blueberry"];
    plantNodes[2].plantType = plantTypes["raspberry"];
    plantNodes[3].plantType = plantTypes["raspberry"];

	var fetch = function(lat, lng, rad, callback) {
		callback(plantNodes);
	}

	return {fetch: fetch};
})( jQuery );
*/


poller = (function( $ ) {

    //need to check if plantType exists?
    //will this work if plantType is null, or "all", or "0"?
    var fetchNodes = function(plantType, callback) {
        var paramObj = {
            "table" : "PlantNodes",
            "PlantType" : plantType,
        };
        var params = $.param(paramObj);

        $.ajax({
            url : "http://localhost/UrbanPlantzHtml/dbConnect.php?" + params,
            dataType: "json"
        })
        .done(function (data){
            callback(data);
        })
        .fail(function(data){
            console.log("Error fetching plantNodes: ");
            console.log(data);
        });
    }

     var fetchTypes = function(callback) {
        var paramObj = {
            "table" : "PlantType",
        };
        var params = $.param(paramObj);

        $.ajax({
            url : "http://localhost/UrbanPlantzHtml/dbConnect.php?" + params,
            dataType: "json"
        })
        .done(function (data){
            callback(data);
        })
        .fail(function(data){
            console.log("Error fetching plantType: ");
            console.log(data);
        });
    }

    return {
        fetchNodes: fetchNodes,
        fetchTypes: fetchTypes
    };
})(jQuery);



/* THIS IS THE GOOD POLLER - TO BE USED ONCE THE BACKEND IS UP
poller = (function( $ ) {
	var maxItems = 20;
	
	var fetch = function( lat, lng, rad, callback ) {
		var paramObj = {
			'lat': lat,
			'lng': lng,
			'rad': rad,
			'maxItems': maxItems
		};
		var params = $.param( paramObj );

		$.ajax({
			//url: 'http://wamp.globalnews.ca/content/hack/petrenkorp.github.io/services/polluters.php?' + params,
			//url: 'http://madscientistblog.com/hack/polluters.php?' + params,
			dataType: 'jsonp'
		})
		.done( function( data ) {
			//console.log( 'data fetched' );
			callback( data );
		})
		.fail( function( data ) {
			console.log( 'an error has occured: ' + data );
		});
	};
		
	return {
		fetch: fetch
	};
})( jQuery );

*/

//poller.fetch( 43.6502840, -79.3843010, 10, output );

//function output( data ) {
//	console.log( data );
//}