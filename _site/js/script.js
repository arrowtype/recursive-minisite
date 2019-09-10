const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

var typed = new Typed(".element", options);

document.getElementById("inversePage").onmousedown = function(){
    document.getElementsByTagName("body")[0].classList.toggle("inverse");
    for (const mod of document.getElementsByClassName("module")){
        mod.classList.toggle("inverse");
    }
}

document.getElementById("globalFontSizeSlider").oninput = function(){
    document.getElementsByTagName("html")[0].style.fontSize = document.getElementById("globalFontSizeSlider").value + "px"
    document.getElementsByTagName("html")[0].style.lineHeight = document.getElementById("globalFontSizeSlider").value * 1.3 + "px";
    document.getElementById("changeFontSize").innerHTML = document.getElementById("globalFontSizeSlider").value;
}

document.getElementById("collapseSettings").onclick = function(){
    document.getElementById("pickVariability").classList.toggle("show");
    if (document.getElementById("pickFontSize").classList.contains("show")){
        document.getElementById("pickFontSize").classList.toggle("show");
    }
};

// if (document.getElementById("pickVariability").classList.contains("show")){
//     document.onclick = function(){
//         console.log("hello");
        
//         document.getElementById("pickVariability").classList.toggle("show");
//     }
// }

document.onclick = function(e){
        if(e.target.id == 'pickVariability'){
            // #do nothing
        } else if (document.getElementById("pickVariability").classList.contains("show") || e.target.id == "collapseSettings"){
         	document.getElementById("pickVariability").classList.toggle("show");
        }
    };


document.getElementById("navbarToggler").onclick = function(){
    document.getElementById("navbarTogglerDemo03").classList.toggle("hideOnMobile");
}

window.addEventListener('click', (ev) => {
  const elm = ev.target;
  if (triggers.includes(elm)) {
    const selector = elm.getAttribute('data-target');
    collapse(selector, 'toggle');
  }
}, false);

// document.getElementById("hero").onmousemove = function(e){
//     document.getElementById('verticalBar').style.left = e.clientX + 'px';
//     let heroWeight = interpolate(e.clientX, 0, window.innerWidth, 300, 900);
//     document.getElementById("temp-hero").style.fontVariationSettings = "'wght' " + heroWeight;
//     document.getElementById("weightVal").innerHTML = Math.floor(heroWeight);
// }

document.getElementById("chooseInstance").onchange = function(){   
    let wght = this.selectedOptions[0].getAttribute('data-wght');
    let prop = this.selectedOptions[0].getAttribute('data-prop');
    let xprn = this.selectedOptions[0].getAttribute('data-xprn');
    let slnt = this.selectedOptions[0].getAttribute('data-slnt');
    let ital = this.selectedOptions[0].getAttribute('data-ital');
    document.getElementById("globalProp").innerHTML = prop;
    document.getElementById("globalWght").innerHTML = wght;
    document.getElementById("globalXprn").innerHTML = xprn;
    document.getElementById("globalItal").innerHTML = ital;
    document.getElementById("globalSlnt").innerHTML = slnt;
    document.getElementById('globalWghtSlider').value = wght;
    document.getElementById('globalXprnSlider').value = xprn;
    document.getElementById('globalSlntSlider').value = slnt;
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    for (const itals of document.getElementsByClassName("cm-em")){
        itals.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    for (const heads of document.getElementsByClassName("cm-header")){
        heads.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    
};

let wght = 400;
let prop = 0;
let xprn = 0.5;
let slnt = 0;
let ital = 0.5;

document.getElementById('globalXprnSlider').addEventListener('input', function(){
    xprn = document.getElementById('globalXprnSlider').value;
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    for (const itals of document.getElementsByClassName("cm-em")){
        itals.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    for (const heads of document.getElementsByClassName("cm-header")){
        heads.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    document.getElementById("globalXprn").innerHTML = xprn;
})
document.getElementById('globalWghtSlider').addEventListener('input', function(){
    wght = document.getElementById('globalWghtSlider').value;
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    document.getElementById("globalWght").innerHTML = wght;
    for (const itals of document.getElementsByClassName("cm-em")){
        itals.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    for (const heads of document.getElementsByClassName("cm-header")){
        heads.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
})
document.getElementById('globalSlntSlider').addEventListener('input', function(){
    slnt = document.getElementById('globalSlntSlider').value;
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    document.getElementById("globalSlnt").innerHTML = slnt;
    for (const itals of document.getElementsByClassName("cm-em")){
        itals.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    for (const heads of document.getElementsByClassName("cm-header")){
        heads.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
})
document.getElementById("globalRadioSans").onclick = function(){
    prop = 1;
    document.querySelector(".radio-prop.active").classList.remove("active");
    this.classList.add("active");
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    document.getElementById("globalProp").innerHTML = prop;
    for (const itals of document.getElementsByClassName("cm-em")){
        itals.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    for (const heads of document.getElementsByClassName("cm-header")){
        heads.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
}
document.getElementById("globalRadioMono").onclick = function(){
    prop = 0;
    document.querySelector(".radio-prop.active").classList.remove("active");
    this.classList.add("active");
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    document.getElementById("globalProp").innerHTML = prop;
    for (const itals of document.getElementsByClassName("cm-em")){
        itals.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    for (const heads of document.getElementsByClassName("cm-header")){
        heads.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
}
document.getElementById("globalItalOff").onclick = function(){
    ital = 0;
    document.querySelector(".radio-ital.active").classList.remove("active");
    this.classList.add("active");
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    document.getElementById("globalItal").innerHTML = ital;
    for (const itals of document.getElementsByClassName("cm-em")){
        itals.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    for (const heads of document.getElementsByClassName("cm-header")){
        heads.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
}
document.getElementById("globalItalAuto").onclick = function(){
    ital = 0.5;
    document.querySelector(".radio-ital.active").classList.remove("active");
    this.classList.add("active");
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    document.getElementById("globalItal").innerHTML = ital;
    for (const itals of document.getElementsByClassName("cm-em")){
        itals.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    for (const heads of document.getElementsByClassName("cm-header")){
        heads.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
}
document.getElementById("globalItalOn").onclick = function(){
    ital = 1;
    document.querySelector(".radio-ital.active").classList.remove("active");
    this.classList.add("active");
    document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    document.getElementById("globalItal").innerHTML = ital;
    for (const itals of document.getElementsByClassName("cm-em")){
        itals.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
    for (const heads of document.getElementsByClassName("cm-header")){
        heads.style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
    }
}









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

// window.onload = function start() {
//     switchLetters();

//     for (var i=0;i<document.getElementsByTagName("iframe").length;i++){
//             // console.log(document.getElementsByTagName("iframe")[i].contentWindow.document.body.offsetHeight);
//     }
// }

// function switchLetters() {
//     window.setInterval(function () {
//         separateLettersMono(monoWords[c]);
//         if (c<monoWords.length-1){c++} else {c=0;};
//     }, 3000); // repeat forever, polling every 3 seconds
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