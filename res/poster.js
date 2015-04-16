//AJAX post function

var poster;

poller = (function($){

	var post = function(plant){
		console.log(plant);
	};

	return {post: post};
	
})(jQuery);