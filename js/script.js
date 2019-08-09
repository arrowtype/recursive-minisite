window.onscroll = function(){
    let scrollObject = {};
        scrollObject = {
            x: window.pageXOffset,
            y: window.pageYOffset
        }

    if(scrollObject.y > (window.innerHeight - 104)) {
        document.getElementById("toolbar").classList.add("fixed");
        document.getElementById("phantomToolbar").classList.remove("d-none");
    } else {
        document.getElementById("toolbar").classList.remove("fixed");
        document.getElementById("phantomToolbar").classList.add("d-none");
    }
};



document.getElementById("toolbar").classList.remove("fixed");
document.getElementById("phantomToolbar").classList.add("d-none");