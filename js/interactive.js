$(document).ready(function() {

	var inter = $("#interactive-container");
	var circlescont = $("#circles-container");
	var offset = inter.offset();
	var color = {
		curr: 0,
		arr: [
			"#EDC951",
			"#4ECDC4",
			"#556270",
			"#FF6B6B",
			"#6A4A3C",
			$(".intro-header").css("background-color")
		]
	};
	
	$("#interactive-go").click(function(e) {
		e.preventDefault();
		// Large screen
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
		
		if (/* $(document).width() < 992 */ true) { // TODO
			// Small screen
			console.log("small screen");
			var circ = $("<div class='circle-color'></div>");
			circlescont.append(circ);
			setTimeout(function(){
				var bgcol = color.arr[color.curr];
				color.curr != color.arr.length - 1 ? color.curr++ : color.curr = 0; // Increment color
				circ.css({
					width: circWidth,
					height: circWidth,
					left: (relX - circWidth / 2) + "px",
					top: (relY - circWidth / 2) + "px",
					"transform": "scale(1, 1)",
					"background-color": bgcol
				});
				$(".banner").css("background", bgcol);
				transitionEnd(circ).bind(function() {
					var cc = circlescont.children();
					cc.get(0).remove();
					$(".intro-header").css("background", $(this).css("background-color"));
					transitionEnd(circ).unbind();
				});
			}, 50); // After repaint
		} else {
			// TODO
			var oc = $("#opening-circle");
			oc.css({
				width: circWidth,
				height: circWidth,
				left: (relX - circWidth / 2) + "px",
				top: (relY - circWidth / 2) + "px",
				"transform": "scale(1, 1)"
			});
			transitionEnd(oc).bind(function() {
				oc.css("opacity", "0");
				transitionEnd(oc).unbind();
			});
		}
	});
});
