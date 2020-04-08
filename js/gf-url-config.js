// sloppy way to combine a script without a proper package.json setup? :|
// https://raw.githubusercontent.com/willmcpo/body-scroll-lock/master/lib/bodyScrollLock.js

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.bodyScrollLock = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  // Older browsers don't support event options, feature detect it.

  // Adopted and modified solution from Bohdan Didukh (2017)
  // https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

  var hasPassiveEvents = false;
  if (typeof window !== 'undefined') {
    var passiveTestOptions = {
      get passive() {
        hasPassiveEvents = true;
        return undefined;
      }
    };
    window.addEventListener('testPassive', null, passiveTestOptions);
    window.removeEventListener('testPassive', null, passiveTestOptions);
  }

  var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


  var locks = [];
  var documentListenerAdded = false;
  var initialClientY = -1;
  var previousBodyOverflowSetting = void 0;
  var previousBodyPaddingRight = void 0;

  // returns true if `el` should be allowed to receive touchmove events.
  var allowTouchMove = function allowTouchMove(el) {
    return locks.some(function (lock) {
      if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
        return true;
      }

      return false;
    });
  };

  var preventDefault = function preventDefault(rawEvent) {
    var e = rawEvent || window.event;

    // For the case whereby consumers adds a touchmove event listener to document.
    // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
    // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
    // the touchmove event on document will break.
    if (allowTouchMove(e.target)) {
      return true;
    }

    // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
    if (e.touches.length > 1) return true;

    if (e.preventDefault) e.preventDefault();

    return false;
  };

  var setOverflowHidden = function setOverflowHidden(options) {
    // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
    // the responsiveness for some reason. Setting within a setTimeout fixes this.
    setTimeout(function () {
      // If previousBodyPaddingRight is already set, don't set it again.
      if (previousBodyPaddingRight === undefined) {
        var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
        var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

        if (_reserveScrollBarGap && scrollBarGap > 0) {
          previousBodyPaddingRight = document.body.style.paddingRight;
          document.body.style.paddingRight = scrollBarGap + 'px';
        }
      }

      // If previousBodyOverflowSetting is already set, don't set it again.
      if (previousBodyOverflowSetting === undefined) {
        previousBodyOverflowSetting = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
    });
  };

  var restoreOverflowSetting = function restoreOverflowSetting() {
    // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
    // the responsiveness for some reason. Setting within a setTimeout fixes this.
    setTimeout(function () {
      if (previousBodyPaddingRight !== undefined) {
        document.body.style.paddingRight = previousBodyPaddingRight;

        // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
        // can be set again.
        previousBodyPaddingRight = undefined;
      }

      if (previousBodyOverflowSetting !== undefined) {
        document.body.style.overflow = previousBodyOverflowSetting;

        // Restore previousBodyOverflowSetting to undefined
        // so setOverflowHidden knows it can be set again.
        previousBodyOverflowSetting = undefined;
      }
    });
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
  var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
    return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
  };

  var handleScroll = function handleScroll(event, targetElement) {
    var clientY = event.targetTouches[0].clientY - initialClientY;

    if (allowTouchMove(event.target)) {
      return false;
    }

    if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
      // element is at the top of its scroll.
      return preventDefault(event);
    }

    if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
      // element is at the bottom of its scroll.
      return preventDefault(event);
    }

    event.stopPropagation();
    return true;
  };

  var disableBodyScroll = exports.disableBodyScroll = function disableBodyScroll(targetElement, options) {
    if (isIosDevice) {
      // targetElement must be provided, and disableBodyScroll must not have been
      // called on this targetElement before.
      if (!targetElement) {
        // eslint-disable-next-line no-console
        console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
        return;
      }

      if (targetElement && !locks.some(function (lock) {
        return lock.targetElement === targetElement;
      })) {
        var lock = {
          targetElement: targetElement,
          options: options || {}
        };

        locks = [].concat(_toConsumableArray(locks), [lock]);

        targetElement.ontouchstart = function (event) {
          if (event.targetTouches.length === 1) {
            // detect single touch.
            initialClientY = event.targetTouches[0].clientY;
          }
        };
        targetElement.ontouchmove = function (event) {
          if (event.targetTouches.length === 1) {
            // detect single touch.
            handleScroll(event, targetElement);
          }
        };

        if (!documentListenerAdded) {
          document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
          documentListenerAdded = true;
        }
      }
    } else {
      setOverflowHidden(options);
      var _lock = {
        targetElement: targetElement,
        options: options || {}
      };

      locks = [].concat(_toConsumableArray(locks), [_lock]);
    }
  };

  var clearAllBodyScrollLocks = exports.clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
    if (isIosDevice) {
      // Clear all locks ontouchstart/ontouchmove handlers, and the references.
      locks.forEach(function (lock) {
        lock.targetElement.ontouchstart = null;
        lock.targetElement.ontouchmove = null;
      });

      if (documentListenerAdded) {
        document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
        documentListenerAdded = false;
      }

      locks = [];

      // Reset initial clientY.
      initialClientY = -1;
    } else {
      restoreOverflowSetting();
      locks = [];
    }
  };

  var enableBodyScroll = exports.enableBodyScroll = function enableBodyScroll(targetElement) {
    if (isIosDevice) {
      if (!targetElement) {
        // eslint-disable-next-line no-console
        console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
        return;
      }

      targetElement.ontouchstart = null;
      targetElement.ontouchmove = null;

      locks = locks.filter(function (lock) {
        return lock.targetElement !== targetElement;
      });

      if (documentListenerAdded && locks.length === 0) {
        document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);

        documentListenerAdded = false;
      }
    } else {
      locks = locks.filter(function (lock) {
        return lock.targetElement !== targetElement;
      });
      if (!locks.length) {
        restoreOverflowSetting();
      }
    }
  };
});


// ----------------------------------------------------
// my actual script


const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const targetElement = document.querySelector('.sidebar--main');


// open & close drawer with config controls


const getRecButton = document.querySelector("#get-rec-button");
const closeDrawerButton = document.querySelector("#close-sidebar");
const drawerScrim = document.querySelector("#sidebar--scrim");
const apiConfigDrawer = document.querySelector("#api-config-drawer");

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

  if (drawerIsOpen) {
    enableBodyScroll(targetElement);
  } else {
    disableBodyScroll(targetElement);
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

// ----------------------------------

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
  let CRSVResult = `0..1`


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

  if (CRSVSubsetControls.dataset.subsetType === "range") {
    CRSVResult = `0..1`
  } else {
    CRSV = CRSV_pinned_slider.value
    CRSVResult = CRSV
  }

  // let languages = ""
  // console.log(selectedLanguages.length)

  // for (var language of selectedLanguages) {
  //   if (selectedLanguages.indexOf(language) === 0) {
  //     languages = "&subset="
  //       console.log(language)
  //       languages += `${language}`
  //     } else if (selectedLanguages.indexOf(language) >= 1) {
  //       languages += `,${language}`
  //   }
  // }

  // urlString = `https://fonts.sandbox.google.com/css2?family=<span class="code--bold">Recursive:ital,slnt,wght,CASL,MONO@${italResult},${slntResult},${wghtResult},${CASLResult},${MONOResult}</span>&display=swap${languages}`
  let urlString = `https://fonts.sandbox.google.com/css2?family=<span class="code--bold">Recursive:slnt,wght,CASL,CRSV,MONO@${slntResult},${wghtResult},${CASLResult},${CRSVResult},${MONOResult}</span>&display=swap`

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


// console.log(languageControls)
// console.log(checkSelectedLanguages())



// cue URL

setUrl()



