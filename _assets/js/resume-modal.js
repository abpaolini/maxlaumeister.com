var resumeModal = document.getElementById("resume-modal");
var closeButton = document.getElementById("resume-close");

var iframeEl = document.getElementById("resume-frame");

function closeModal() {
    resumeModal.style.display = "none";
    $("body").removeClass("noscroll");
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
    if (!iframeEl.src) iframeEl.src = "pdfjs/web/viewer.html?file=../../resume-maxlaumeister.pdf#0";
    $(resumeModal).show();
    $("body").addClass("noscroll");
    return false;
});
