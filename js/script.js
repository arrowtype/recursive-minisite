// document.getElementById('fontSizeSlider').onchange = function() {
//     // document.getElementById("fontSizeResult").innerHTML = document.getElementById('fontSizeSlider').value + "px";
//     console.log("hello world");
// }​
let monoWords = ["Mumbai", "Animal", "Future", "Potato", "Spring"];
let c="0";

let slide = document.getElementById('fontSizeSlider'),
    sliderDiv = document.getElementById("fontSizeResult");

slide.onchange = function() {
    sliderDiv.innerHTML = this.value + "px";
    document.getElementById("controls-result").style.fontSize = this.value + "px";
}

let inputSans = document.getElementById("inputSans").innerHTML;
let inputMono = document.getElementById("inputMono").innerHTML;
let lettersSans = inputSans.split('');
let lettersMono = inputMono.split('');
let lettersMaxWidth = 260;
let lettersMinWidth = 60;
document.getElementById("inputSans").innerHTML = '';
document.getElementById("inputMono").innerHTML = '';

for (var i=0; i<lettersSans.length; i++){
    document.getElementById("inputSans").innerHTML += "<span class='letterSans' id='letter" + i +"'>" + lettersSans[i] + "</span>";
    let printVal = document.getElementById("letter" + i).offsetWidth;
    console.log(document.getElementById("letter" + i).offsetWidth, document.getElementById("letter" + i).clientWidth)
    document.getElementById("inputSansValues").innerHTML += '<span class="d-inline-block" style="width: ' + printVal + 'px">' + document.getElementById("letter" + i).offsetWidth + '</span>';
    let tint = map(document.getElementById("letter" + i).offsetWidth, lettersMinWidth, lettersMaxWidth, 80,50);
    document.getElementById("letter" + i).style.backgroundColor = "hsl(221,100%," + tint + "%)";
} 

for (var i=0; i<lettersMono.length; i++){
    document.getElementById("inputMono").innerHTML += "<span class='letterMono' id='letterMono" + i +"'>" + lettersMono[i] + "</span>";
    let printVal = document.getElementById("letterMono" + i).clientWidth;
    document.getElementById("inputMonoValues").innerHTML += '<span class="d-inline-block" style="width: ' + printVal + 'px">' + document.getElementById("letterMono" + i).offsetWidth + '</span>';
} 


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

window.onload = function start() {
    switchLetters();
}

function switchLetters() {
    window.setInterval(function () {
        separateLettersMono(monoWords[c]);
        if (c<monoWords.length){c++} else {c=0}
    }, 3000); // repeat forever, polling every 3 seconds
}

document.getElementById("board").onmousemove = function(e){
    document.getElementById("boardCursor").style.position = "fixed";
    document.getElementById("avocado").classList.remove("active");
    // let mouseX = map(e.clientX, 0, window.innerWidth, 0, document.getElementById("board").clientWidth);
    // let mouseY = map(e.clientY, 0, window.innerHeight, 0, document.getElementById("board").clientHeight);

    document.getElementById("boardCursor").style.top = e.clientY + 5 + "px";
    document.getElementById("boardCursor").style.left = e.clientX + 5 + "px";
}


document.getElementById("toolbar").classList.remove("fixed");
document.getElementById("phantomToolbar").classList.add("d-none");

function separateLettersMono(string){
    let letters = string.split('');
    document.getElementById("inputMono").innerHTML = '';
    document.getElementById("inputMonoValues").innerHTML = '';
    for (var i=0; i<letters.length; i++){
        document.getElementById("inputMono").innerHTML += "<span class='letterMono' id='letterMono" + i +"'>" + letters[i] + "</span>";
        let printVal = document.getElementById("letterMono" + i).clientWidth;
        document.getElementById("inputMonoValues").innerHTML += '<span class="d-inline-block" style="width: ' + printVal + 'px">' + document.getElementById("letterMono" + i).offsetWidth + '</span>';
    } 
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}