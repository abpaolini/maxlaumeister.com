$(document).ready(function() {
	$("#interactive-go").one("click", function(e) {
		var inter = $("#interactive-container");
		var offset = inter.offset();
		var relX = e.pageX - offset.left;
		var relY = e.pageY - offset.top;
		var iw = inter.width();
		var ih = inter.height();
		
		// Calculate optimal circle size
		var cornerDists = [];
		cornerDists.push(Math.sqrt(Math.pow(relX, 2) + Math.pow(relY, 2))); // Top left
		cornerDists.push(Math.sqrt(Math.pow(iw - relX, 2) + Math.pow(relY, 2))); // Top right
		cornerDists.push(Math.sqrt(Math.pow(iw - relX, 2) + Math.pow(ih - relY, 2))); // Bottom right
		cornerDists.push(Math.sqrt(Math.pow(relX, 2) + Math.pow(ih - relY, 2))); // Bottom left
		var circWidth = Math.max.apply(Math, cornerDists) * 2;
		
		var oc = $("#opening-circle");
		oc.css({
			width: circWidth,
			height: circWidth,
			left: (relX - circWidth / 2) + "px",
			top: (relY - circWidth / 2) + "px",
			"transform": "scale(1, 1)"
		})
		oc.get(0).addEventListener( 'webkitTransitionEnd', function() {
			oc.css("opacity", "0");
		}, false );
	});
});
