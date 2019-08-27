document.getElementById("inversePage").onmousedown = function(){
    document.getElementsByTagName("body")[0].classList.toggle("inverse");
}

document.getElementById("globalFontSizeSlider").oninput = function(){
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontSize = document.getElementById("globalFontSizeSlider").value + "px"
    document.getElementsByClassName("CodeMirror-lines")[0].style.lineHeight = document.getElementById("globalFontSizeSlider").value * 1.3 + "px";
}

const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

window.addEventListener('click', (ev) => {
  const elm = ev.target;

    console.log(triggers);
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

document.getElementById("collapseSettings").onclick = function(){
    document.getElementById("pickVariability").classList.toggle("show");
};



// document.getElementById('fontSizeSlider').addEventListener('input', function(){
//     document.getElementById("controls-result").style.fontSize = document.getElementById('fontSizeSlider').value + 'px';
//     document.getElementById("fontSizeResult").innerHTML = document.getElementById('fontSizeSlider').value + 'px';
// })

// document.getElementById('fontWeightSlider').addEventListener('input', function(){
//     wght = document.getElementById('fontWeightSlider').value;
//         document.getElementById("controls-result").style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop;
//     document.getElementById("fontWeightResult").innerHTML = document.getElementById('fontWeightSlider').value;
// })
// document.getElementById('xprnSlider').addEventListener('input', function(){
//     xprn = document.getElementById('xprnSlider').value;
//         document.getElementById("controls-result").style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop;
//     document.getElementById("xprnResult").innerHTML = document.getElementById('xprnSlider').value;
// })
// document.getElementById('slntSlider').addEventListener('input', function(){
//     slnt = document.getElementById('slntSlider').value;
//         document.getElementById("controls-result").style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop;
//     document.getElementById("slntResult").innerHTML = document.getElementById('slntSlider').value;
// })
// document.getElementById("radioSans").onclick = function(){
//     prop = 1;
//     document.querySelector(".radio-prop.active").classList.remove("active");
//     this.classList.add("active");
//     document.getElementById("controls-result").style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
// }
// document.getElementById("radioMono").onclick = function(){
//     prop = 0;
//     document.querySelector(".radio-prop.active").classList.remove("active");
//     this.classList.add("active");
//     document.getElementById("controls-result").style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
// }
// document.getElementById("italOff").onclick = function(){
//     ital = 0;
//     document.querySelector(".radio-ital.active").classList.remove("active");
//     this.classList.add("active");
//     document.getElementById("controls-result").style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
// }
// document.getElementById("italAuto").onclick = function(){
//     ital = 0.5;
//     document.querySelector(".radio-ital.active").classList.remove("active");
//     this.classList.add("active");
//     document.getElementById("controls-result").style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
// }
// document.getElementById("italOn").onclick = function(){
//     ital = 1;
//     document.querySelector(".radio-ital.active").classList.remove("active");
//     this.classList.add("active");
//     document.getElementById("controls-result").style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
// }









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

function switchLetters() {
    window.setInterval(function () {
        separateLettersMono(monoWords[c]);
        if (c<monoWords.length-1){c++} else {c=0;};
    }, 3000); // repeat forever, polling every 3 seconds
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

function interpolate(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}