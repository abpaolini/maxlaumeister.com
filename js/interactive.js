$(document).ready(function() {

	var inter = $("#interactive-container");
	var circlescont = $("#circles-container");
	var offset = inter.offset();
	var circlecount = 0;
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
	
	var tryshow2 = false;
	var tryshow2timeout = null;
	var circlecount2 = null;
	
	$(".interactive-go").click(function(e) {
		e.preventDefault();
		function tryshow2rearm() {
			clearTimeout(tryshow2timeout);
			tryshow2timeout = setTimeout(function(){
				$(".intro-title-1").fadeOut(500);
				$(".intro-message-1").fadeOut({duration: 500, complete: function(){
					$(".intro-title-2").fadeIn(500);
					$(".intro-message-2").fadeIn(500);
					circlecount2 = 0;
				}});
			}, 1500);
		}
		
		circlecount++;
		if (circlecount2 !== null) {
			circlecount2++;
		}
		
		if (circlecount === 5) {
			tryshow2 = true;
		}
		if (circlecount2 === 15) {
			$(".intro-message-3").fadeIn(1000);
		} else if (circlecount2 === 40) {
			$(".intro-message-4").fadeIn(1000);
		}
		
		if (tryshow2) {
			tryshow2rearm();
		}
		
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
					"-webkit-transform": "scale(1, 1)",
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
				"-webkit-transform": "scale(1, 1)",
				"transform": "scale(1, 1)"
			});
			transitionEnd(oc).bind(function() {
				oc.css("opacity", "0");
				transitionEnd(oc).unbind();
			});
		}
	});
});
