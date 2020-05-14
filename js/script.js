const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

// const dfltMono = 0;
// const dfltCasl = 0.0;
// const dfltWght = 400;
// const dfltSlnt = 0;
// const dfltCrsv = 0.5;



var CodeMirrorMono = 0;
var CodeMirrorCasl = 0.0;
var CodeMirrorWght = 400;
var CodeMirrorSlnt = 0;
var CodeMirrorCrsv = 0.5;
var CodeMirrorFontVarSet = [CodeMirrorMono, CodeMirrorCasl, CodeMirrorWght, CodeMirrorSlnt];



let labelHeight = Math.min(window.innerWidth*0.5 / Math.sqrt(3) + window.innerHeight * 0.45, window.innerHeight * 0.9 - 120);

document.getElementsByClassName("line3-label")[0].style.top = labelHeight + "px";
document.getElementsByClassName("line1-label")[0].style.top = labelHeight + "px";


document.onresize = function(){
    labelHeight = Math.min(window.innerWidth*0.5 / Math.sqrt(3) + window.innerHeight * 0.45, window.innerHeight * 0.9 - 120);
    document.getElementsByClassName("line3-label")[0].style.top = labelHeight + "px";
    document.getElementsByClassName("line1-label")[0].style.top = labelHeight + "px";
}


    setTimeout(function(){ 
    document.getElementsByTagName("body")[0].classList.add("loaded");
    }, 300);

document.getElementById("globalFontSizeSlider").oninput = function(){
    document.getElementsByTagName("html")[0].style.fontSize = document.getElementById("globalFontSizeSlider").value + "px"
    document.getElementsByTagName("html")[0].style.lineHeight = document.getElementById("globalFontSizeSlider").value * 1.3 + "px";
    document.getElementById("changeFontSize").innerHTML = document.getElementById("globalFontSizeSlider").value;
}

if (parent.document.getElementById("inversePage") != null){
    parent.document.getElementById("inversePage").onmousedown = function(){
        parent.document.getElementsByTagName("body")[0].classList.toggle("inverse");
        for (let i=0;i<document.getElementsByTagName("iframe").length;i++){
            let iframe = document.getElementsByTagName("iframe")[i];
            iframe.contentDocument.getElementsByTagName("body")[0].classList.toggle("inverse");
        }
    }
}

hiderShower('#collapseSettings', '#pickVariability', 'collapseSettings', 'show');
hiderShower('#collapseSize', '#pickFontSize', 'collapseSize', 'show');

// hamburger on mobile
document.getElementById("navbarToggler").onclick = function(){
    document.getElementById("navbarTogglerDemo03").classList.toggle("hideOnMobile");
}

document.getElementsByTagName("select")[0].onmousedown = function(){
    this.style.fontFamily = "sans-serif";
}



function currentStyles() {
    styles = `
            --cm-mono: ${CodeMirrorMono}; 
            --cm-casl: ${CodeMirrorCasl}; 
            --cm-wght: ${CodeMirrorWght}; 
            --cm-slnt: ${CodeMirrorSlnt}; 
            --cm-crsv: ${CodeMirrorCrsv}
            `;
    return styles;
}

document.getElementById("chooseInstance").onchange = function(){

    selectedValue = this.selectedOptions[0].value

    if (selectedValue === "default") {
        setDefaultStyles()
    } else {
        document.getElementsByTagName("select")[0].style.fontFamily = "'RecVF', sans-serif";   
        
        CodeMirrorMono = this.selectedOptions[0].getAttribute('data-mono');
        CodeMirrorCasl = this.selectedOptions[0].getAttribute('data-casl');
        CodeMirrorWght = this.selectedOptions[0].getAttribute('data-wght');
        CodeMirrorSlnt = this.selectedOptions[0].getAttribute('data-slnt');
        CodeMirrorCrsv = this.selectedOptions[0].getAttribute('data-crsv');
        document.getElementById("globalMono").innerHTML = CodeMirrorMono;
        document.getElementById("globalCasl").innerHTML = CodeMirrorCasl;
        document.getElementById("globalWght").innerHTML = CodeMirrorWght;
        document.getElementById("globalSlnt").innerHTML = CodeMirrorSlnt;
        document.getElementById("globalCrsv").innerHTML = CodeMirrorCrsv;
        document.getElementById('globalCaslSlider').value = CodeMirrorMono;
        document.getElementById('globalWghtSlider').value = CodeMirrorCasl;
        document.getElementById('globalSlntSlider').value = CodeMirrorWght;
        document.getElementById('globalMonoSlider').value = CodeMirrorSlnt;
        styles = currentStyles()
        
        changeSettings(styles);
    }
};

function hiderShower(trigger, drawer, closestId, activeClass) {
    // Grab the elements and define the closest function
    var trigger = document.querySelector(trigger),
        drawer = document.querySelector(drawer),
        closest = function(elem, fn) {
            return elem && (fn(elem) ? elem : closest(elem.parentNode, fn));
        };

    // Listen clicks in the document
    document.addEventListener('click', function(e) {
        // Get the closest
        var closestEl = closest(e.target, function(elem) {
            return elem.id === closestId;
        });
        // If the trigger is clicked
        if (e.target.id === trigger.id) {
            drawer.classList.toggle(activeClass);
            trigger.classList.toggle(activeClass);
        }
        // Close if anywhere else is clicked
        if (!closestEl) {
            drawer.classList.remove(activeClass);
            trigger.classList.toggle(activeClass);
        }
    });
};

function setDefaultStyles() {
    CodeMirrorMono = 0;
    CodeMirrorCasl = 0.0;
    CodeMirrorWght = 400;
    CodeMirrorSlnt = 0;
    CodeMirrorCrsv = 0.5;

    changeSettings("");
}

function changeSettings(str){
        
    document.documentElement.style = str
    
    for (const head of document.getElementsByClassName("cm-header")){
        head.style = str;
    }
    for (const crsv of document.getElementsByClassName("cm-em")){
        crsv.style = str;
    }
    for (const crsv of document.querySelectorAll("em, code")){
        crsv.style = str;
    }

    charsetIframe = document.querySelector('[data-src="/languages"]').contentDocument
    charsetIframe.body.style = str;
}

function globalSlider(id, targetId, index){
    document.getElementById(id).addEventListener('input', function(){
        // fontVarSet[index] = document.getElementById(id).value;
        CodeMirrorFontVarSet[index] = document.getElementById(id).value;
        CodeMirrorMono = CodeMirrorFontVarSet[0]
        CodeMirrorCasl = CodeMirrorFontVarSet[1]
        CodeMirrorWght = CodeMirrorFontVarSet[2]
        CodeMirrorSlnt = CodeMirrorFontVarSet[3]
        // CodeMirrorCrsv = CodeMirrorFontVarSet[4]
        
        styles = currentStyles()

        changeSettings(styles);
        document.getElementById(targetId).innerHTML = CodeMirrorFontVarSet[index];
        document.querySelector('#chooseInstance').value = "--axes--"
    })
}


function globalRadio(id, value){
        CodeMirrorCrsv = value;
        document.querySelector(".radio-crsv.active").classList.remove("active");
        document.getElementById(id).classList.add("active");
        
        document.getElementById("globalCrsv").innerHTML = CodeMirrorCrsv;

        styles = currentStyles()

        changeSettings(styles);
        document.querySelector('#chooseInstance').value = "--axes--"
}

globalSlider("globalMonoSlider", "globalMono", 0);
globalSlider("globalCaslSlider", "globalCasl", 1);
globalSlider("globalWghtSlider", "globalWght", 2);
globalSlider("globalSlntSlider", "globalSlnt", 3);

// handle CRSV radio selection
document.querySelector("#globalCrsvOn").addEventListener("click", () => globalRadio("globalCrsvOn", 1));
document.querySelector("#globalCrsvAuto").addEventListener("click", () => globalRadio("globalCrsvAuto", 0.5));
document.querySelector("#globalCrsvOff").addEventListener("click", () => globalRadio("globalCrsvOff", 0));

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

    for (let i=0;i<document.getElementsByTagName("iframe").length;i++){
        let fr = document.getElementsByTagName("iframe")[i];
        if (isElementXPercentInViewport(fr, 5)) {            
            fr.contentDocument.getElementsByTagName("body")[0].classList.add("inViewport");
        } else {
            fr.contentDocument.getElementsByTagName("body")[0].classList.remove("inViewport");
        }
    }


    let scrollObject = {};
        scrollObject = {
            x: window.pageXOffset,
            y: window.pageYOffset
        }

    // if(scrollObject.y > (935 - 104)) {
    //     document.getElementById("toolbar").classList.add("fixed");
    //     document.getElementById("phantomToolbar").classList.remove("d-none");
    // } else {
    //     document.getElementById("toolbar").classList.remove("fixed");
    //     document.getElementById("phantomToolbar").classList.add("d-none");
    // }

    let navHeight = 137;

    let moduleWghtVal = Math.floor(interpolate(document.getElementById("weightForItSm").getBoundingClientRect().top, navHeight + 120, window.innerHeight - 200, 1000, 100));
    if (moduleWghtVal >= 100 && moduleWghtVal <= 1000){ document.getElementById("weightForIt__wghtVal").innerHTML = moduleWghtVal; }
    document.getElementById("weightForIt__casl0").style.fontVariationSettings = "'CASL' 0, 'wght' " + moduleWghtVal;
    document.getElementById("weightForIt__casl25").style.fontVariationSettings = "'CASL' 0.25, 'wght' " + moduleWghtVal;
    document.getElementById("weightForIt__casl50").style.fontVariationSettings = "'CASL' 0.50, 'wght' " + moduleWghtVal;
    document.getElementById("weightForIt__casl75").style.fontVariationSettings = "'CASL' 0.75, 'wght' " + moduleWghtVal;
    document.getElementById("weightForIt__casl1").style.fontVariationSettings = "'CASL' 1, 'wght' " + moduleWghtVal;

    let moduleCrsvVal = interpolate(document.getElementById("truerItalicsSm").getBoundingClientRect().top, navHeight + 120, window.innerHeight - 200, -15, 0).toFixed(2);
    if (moduleCrsvVal >= -15 && moduleCrsvVal <= 0){ document.getElementById("truerItalics__crsvVal").innerHTML = moduleCrsvVal; }
    document.getElementById("truerItalics__crsv0").style.fontVariationSettings = "'CRSV' 0, 'wght' 700, 'slnt' " + moduleCrsvVal;
    document.getElementById("truerItalics__crsv1").style.fontVariationSettings = "'CRSV' 0.5, 'wght' 700, 'slnt' " + moduleCrsvVal;
    document.getElementById("truerItalics__crsv2").style.fontVariationSettings = "'CRSV' 1, 'wght' 700, 'slnt' " + moduleCrsvVal;

    let moduleCaslVal = interpolate(document.getElementById("readyForWorkSm").getBoundingClientRect().top, navHeight + 120, window.innerHeight - 200, 1, 0).toFixed(2);
    if (moduleCaslVal >= 0 && moduleCaslVal <= 1){ document.getElementById("readyForWork__caslVal").innerHTML = moduleCaslVal; }
    document.getElementById("readyForWork__amp").style.fontVariationSettings = "'wght' 800, 'CASL' " + moduleCaslVal;
    if (moduleCaslVal > 0.5){
        document.getElementById("ampersandTextLeft").classList.add("d-none");
        document.getElementById("ampersandTextRight").classList.remove("d-none");
    } else {
        document.getElementById("ampersandTextLeft").classList.remove("d-none");
        document.getElementById("ampersandTextRight").classList.add("d-none");
    }
};

// document.getElementById("toolbar").classList.remove("fixed");
// document.getElementById("phantomToolbar").classList.add("d-none");

function interpolate(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

const isElementXPercentInViewport = function(el, percentVisible) {
  let
    rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};