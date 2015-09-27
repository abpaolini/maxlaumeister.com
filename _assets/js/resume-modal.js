var resumeModal = document.getElementById("resume-modal");
var closeButton = document.getElementById("resume-close");

var iframeEl = document.getElementById("resume-frame");

var $flipper = $("#flipper");

function closeModal() {
    $flipper.removeClass("flipped");
    $(closeButton).addClass("invisible");
}

closeButton.onclick = closeModal;

$(resumeModal).click(function(event) {
    if(event.target==this) closeModal();
});

iframeEl.onload = function() {
    // Convert links to open in top
    var innerDoc = iframeEl.contentDocument || iframeEl.contentWindow.document;
    $('head', innerDoc).append('<base target="_top">');
};

$(".resume-button").click(function(){
    $flipper.addClass("flipped");
    setTimeout(function () {
        $flipper.off();
        $(closeButton).removeClass("invisible");
    }, 1000);
    return false;
});
