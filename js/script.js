const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));
let wght = 400;
let prop = 1;
let xprn = 0.5;
let slnt = 0;
let ital = 0.5;
let fontVarSet = [prop, wght, xprn, slnt, ital];


// function yIntercept(x1,x2,y1,y2){
//     let m = (x2 - x1)/(y2 - y1);
//     return (x2 - x1)/(y2 - y1);
// }

// document.getElementById("line1").setAttribute("points", "democlass");


// FontFaceOnload('Recursive', {
// 	success: function() {
// 		var docEl = document.documentElement;
// 		docEl.className += ' recursive-loaded';
// 	}
// });

// var image = document.querySelector('iframe');
    // window.addEventListener('scroll', function (event) {
    //     let iframe = document.getElementsByTagName("iframe")[i];
    //     if (isInViewport(iframe)) {            
    //         iframe.contentDocument.getElementsByTagName("body")[0].classList.add("inViewport");
    //     } else {
    //         iframe.contentDocument.getElementsByTagName("body")[0].classList.remove("inViewport");
    //     }
    // }, false);

window.onload = function() {
    // document.getElementsByTagName("body")[0].classList.add("preload");
    setTimeout(function(){ 
    document.getElementsByTagName("body")[0].classList.add("loaded");
    }, 100);
    // setTimeout(function(){ 
    // document.getElementById("THREE").style.opacity = "1";
    // }, 1200);
}

// for (const detail of document.getElementsByClassName("detail")){
//     detail.onclick = function(){
//         this.style.display = "none";
//     }
// }

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
    document.getElementById('globalPropSlider').value = prop;
    let styles = "'PROP' " + prop + ", 'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'ital' " + ital;
    for (const codemirrors of document.getElementsByClassName("CodeMirror-lines")){codemirrors.style.fontVariationSettings = styles};
    document.getElementsByClassName("mobile-version")[0].style.fontVariationSettings = styles;
    for (const header of document.querySelectorAll("h1, h2, h3, h4, h5, h6, em")){header.style.fontVariationSettings = styles;}
    changeSettings(styles);
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

function globalSlider(id, targetId, index){
    document.getElementById(id).addEventListener('input', function(){
        fontVarSet[index] = document.getElementById(id).value;
        document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'PROP' " + fontVarSet[0] + ", 'wght' " + fontVarSet[1] + ", 'XPRN' " + fontVarSet[2] + ", 'slnt' " + fontVarSet[3] + ", 'ital' " + fontVarSet[4];
        let styles = "'PROP' " + fontVarSet[0] + ", 'wght' " + fontVarSet[1] + ", 'XPRN' " + fontVarSet[2] + ", 'slnt' " + fontVarSet[3] + ", 'ital' " + fontVarSet[4];
        changeSettings(styles);
        document.getElementById(targetId).innerHTML = fontVarSet[index];
    })
}

function changeSettings(str){
        for (const itals of document.getElementsByClassName("cm-em")){
            itals.style.fontVariationSettings = str;
        }
        for (const heads of document.getElementsByClassName("cm-header")){
            heads.style.fontVariationSettings = str;
        }
        for (let i=0;i<document.getElementsByTagName("iframe").length;i++){
            if (document.getElementsByTagName("iframe")[i].getAttribute("src") == "/languages"){
                let iframe = document.getElementsByTagName("iframe")[i];
                iframe.contentDocument.getElementById("grid").style.fontVariationSettings = str;
            }
        }
}

function globalRadio(id, value){
    document.getElementById(id).onclick = function(){
        ital = value;
        document.querySelector(".radio-ital.active").classList.remove("active");
        this.classList.add("active");
        document.getElementsByClassName("CodeMirror-lines")[0].style.fontVariationSettings = "'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'PROP' " + prop + ", 'ital' " + ital;
        document.getElementById("globalItal").innerHTML = ital;
        let styles = "'PROP' " + prop + ", 'wght' " + wght + ", 'XPRN' " + xprn + ", 'slnt' " + slnt + ", 'ital' " + ital;
        changeSettings(styles);
    }
}

globalSlider("globalWghtSlider", "globalWght", 1);
globalSlider("globalXprnSlider", "globalXprn", 2);
globalSlider("globalSlntSlider", "globalSlnt", 3);
globalSlider("globalPropSlider", "globalProp", 0);
globalRadio("globalItalOn", 1);
globalRadio("globalItalAuto", 0.5);
globalRadio("globalItalOff", 0);

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

    if(scrollObject.y > (935 - 104)) {
        document.getElementById("toolbar").classList.add("fixed");
        document.getElementById("phantomToolbar").classList.remove("d-none");
    } else {
        document.getElementById("toolbar").classList.remove("fixed");
        document.getElementById("phantomToolbar").classList.add("d-none");
    }

    let navHeight = 137;

    let moduleWghtVal = Math.floor(interpolate(document.getElementById("weightForItSm").getBoundingClientRect().top, navHeight + 120, window.innerHeight - 200, 900, 100));
    if (moduleWghtVal >= 100 && moduleWghtVal <= 900){ document.getElementById("weightForIt__wghtVal").innerHTML = moduleWghtVal; }
    document.getElementById("weightForIt__xprn0").style.fontVariationSettings = "'XPRN' 0, 'wght' " + moduleWghtVal;
    document.getElementById("weightForIt__xprn25").style.fontVariationSettings = "'XPRN' 0.25, 'wght' " + moduleWghtVal;
    document.getElementById("weightForIt__xprn50").style.fontVariationSettings = "'XPRN' 0.50, 'wght' " + moduleWghtVal;
    document.getElementById("weightForIt__xprn75").style.fontVariationSettings = "'XPRN' 0.75, 'wght' " + moduleWghtVal;
    document.getElementById("weightForIt__xprn1").style.fontVariationSettings = "'XPRN' 1, 'wght' " + moduleWghtVal;

    let moduleItalVal = interpolate(document.getElementById("truerItalicsSm").getBoundingClientRect().top, navHeight + 120, window.innerHeight - 200, -15, 0).toFixed(2);
    if (moduleItalVal >= -15 && moduleItalVal <= 0){ document.getElementById("truerItalics__italVal").innerHTML = moduleItalVal; }
    document.getElementById("truerItalics__crsv0").style.fontVariationSettings = "'ital' 0, 'wght' 700, 'slnt' " + moduleItalVal;
    document.getElementById("truerItalics__crsv1").style.fontVariationSettings = "'ital' 0.5, 'wght' 700, 'slnt' " + moduleItalVal;
    document.getElementById("truerItalics__crsv2").style.fontVariationSettings = "'ital' 1, 'wght' 700, 'slnt' " + moduleItalVal;

    let moduleXprnVal = interpolate(document.getElementById("readyForWorkSm").getBoundingClientRect().top, navHeight + 120, window.innerHeight - 200, 1, 0).toFixed(2);
    if (moduleXprnVal >= 0 && moduleXprnVal <= 1){ document.getElementById("readyForWork__xprnVal").innerHTML = moduleXprnVal; }
    document.getElementById("readyForWork__amp").style.fontVariationSettings = "'wght' 800, 'XPRN' " + moduleXprnVal;
    if (moduleXprnVal > 0.5){
        document.getElementById("ampersandTextLeft").classList.add("d-none");
        document.getElementById("ampersandTextRight").classList.remove("d-none");
    } else {
        document.getElementById("ampersandTextLeft").classList.remove("d-none");
        document.getElementById("ampersandTextRight").classList.add("d-none");
    }
};

document.getElementById("toolbar").classList.remove("fixed");
document.getElementById("phantomToolbar").classList.add("d-none");

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