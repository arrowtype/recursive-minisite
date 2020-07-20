// Script to enable Google Fonts API Config tool


// open & close drawer with config controls


const getRecButton = document.querySelector("#get-rec-1");
const getRecButton2 = document.querySelector("#get-rec-2");
const closeDrawerButton = document.querySelector("#close-sidebar");
const drawerScrim = document.querySelector("#sidebar--scrim");
const apiConfigDrawer = document.querySelector("#api-config-drawer");
const pageHtml = document.querySelector('html');
const pageBody = document.body;
let pageScrollY = 0;

getRecButton.addEventListener("click", toggleDrawer)
getRecButton2.addEventListener("click", toggleDrawer)
closeDrawerButton.addEventListener("click", toggleDrawer)
drawerScrim.addEventListener("click", toggleDrawer)

let drawerIsOpen = false

document.addEventListener("keydown", e => {
  if (e.keyCode === 27 && drawerIsOpen === true) {
    toggleDrawer()
  }
})

function toggleDrawer() {
  apiConfigDrawer.classList.toggle("drawer-hidden")
  drawerScrim.classList.toggle("scrim-hidden")

  // if opening drawer
  if (!drawerIsOpen) {
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    pageBody.style.position = 'fixed';
    pageBody.style.top = `-${scrollY}`;
    pageHtml.style.scrollBehavior = 'auto';
  }
  // if closing drawer 
  else {
    const scrollY = pageBody.style.top;
    pageBody.style.position = '';
    pageBody.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    pageHtml.style.scrollBehavior = 'smooth';
  }

  drawerIsOpen = !drawerIsOpen;

}

// set max-height on window resize to fit iOS safari

const drawerMain = document.querySelector(".sidebar--main");
const drawerHeader = document.querySelector(".sidebar--header");
const navHeight = drawerHeader.offsetHeight;

function fitWindowHeight() {
  // size to window.innerHeight – var(--nav_height)
  drawerMain.style.maxHeight = `${window.innerHeight - navHeight}px`
}

window.onload = fitWindowHeight()

window.addEventListener('resize', fitWindowHeight)

// get window scroll to prevent scroll behind modal

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

// ----------------------------------

let selectedSources = [300, 1000]

function setUrl() {  
  const api_call = document.querySelector("#api-call");

  let wghtResult = `400`
  let MONOResult = `0`
  let CASLResult = `0`
  let slntResult = `0`
  let CRSVResult = `0`

  // used later to calc approx filesize
  let rangesRequested = []

  if (slntSubsetControls.dataset.subsetType === "range") {
    slntResult = `-15..0`
    rangesRequested.push('slnt')
  } else {
    slnt = slnt_pinned_slider.value
    slntResult = slnt
  }

  if (wghtSubsetControls.dataset.subsetType === "range") {
    selectedSources = checkSelectedSources()
    let wghtMin = selectedSources[0]
    let wghtMax = selectedSources[selectedSources.length - 1]
    
    wghtResult = `${wghtMin}..${wghtMax}`

    // wghtResult = `300..1000`

    rangesRequested.push('wght')
  } else {
    wght = wght_pinned_slider.value
    wghtResult = `${wght}`
  }
  
  if (CASLSubsetControls.dataset.subsetType === "range") {
    CASLResult = `0..1`
    rangesRequested.push('CASL')
  } else {
    CASL = CASL_pinned_slider.value
    CASLResult = CASL
  }

  if (CRSVSubsetControls.dataset.subsetType === "range") {
    CRSVResult = `0..1`
    // rangesRequested.push('CRSV') // doesn’t effect filesize, so leave it out
  } else {
    CRSV = CRSV_pinned_slider.value
    CRSVResult = CRSV
  }

  if (MONOSubsetControls.dataset.subsetType === "range") {
    MONOResult = `0..1`
    rangesRequested.push('MONO')
  } else {
    MONO = MONO_pinned_slider.value
    MONOResult = MONO
  }
  

  let axesRequested = []
  let valsRequested = []

  if (slntResult != "0") {
    axesRequested.push('slnt')
    valsRequested.push(slntResult)
  }
  if (wghtResult != "400") {
    axesRequested.push('wght')
    valsRequested.push(wghtResult)
  }
  if (CASLResult != "0") {
    axesRequested.push('CASL')
    valsRequested.push(CASLResult)
  }
  if (CRSVResult != "0.5") {
    axesRequested.push('CRSV')
    valsRequested.push(CRSVResult)
  }
  if (MONOResult != "0") {
    axesRequested.push('MONO')
    valsRequested.push(MONOResult)
  }

  // -----------------------------------------------------------
  // compute approximate VF filesize

  // active range(s): resulting kb
  const filesizes = {
    "": 27,
    "MONO": 38,
    "slnt": 46,
    "CASL": 48,

    // with weight limited to 300–800
    "wght": 49,
    "wght_MONO": 65,
    "slnt_wght": 81,
    "wght_CASL": 85,
    "slnt_wght_MONO": 106,
    "wght_CASL_MONO": 112,
    "slnt_wght_CASL": 112,
    "slnt_wght_CASL_MONO": 185, // artifically reduced by 1 to let CRSV appear as active

    // with weight 300–1000
    "slnt_MONO":61,
    "CASL_MONO":63,
    "wght1000": 73,
    "slnt_CASL": 78,
    "wght1000_MONO": 95,
    "slnt_CASL_MONO": 103,
    "slnt_wght1000": 121,
    "wght1000_CASL": 129,
    "slnt_wght1000_MONO": 159,
    "wght1000_CASL_MONO": 167,
    "slnt_wght1000_CASL": 213,
    "slnt_wght1000_CASL_MONO": 280, // artifically reduced by 1 to let CRSV appear as active
    
    
  }

  let filesize = filesizes[rangesRequested.join('_')]
  if (wghtResult == '300..1000') {
    let fullRangesRequested = rangesRequested.map(function(axis){return axis.replace('wght', 'wght1000');});
    filesize = filesizes[fullRangesRequested.join('_')]
  } 


  // if CRSV makes no difference as a range, it looks broken. So, this adds "1 kb"
  if (CRSVResult.includes('..')) {
    filesize += 1
  }

  let sizeLabel = document.querySelector("#approx-filesize span")
  
  sizeLabel.innerHTML = filesize
  
  let possibleSizeLabel = document.querySelector("#max-filesize span")
  possibleSizeLabel.innerHTML = filesizes["slnt_wght1000_CASL_MONO"] + 1

  // barchart
  
  let percentageSize = filesize / (filesizes["slnt_wght1000_CASL_MONO"] + 1) * 100

  let barchartFilled = document.querySelector("#filesize-filled")
  let percentageDiff = Math.abs(percentageSize - barchartFilled.style.getPropertyValue("--percent"))
  barchartFilled.style.setProperty("--percent", percentageSize)
  barchartFilled.style.setProperty("--percentChange", percentageDiff)



  // -----------------------------------------------------------
  // make query URL
  
  // make array of axes
  // make array of vals
  let urlString = `https://fonts.sandbox.google.com/css2?family=<span class="code--bold">Recursive</span>&display=swap`
  
  if (axesRequested.length > 0) {
    let axesQuery = axesRequested.join(',')
    let valsQuery = valsRequested.join(',')
    
    urlString = `https://fonts.sandbox.google.com/css2?family=<span class="code--bold">Recursive:${axesQuery}@${valsQuery}</span>&display=swap`
  } else {
    urlString = `https://fonts.sandbox.google.com/css2?family=<span class="code--bold">Recursive</span>&display=swap`
  }
  
  // -----------------------------------------------------------
  // show embed code

  const howToHTML = document.querySelector('#howto--html-embed')
  const howToCSS = document.querySelector('#howto--css-embed')

  if (embedTypeControls.dataset.embedType === "html") {
    api_call.innerHTML = `
    &lt;link href="${urlString}"
    rel="stylesheet"&gt;
    `
  } else {
    api_call.innerHTML = `
    &lt;style&gt;
    <br>
    @import url('${urlString}');
    <br>
    &lt;/style&gt;
    `
  }
}

// embed URL type

const embedTypeControls = document.querySelector('#embed .embed-type')

document.getElementById("embed_type__html").addEventListener('input', () => {
  embedTypeControls.dataset.embedType = "html"
  setUrl()
});

document.getElementById("embed_type__css").addEventListener('input', () => {
  embedTypeControls.dataset.embedType = "css"
  setUrl()
});

// wght subset type

const wghtSubsetControls = document.querySelector('#wght-control .subset-controls')

document.getElementById("wght_subset__range").addEventListener('input', () => {  
  wghtSubsetControls.dataset.subsetType = "range"
  setUrl()
});

document.getElementById("wght_subset__pinned").addEventListener('input', () => {
  wghtSubsetControls.dataset.subsetType = "pinned"
  setUrl()
});

// wght - axis range selector

// simplified to match requirement of FontTools Instancer of having default (300) in partial font, and align other stops to master values
// e.g. "1000" is basically just a checkbox saying whether the range should extend past 800

wght1000checkbox = document.querySelector("#wght-1000")
wght1000range = document.querySelector('[data-wght-range="800-1000"]')

// set/unset wght 1000 in range
wght1000checkbox.addEventListener('click', (e) => {
  wght1000range.dataset.active == "false" ? wght1000range.dataset.active = "true" : wght1000range.dataset.active = "false";
  wght1000checkbox.dataset.selected == "false" ? wght1000checkbox.dataset.selected = "true" : wght1000checkbox.dataset.selected = "false";
  setUrl()
});

const rangeSelectorControl = document.querySelector('#wght__range') 
// console.log(rangeSelectorControl)
const rangeSelectorNodes = document.querySelectorAll("#wght__range .range-selector")

function checkSelectedSources() {
  selectedSources = []
  // check what sources are selected
  for (var selector of rangeSelectorNodes) {if (selector.dataset.selected === "true") {selectedSources.push(parseInt(selector.dataset.wghtSrc))}}

  return selectedSources
}

// -----------------------------------------------------------------------------
// wght - pinned slider

const wght_pinned_slider = document.querySelector("#wght--pinned__slider");
const wght_pinned_val = document.querySelector("#wght--pinned__label");
wght_pinned_val.innerHTML = wght_pinned_slider.value
const wght_pinned_parent = wght_pinned_slider.parentNode


wght_pinned_slider.addEventListener('input', (e) => {
  wght_pinned_val.innerHTML = e.target.value;
  wght_pinned_parent.style.setProperty('--val', e.target.value)
  setUrl()
})



// -----------------------------------------------------------------------------
// MONO subset type

const MONOSubsetControls = document.querySelector('#MONO-control .subset-controls')

document.getElementById("MONO_subset__range").addEventListener('input', () => {  
  MONOSubsetControls.dataset.subsetType = "range"
  setUrl()
});

document.getElementById("MONO_subset__pinned").addEventListener('input', () => {
  MONOSubsetControls.dataset.subsetType = "pinned"
  setUrl()
});

// MONO pinned slider

const MONO_pinned_slider = document.querySelector("#MONO--pinned__slider");
const MONO_pinned_val = document.querySelector("#MONO--pinned__label");
MONO_pinned_val.innerHTML = MONO_pinned_slider.value

const MONO_pinned_parent = MONO_pinned_slider.parentNode

MONO_pinned_slider.addEventListener('input', (e) => {
  MONO_pinned_val.innerHTML = e.target.value;
  MONO_pinned_parent.style.setProperty('--val', e.target.value)
  setUrl()
})




// -----------------------------------------------------------------------------
// CASL subset type

const CASLSubsetControls = document.querySelector('#CASL-control .subset-controls')

document.getElementById("CASL_subset__range").addEventListener('input', () => {  
  CASLSubsetControls.dataset.subsetType = "range"
  setUrl()
});

document.getElementById("CASL_subset__pinned").addEventListener('input', () => {
  CASLSubsetControls.dataset.subsetType = "pinned"
  setUrl()
});

// CASL pinned slider

const CASL_pinned_slider = document.querySelector("#CASL--pinned__slider");
const CASL_pinned_val = document.querySelector("#CASL--pinned__label");
CASL_pinned_val.innerHTML = CASL_pinned_slider.value

const CASL_pinned_parent = CASL_pinned_slider.parentNode

CASL_pinned_slider.addEventListener('input', (e) => {
  CASL_pinned_val.innerHTML = e.target.value;
  CASL_pinned_parent.style.setProperty('--val', e.target.value)
  setUrl()
})


// -----------------------------------------------------------------------------
// slnt subset type

const slntSubsetControls = document.querySelector('#slnt-control .subset-controls')

document.getElementById("slnt_subset__range").addEventListener('input', () => {  
  slntSubsetControls.dataset.subsetType = "range"
  setUrl()
});

document.getElementById("slnt_subset__pinned").addEventListener('input', () => {
  slntSubsetControls.dataset.subsetType = "pinned"
  setUrl()
});

// slnt pinned slider

const slnt_pinned_slider = document.querySelector("#slnt--pinned__slider");
const slnt_pinned_val = document.querySelector("#slnt--pinned__label");
slnt_pinned_val.innerHTML = slnt_pinned_slider.value

const slnt_pinned_parent = slnt_pinned_slider.parentNode

slnt_pinned_slider.addEventListener('input', (e) => {
  slnt_pinned_val.innerHTML = e.target.value;
  slnt_pinned_parent.style.setProperty('--val', e.target.value)
  setUrl()
})



// -----------------------------------------------------------------------------
// CRSV subset type

const CRSVSubsetControls = document.querySelector('#CRSV-control .subset-controls')

document.getElementById("CRSV_subset__range").addEventListener('input', () => {  
  CRSVSubsetControls.dataset.subsetType = "range"
  setUrl()
});

document.getElementById("CRSV_subset__pinned").addEventListener('input', () => {
  CRSVSubsetControls.dataset.subsetType = "pinned"
  setUrl()
});

// CRSV pinned slider

const CRSV_pinned_slider = document.querySelector("#CRSV--pinned__slider");
const CRSV_pinned_val = document.querySelector("#CRSV--pinned__label");
CRSV_pinned_val.innerHTML = CRSV_pinned_slider.value

const CRSV_pinned_parent = CRSV_pinned_slider.parentNode

CRSV_pinned_slider.addEventListener('input', (e) => {
  CRSV_pinned_val.innerHTML = e.target.value;
  CRSV_pinned_parent.style.setProperty('--val', e.target.value)
  setUrl()
})


// -----------------------------------------------------------------
// update slider widths to position slider thumb labels

function updateSliderWidths() {
  if (MONOSubsetControls.dataset.subsetType === "pinned") {
    MONO_pinned_parent.style.setProperty('--trackWidth', MONO_pinned_parent.offsetWidth)
  }
  if (CASLSubsetControls.dataset.subsetType === "pinned") {
    CASL_pinned_parent.style.setProperty('--trackWidth', CASL_pinned_parent.offsetWidth)
  }
  if (wghtSubsetControls.dataset.subsetType === "pinned") {
    wght_pinned_parent.style.setProperty('--trackWidth', wght_pinned_parent.offsetWidth)
  }
  if (slntSubsetControls.dataset.subsetType === "pinned") {
    slnt_pinned_parent.style.setProperty('--trackWidth', slnt_pinned_parent.offsetWidth)
  }
  if (CRSVSubsetControls.dataset.subsetType === "pinned") {
    CRSV_pinned_parent.style.setProperty('--trackWidth', CRSV_pinned_parent.offsetWidth)
  }
}

window.addEventListener('resize', updateSliderWidths)

updateSliderWidths() // update on load

// cue URL

setUrl()


// --------------------------------------------------
// hamburger on mobile

function toggleNav() {
  document.getElementById("navbarTogglerDemo03").classList.toggle("hideOnMobile");
  document.getElementById("navbar-scrim").classList.toggle("hideOnMobile");
}

let navToggler = document.getElementById("navbarToggler")
navToggler.addEventListener('click', toggleNav)

let navScrim = document.getElementById("navbar-scrim")
navScrim.addEventListener('click', toggleNav)

let navLinks = document.querySelector("#navbarTogglerDemo03")
navLinks.addEventListener('click', toggleNav)