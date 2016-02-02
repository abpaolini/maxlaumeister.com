$(document).ready(function() {
	
	var inter = $("#interactive-container");
	var circlescont = $("#circles-canvas");
	var canvas = circlescont.get(0);
	var context = canvas.getContext('2d');
	var offset = circlescont.offset();
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
	
	function resizeCanvas() {
		canvas.width = circlescont.width();
		canvas.height = circlescont.height();
	}
	resizeCanvas();
	$(window).resize(resizeCanvas);
	
	var circles = [];
	var lastTime = Date.now();
	function updateCircles() {
		var time = Date.now();
		var i = 0;
		while (i < circles.length) {
			var circle = circles[i];
			var radius = circle.t;
		
			context.beginPath();
			context.arc(circle.center.x, circle.center.y, radius, 0, 2 * Math.PI, false); // Circle
			context.fillStyle = circle.color;
			context.fill();
			context.closePath();
		
			if (circle.t >= circle.maxRadius) {
				$(".intro-header").css("background", circle.color); // Update header color
				circles.splice(i, 1); // Remove circle from array
			} else {
				circle.t += 0.5 * (time - lastTime);
				i++;
			}
		}
		if (circles.length > 0) {
			lastTime = time;
			requestAnimationFrame(updateCircles);
		}
	}
	
	var tryshow2 = false;
	var tryshow2timeout = null;
	var circlecount2 = null;
	var cooldown = 0;
    
    function interactiveClick(e) {
        e.preventDefault();
		function tryshow2rearm() {
			clearTimeout(tryshow2timeout);
			tryshow2timeout = setTimeout(function() {
				$(".intro-text-noclick").show();
				$(".intro-title-1").fadeOut(500);
				$(".intro-message-1").fadeOut({duration: 500, complete: function(){
					setTimeout(function() {
						$(".intro-text-noclick").hide();
					}, 1000);
                    
                    $('<h1 class="intro-title-2">Wow.</h1>' +
                        '<h3 class="intro-message-2 message-hidden">' +
                            'You must like <a class="interactive-go" href="javascript:void(0)">interaction</a> too.<br>' +
                            'Why not take a look at <a href="#portfolio">my portfolio</a>?' +
                            '<span class="intro-message-3 message-hidden"><br>Or better yet, <a href="#contact">interact with me</a>?</span>' +
                            '<span class="intro-message-4 message-hidden"><br>(Pretty, isn\'t it.)</span>' +
                        '</h3>').insertAfter(".intro-message-1");
                        
                    $(".intro-message-2 .interactive-go").click(interactiveClick);
                    smoothScroll(".intro-message-2");
                    
					$(".intro-title-2").fadeIn(500);
					$(".intro-message-2").fadeIn(500);
					circlecount2 = 0;
					tryshow2 = false;
				}});
			}, 1500);
		}
		
		circlecount++;
		var date = Date.now();
		if (circlecount2 !== null && (date - cooldown) >= 300) {
			circlecount2++;
			cooldown = date;
		}
		
		if (circlecount === 3) {
			tryshow2 = true;
		}
		if (circlecount2 === 5) {
			$(".intro-message-3").fadeIn(1000);
		} else if (circlecount2 === 20) {
			$(".intro-message-4").fadeIn(1000);
		}
		
		if (tryshow2) {
			tryshow2rearm();
		}
		
		// Create a new circle
		circles.push({
			color: (function(){
				var bgcol = color.arr[color.curr];
				color.curr != color.arr.length - 1 ? color.curr++ : color.curr = 0; // Increment color
				$(".banner").css("background", bgcol); // Update header color
				return bgcol;
			})(),
			center: {
				x: e.pageX - offset.left,
				y: e.pageY - offset.top
			},
			t: 0,
			maxRadius: (function(){
				var relX = e.pageX - offset.left;
				var relY = e.pageY - offset.top;
				var iw = circlescont.width();
				var ih = circlescont.height();
	
				// Calculate optimal circle size
				var cornerDists = [];
				cornerDists.push(Math.sqrt(Math.pow(relX, 2) + Math.pow(relY, 2))); // Top left
				cornerDists.push(Math.sqrt(Math.pow(iw - relX, 2) + Math.pow(relY, 2))); // Top right
				cornerDists.push(Math.sqrt(Math.pow(iw - relX, 2) + Math.pow(ih - relY, 2))); // Bottom right
				cornerDists.push(Math.sqrt(Math.pow(relX, 2) + Math.pow(ih - relY, 2))); // Bottom left
				return Math.max.apply(Math, cornerDists);
			})()
		});
		
		// Kick off the animation, if it isn't already working on other circles
		if (circles.length == 1) {
			lastTime = Date.now();
			requestAnimationFrame(updateCircles);
		}
    }
	
	$(".interactive-go").click(interactiveClick);
	
	// Konami Code easter egg
	var revealed = false;
	new Konami(function() {
	    if (!revealed) {
	        var kel = $(".intro-message-konami");
	        kel.html("<br>(I also like the Konami Code.)");
	        kel.fadeIn(1000);
	        revealed = true;
	    }
	});
});
