//// import list from './modules/list'
//// console.log(`Hello ${list[2]}`)


const getRecButton = document.querySelector("#get-rec-button");
const closeDrawerButton = document.querySelector("#close-sidebar");
const apiConfigDrawer = document.querySelector("#api-config-drawer");

getRecButton.addEventListener("click", toggleDrawer)
closeDrawerButton.addEventListener("click", toggleDrawer)

function toggleDrawer() {
  apiConfigDrawer.classList.toggle("drawer-hidden")
}

let selectedSources = [300, 1000]
let selectedLanguages = []
// let wght = 400
// let MONO = 0

function setUrl() {  
  const api_call = document.querySelector("#api-call");
  
  function updateUrl(result) {
    api_call.innerHTML = result
  }
  let result = ``

  let wghtResult = `300..1000`
  let MONOResult = `0..1`
  let CASLResult = `0..1`
  let slntResult = `-15..0`


  if (wghtSubsetControls.dataset.subsetType === "range") {
    selectedSources = checkSelectedSources()
    let wghtMin = selectedSources[0]
    let wghtMax = selectedSources[selectedSources.length - 1]
    
    wghtResult = `${wghtMin}..${wghtMax}`
  } else {
    wght = wght_pinned_slider.value
    wghtResult = `${wght}`
  }

  if (MONOSubsetControls.dataset.subsetType === "range") {
    MONOResult = `0..1`
  } else {
    MONO = MONO_pinned_slider.value
    MONOResult = MONO
  }

  if (CASLSubsetControls.dataset.subsetType === "range") {
    CASLResult = `0..1`
  } else {
    CASL = CASL_pinned_slider.value
    CASLResult = CASL
  }

  if (slntSubsetControls.dataset.subsetType === "range") {
    slntResult = `-15..0`
  } else {
    slnt = slnt_pinned_slider.value
    slntResult = slnt
  }

  if (italSubsetControls.dataset.subsetType === "range") {
    italResult = `0..1`
  } else {
    ital = ital_pinned_slider.value
    italResult = ital
  }

  let languages = ""
  console.log(selectedLanguages.length)

  for (var language of selectedLanguages) {
    if (selectedLanguages.indexOf(language) === 0) {
      languages = "&subset="
        console.log(language)
        languages += `${language}`
      } else if (selectedLanguages.indexOf(language) >= 1) {
        languages += `,${language}`
    }
  }

  urlString = `https://fonts.sandbox.google.com/css2?family=<span class="code--bold">Recursive:ital,slnt,wght,CASL,MONO@${italResult},${slntResult},${wghtResult},${CASLResult},${MONOResult}</span>&display=swap${languages}`

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
});

document.getElementById("wght_subset__pinned").addEventListener('input', () => {
  wghtSubsetControls.dataset.subsetType = "pinned"
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
// ital subset type

const italSubsetControls = document.querySelector('#ital-control .subset-controls')

document.getElementById("ital_subset__range").addEventListener('input', () => {  
  italSubsetControls.dataset.subsetType = "range"
  setUrl()
});

document.getElementById("ital_subset__pinned").addEventListener('input', () => {
  italSubsetControls.dataset.subsetType = "pinned"
  setUrl()
});

// ital pinned slider

const ital_pinned_slider = document.querySelector("#ital--pinned__slider");
const ital_pinned_val = document.querySelector("#ital--pinned__label");
ital_pinned_val.innerHTML = ital_pinned_slider.value

ital_pinned_slider.addEventListener('input', (e) => {
  ital_pinned_val.innerHTML = e.target.value;
  setUrl()
});

// language subsetting

const languageControls = document.querySelectorAll('#languages input')

function checkSelectedLanguages() {
  selectedLanguages = []
  // check what Languages are selected
  for (var language of languageControls) {
    if (language.checked && language.name !== "latin-basic") {
      selectedLanguages.push(language.name)
    }
  }
  return selectedLanguages
}

function setLanguages() {
  selectedLanguages = checkSelectedLanguages()
  setUrl()
}

function addSubsetListeners() {
  for (var selector of languageControls) {
    selector.addEventListener('input', setLanguages)
  }
}

addSubsetListeners()


console.log(languageControls)
console.log(checkSelectedLanguages())



// cue URL

setUrl()



