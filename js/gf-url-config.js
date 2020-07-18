// Script to enable Google Fonts API Config tool


// open & close drawer with config controls


const getRecButton = document.querySelector("#get-rec-button");
const closeDrawerButton = document.querySelector("#close-sidebar");
const drawerScrim = document.querySelector("#sidebar--scrim");
const apiConfigDrawer = document.querySelector("#api-config-drawer");
const pageHtml = document.querySelector('html');
const pageBody = document.body;
let pageScrollY = 0;

getRecButton.addEventListener("click", toggleDrawer)
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
// let wght = 400
// let MONO = 0

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
    // selectedSources = checkSelectedSources()
    // let wghtMin = selectedSources[0]
    // let wghtMax = selectedSources[selectedSources.length - 1]
    
    // wghtResult = `${wghtMin}..${wghtMax}`

    wghtResult = `300..1000`

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
    "slnt_MONO":61,
    "CASL_MONO":63,
    "wght": 73,
    "slnt_CASL": 78,
    "wght_MONO": 95,
    "slnt_CASL_MONO": 103,
    "slnt_wght": 121,
    "wght_CASL": 129,
    "slnt_wght_MONO": 159,
    "wght_CASL_MONO": 167,
    "slnt_wght_CASL": 213,
    "slnt_wght_CASL_MONO": 280 // artifically reduced by 1 to let CRSV appear as active
  }

  // TODO: add permutations with wght half vs wght full

  let filesize = filesizes[rangesRequested.join('_')]

  // if CRSV makes no difference as a range, it looks broken. So, this adds "1 kb"
  if (CRSVResult.includes('..')) {
    filesize += 1
  }

  let sizeLabel = document.querySelector("#approx-filesize span")

  sizeLabel.innerHTML = filesize



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

// similar to a calendar date-range picker: https://fetrarij.github.io/ngx-daterangepicker-material/simple

function toggleSelectionState(e) {
  // console.log(e.target)
  // console.log(e.target.dataset.selected)
  if (e.target.dataset.selected === "true") {
    // console.log("it's true")
    e.target.dataset.selected = "false"
  } else {
    // console.log("it's a nope")
    e.target.dataset.selected = "true"
  }
}

const rangeSelectorControl = document.querySelector('#wght__range') 
// console.log(rangeSelectorControl)
const rangeSelectorNodes = document.querySelectorAll("#wght__range .range-selector")

function checkSelectedSources() {
  selectedSources = []
  // check what sources are selected
  for (var selector of rangeSelectorNodes) {if (selector.dataset.selected === "true") {selectedSources.push(parseInt(selector.dataset.wghtSrc))}}

  return selectedSources
}

function selectRange(e) {
  rangeSelectorControl.classList.add("active")
  // console.log("first click on selector", e.target)

  // if a user clicks any of the selectors, all get set to false 
  for (var selector of rangeSelectorNodes) {selector.dataset.selected = "false"}
  // and then the clicked selector gets set to true
  e.target.dataset.selected = "true"

  // temporarily removes the click 
  for (var selector of rangeSelectorNodes) {selector.removeEventListener('click', selectRange)}

  // listen for user to click on next target
  document.addEventListener('mousedown', function nextClick(e) {
    function resetControls() {
      for (var selector of rangeSelectorNodes) {selector.dataset.selected = "true"}
      rangeSelectorControl.classList.remove("active")
      document.removeEventListener('mousedown',nextClick)
    }
    // console.log("click")
    // console.log("closest is ", e.target.closest('#wght__range'))
    // if user clicks outside of controller, reset to previous state
    if (e.target.matches('.range-selector') === false) {
      // console.log("click outside!")
      resetControls()
      }
    // if user clicks the same selector a second time
    else if (e.target.dataset.selected === "true") {
      // console.log("click on same selector!")
      resetControls()
    }
    // if user clicks a different selector 
    else {
      // console.log("click on selector!")
      e.target.dataset.selected = "true"
      rangeSelectorControl.classList.remove("active")
      document.removeEventListener('mousedown',nextClick)
    }
    
    // check what sources are selected
    // selectedSources = []
    // for (var selector of rangeSelectorNodes) {if (selector.dataset.selected === "true") {selectedSources.push(parseInt(selector.dataset.wghtSrc))}}
    selectedSources = checkSelectedSources()

    // if 300 and 1000 are selected, also set 800 to "true"
    if (selectedSources.includes(300) && selectedSources.includes(1000)) {
      document.querySelector('[data-wght-src="800"]').dataset.selected = "true"
    }

    setUrl()

    // re-add listeners after delay, or the setting won't stick
    window.setTimeout(function() {
      // console.log("adding listeners")
      addRangeListeners();
    }, 500);
  })

}

function addRangeListeners() {
  for (var selector of rangeSelectorNodes) {
    selector.addEventListener('click', selectRange)
  }
}

addRangeListeners()


// -----------------------------------------------------------------------------
// wght - pinned slider

const wght_pinned_slider = document.querySelector("#wght--pinned__slider");
const wght_pinned_val = document.querySelector("#wght--pinned__label");
wght_pinned_val.innerHTML = wght_pinned_slider.value

wght_pinned_slider.addEventListener('input', (e) => {
  wght_pinned_val.innerHTML = e.target.value;
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

MONO_pinned_slider.addEventListener('input', (e) => {
  MONO_pinned_val.innerHTML = e.target.value;
  setUrl()
});



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

CASL_pinned_slider.addEventListener('input', (e) => {
  CASL_pinned_val.innerHTML = e.target.value;
  setUrl()
});

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

slnt_pinned_slider.addEventListener('input', (e) => {
  slnt_pinned_val.innerHTML = e.target.value;
  setUrl()
});


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

CRSV_pinned_slider.addEventListener('input', (e) => {
  CRSV_pinned_val.innerHTML = e.target.value;
  setUrl()
});



// cue URL

setUrl()



