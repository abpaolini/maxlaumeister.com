var pageWrapperEl = document.getElementById("pageWrapper");
var pageContentEl = document.getElementById("pageContent");
var presentTextEl = document.getElementById("presentText");
var iframeWrapperEl = document.getElementById("iframeWrapper");
var iframeInnerEl = document.getElementById("iframeInner");
var browserURLinput = document.getElementById("browserURLinput");
var downArrowEl = document.getElementById("downArrow");
var extraScrollEl = document.getElementById("extraScroll");
var scrollDelta = 0;
var lastScroll = 0;
var extraScrollHeight;

var ciframe;

var navEl = document.getElementsByClassName("navbar")[0];

var navIsHidden = false;
var backgroundIsHidden = true;
var iframeRequested = false;
var iframeLoaded = false;

var pageHeight;
var windowHeight;

var resizeFrame;
function resize() {
    clearTimeout(resizeFrame);
    resizeFrame = setTimeout(function(){
        pageHeight = pageContentEl.offsetHeight;
        windowHeight = window.innerHeight;
        extraScrollHeight = extraScrollEl.offsetHeight;
    }, 100);
}
 window.addEventListener("resize", resize, false);
 resize();

var revealing = false;

function revealPresentation() {
   revealing = true;
   $('html, body').animate({
       scrollTop: $(document).height()-$(window).height()-1
     }, 750, function() {
        revealing = false;
     });
     
}

var scrollingTimeout;

function scrollChange() {

    var currScroll = window.pageYOffset;
    scrollDelta = currScroll - lastScroll;
    lastScroll = currScroll;
    var scrollBottom = windowHeight + currScroll;

    if (currScroll + 10 < pageHeight && navIsHidden) {
        navEl.classList.remove("tucked");
        iframeWrapperEl.classList.remove("presenting");
        iframeInnerEl.classList.remove("presenting");
        presentTextEl.classList.remove("presenting");
        downArrowEl.classList.remove("presenting");
        navIsHidden = false;
    }

    // Return if we're using the compact layout without the fancy box at the bottom
    if (window.matchMedia("(max-width: 1000px)").matches || window.matchMedia("(max-height: 500px)").matches) return;
    
    if (scrollBottom >= pageHeight + extraScrollHeight / 3 && !revealing && scrollDelta > 0) {
        clearTimeout(scrollingTimeout);
        scrollingTimeout = setTimeout(revealPresentation, 500);
        revealing = true;
    }
    
    if (scrollBottom >= pageHeight + extraScrollHeight / 3 && revealing && scrollDelta < 0) {
        clearTimeout(scrollingTimeout);
        $('html, body').stop();
        revealing = false;
    }
    
    if (currScroll + 10 >= pageHeight && !navIsHidden) {
        function checkiframeReadyState() {
            if (!iframeLoaded) {
                requestAnimationFrame(checkiframeReadyState);
                return;
            }
            if (!navIsHidden) return;
            navEl.classList.add("tucked");
            iframeWrapperEl.classList.add("presenting");
            iframeInnerEl.classList.add("presenting");
        }
        presentTextEl.classList.add("presenting");
        downArrowEl.classList.add("presenting");
        requestAnimationFrame(checkiframeReadyState);
        navIsHidden = true;
    }
    
    if (currScroll + 10 >= pageHeight && !iframeRequested) {
        ciframe = document.createElement("iframe");
        ciframe.className = "recursiveFrame";
        ciframe.frameBorder = "0";
        ciframe.src = window.location.href.replace(location.hash,"") + "?";
        ciframe.onload = function() {
            iframeLoaded = true;
        };
        iframeInnerEl.appendChild(ciframe);
        browserURLinput.value = top.location.href.replace(top.location.hash,"");
        iframeRequested = true;
    }
}



window.onscroll = scrollChange;
scrollChange();
