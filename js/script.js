// let monoWords = ["Mumbai", "Animal", "Future", "Potato", "Spring"];
// let c="0";
// let enableHandler = true;

// let slide = document.getElementById('fontSizeSlider'),
//     sliderDiv = document.getElementById("fontSizeResult");

// slide.onchange = function() {
//     sliderDiv.innerHTML = this.value + "px";
//     document.getElementById("controls-result").style.fontSize = this.value + "px";
// }

document.getElementById("inversePage").onmousedown = function(){
    document.getElementsByTagName("body")[0].classList.toggle("inverse");
}

document.getElementById("globalFontSizeSlider").oninput = function(){
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontSize = document.getElementById("globalFontSizeSlider").value + "px"
    document.getElementsByClassName("CodeMirror-lines")[0].style.lineHeight = document.getElementById("globalFontSizeSlider").value * 1.3 + "px";
}

// document.getElementById("globalApplyMono").onmousedown = function(){
//     document.getElementsByTagName("body")[0].classList.toggle("mono");
// }

// document.getElementById("globalApplySans").onmousedown = function(){
//     console.log(document.getElementsByTagName("body")[0]);
//     document.getElementsByTagName("body")[0].classList.toggle("mono");
// }

// let ampersandSlider = document.getElementById('ampersandSlider'),
//     grSlider = document.getElementById('grSlider'),
//     o = document.getElementById('ampersandOutput'),
//     o2 = document.getElementById('grOutput'),
//     amp = document.getElementById("ampersandMiddle"),
//     grs = document.getElementById("grsMiddle");

//     o.innerHTML = ampersandSlider.value;
//     o2.innerHTML = grSlider.value;

// // use 'change' instead to see the difference in response
// ampersandSlider.addEventListener('input', function () {
//   o.innerHTML = ampersandSlider.value;
//   o.style.left = ampersandSlider.value*100 + "%";
//   amp.style.left = ampersandSlider.value*100 + "%";
//   amp.style.fontVariationSettings = "'XPRN' " + ampersandSlider.value;
//   if (ampersandSlider.value == 0){
//     document.getElementById("readyForWork").classList.add("linear");
//   } else if (ampersandSlider.value == 1){
//     document.getElementById("readyForWork").classList.toggle("casual");
//   } else {
//     document.getElementById("readyForWork").classList.remove("casual");
//     document.getElementById("readyForWork").classList.remove("linear");
//   }
// }, false);

// use 'change' instead to see the difference in response
// grSlider.addEventListener('input', function () {
//   o2.innerHTML = grSlider.value;
//   o2.style.left = grSlider.value*100 + "%";
//   grs.style.top = grSlider.value*100 + "%";
//   grs.style.fontVariationSettings = '"ital" '+ grSlider.value +', "XPRN" 0, "CRSV" 0;';
//   console.log('"ital" '+ grSlider.value +', "XPRN" 0, "CRSV" 0;')
// //   grs.style.fontVariationSettings = "'XPRN' " + grSlider.value;
// }, false);

const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

window.addEventListener('click', (ev) => {
  const elm = ev.target;
  if (triggers.includes(elm)) {
    const selector = elm.getAttribute('data-target');
    collapse(selector, 'toggle');
  }
}, false);

document.getElementById("chooseInstance").onchange = function(){   
   document.getElementById("globalProp").innerHTML = this.selectedOptions[0].getAttribute('data-prop');
   document.getElementById("globalWght").innerHTML = this.selectedOptions[0].getAttribute('data-wght');
   document.getElementById("globalXprn").innerHTML = this.selectedOptions[0].getAttribute('data-xprn');
   document.getElementById("globalItal").innerHTML = this.selectedOptions[0].getAttribute('data-ital');
   document.getElementById("globalCrsv").innerHTML = this.selectedOptions[0].getAttribute('data-slnt');
};


const fnmap = {
  'toggle': 'toggle',
  'show': 'add',
  'hide': 'remove'
};
const collapse = (selector, cmd) => {
  const targets = Array.from(document.querySelectorAll(selector));
  targets.forEach(target => {
    target.classList[fnmap[cmd]]('show');
  });
}


window.onscroll = function(){
    let scrollObject = {};
        scrollObject = {
            x: window.pageXOffset,
            y: window.pageYOffset
        }

    if(scrollObject.y > (935 - 104)) {
        document.getElementById("toolbar").classList.add("fixed");
        document.getElementById("phantomToolbar").classList.remove("d-none");
    } else {
        document.getElementById("toolbar").classList.remove("fixed");
        document.getElementById("phantomToolbar").classList.add("d-none");
    }
};

window.onload = function start() {
    switchLetters();

    for (var i=0;i<document.getElementsByTagName("iframe").length;i++){
            console.log(document.getElementsByTagName("iframe")[i].contentWindow.document.body.offsetHeight);
    }
}

window.onload = function(){
    
}

function switchLetters() {
    window.setInterval(function () {
        separateLettersMono(monoWords[c]);
        if (c<monoWords.length-1){c++} else {c=0;};
        // console.log(c);
        // console.log(monoWords.length);
    }, 3000); // repeat forever, polling every 3 seconds
}

// document.getElementById("board").onmousemove = function(e){
//     document.getElementById("avocado").classList.remove("active");
//     let bounds = document.getElementById("board").getBoundingClientRect();
//     let mouseX = interpolate(e.clientX, bounds.left, bounds.right, 0, document.getElementById("board").clientWidth);
//     let mouseY = interpolate(e.clientY, bounds.top, bounds.bottom, 0, document.getElementById("board").clientHeight);
//     if (mouseY < document.getElementById("board").clientHeight - 10){
//         document.getElementById("boardCursor").style.top = mouseY + 5 + "px";
//     }
//     if (mouseX < document.getElementById("board").clientWidth - 10){
//         document.getElementById("boardCursor").style.left = mouseX + 5 + "px";
//         console.log(mouseX, document.getElementById("board").clientWidth - 10)
//     }
   
// }

// function customCursor(boundsDiv,cursorDiv,extraSpace){
//     boundsDiv.onmousemove = function(e){
//         boundsDiv.getElementsByTagName("li")[1].classList.remove("active");
//         let bounds = boundsDiv.getBoundingClientRect();
//         let mouseX = interpolate(e.clientX, bounds.left, bounds.right, 0, boundsDiv.clientWidth);
//         let mouseY = interpolate(e.clientY, bounds.top, bounds.bottom, 0, boundsDiv.clientHeight);
//         if (mouseY < boundsDiv.clientHeight - extraSpace){
//             cursorDiv.style.top = mouseY + 5 + "px";
//         }
//         if (mouseX < boundsDiv.clientWidth - extraSpace){
//             cursorDiv.style.left = mouseX + 5 + "px";
//         }
//     }
// }
// customCursor(document.getElementById("good"), document.getElementById("cursorGood"), 50);
// customCursor(document.getElementById("bad"), document.getElementById("cursorBad"), 100);



// document.getElementById("canvas").onmousemove = function(e){
//     let bounds = document.getElementById("dollars").getBoundingClientRect();
//     let xPos = interpolate(e.clientX, bounds.left, bounds.right, 0, document.getElementById("dollars").clientWidth);
//     let yPos = interpolate(e.clientY, bounds.top, bounds.bottom, 0, document.getElementById("dollars").clientHeight);
//     let xAxisLabel = interpolate(e.clientX, bounds.left, bounds.right, 0, 1);
//     let yAxisLabel = interpolate(e.clientY, bounds.top, bounds.bottom, 300, 900);

//     document.getElementById("yAxis").style.left = xPos + "px";
//     document.getElementById("yAxis").innerHTML = "<div>"+Math.floor(yAxisLabel)+"</div><div>"+Math.floor(yAxisLabel)+"</div>";
//     document.getElementById("xAxis").style.top = yPos + "px";
//     document.getElementById("xAxis").innerHTML = '<div class="float-left">'+xAxisLabel.toFixed(2)+'</div><div class="float-right">'+xAxisLabel.toFixed(2)+'</div>';

//     let fontVariationSettings = "font-variation-settings: 'XPRN' " + xAxisLabel.toFixed(2);

//     if (enableHandler == true) {
//         if (yPos < 400 && yPos > 60 && xPos < 933 && xPos > 60 ){
//             document.getElementById("dollars").innerHTML += `<div class='dollar' style='top: ${yPos}px; left:${xPos}px; font-variation-settings: "XPRN" ${xAxisLabel.toFixed(2)}, "wght" ${Math.floor(yAxisLabel)}; font-weight:${Math.floor(yAxisLabel)}'>$</div>`;
//         }
//         enableHandler = false;
//     } 

// }

// document.getElementById("grid").onmouseover = function(e){
//     // console.log(e.clientX, e.clientY);
//     if (e.clientX > window.outerWidth /2){
//         document.getElementById("grid").classList.add("left");
//     } else {
//         document.getElementById("grid").classList.remove("left");
//     }
//     if (e.clientY > document.getElementById("grid").getBoundingClientRect().bottom - 568){
//         document.getElementById("grid").classList.add("bottom");
//     } else {
//         document.getElementById("grid").classList.remove("bottom");
//     }
//     console.log(e.clientY, document.getElementById("grid").getBoundingClientRect().bottom - 568);
// }
    
// window.setInterval(function(){
//     enableHandler = true;
// }, 100);


// document.getElementById("canvas").onmousemove = function(e){
//     if (enableHandler) {
//         handleMouseMove(e);
//         enableHandler = false;
//     }

//     let bounds = document.getElementById("dollars").getBoundingClientRect();
//     let mouseX = interpolate(e.clientX, bounds.left, bounds.right, 0, document.getElementById("dollars").clientWidth);
//     let mouseY = interpolate(e.clientY, bounds.top, bounds.bottom, 0, document.getElementById("dollars").clientHeight);
//     document.getElementById("yAxis").style.left = mouseX + "px";
//     document.getElementById("xAxis").style.top = mouseY + "px";
// }

// function handleMouseMove(e){
//     let bounds = document.getElementById("dollars").getBoundingClientRect();
//     let mouseX = interpolate(e.clientX, bounds.left, bounds.right, 0, document.getElementById("dollars").clientWidth);
//     let mouseY = interpolate(e.clientY, bounds.top, bounds.bottom, 0, document.getElementById("dollars").clientHeight);
//     // document.getElementById("dollars").innerHTML += "<div class='dollar' style='top: " + mouseY + "px; left:" + mouseX + "px'>$</div>";
// }


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

function interpolate(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}