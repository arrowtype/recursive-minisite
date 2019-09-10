cubify("recursive");

function cubify(inputString){

let str = inputString;
let strArr = str.split('');
let numLetters = str.length/2;
const spaces = (str.length - 1)/2;
const boxWidth = 50;

const slntMin = 0;
const slntMax = -15;
const wghtMin = 300;
const wghtMax = 900;
const xprnMin = 0;
const xprnMax = 1;

var x = [];
var y = [];
var z = [];

const viewer = {

  // variables
  camera: false,
  controls: false,
  scene: false,
  renderer: false,
  container: false,
  textlabels: [],

  onReady: function() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.container.appendChild(this.renderer.domElement);


    this.camera = new THREE.OrthographicCamera( window.innerWidth / - 50, window.innerWidth / 50, window.innerHeight / 50, window.innerHeight / -50, - 500, 0);
    this.camera.position.x = 750;
    this.camera.position.y = -750;
    this.camera.position.z = 750;
    this.camera.near = -500;
    this.camera.far = 1000;
    this.camera.zoom = str.length/60 + 0.02;
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
   

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor =  0.25;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.enableKeys = false;
    
    // world
    var geometry = new THREE.BufferGeometry();
    var box = new THREE.BoxGeometry( boxWidth, boxWidth, boxWidth, spaces, spaces, spaces )
    var vertices = box.vertices;
    var vertices2 = [];
    var colors = new Float32Array( vertices.length * 3 );
    var positions = new Float32Array( vertices.length * 3 );
    var color = new THREE.Color();
    
    // var boxMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    
    // var cube = new THREE.Mesh( box, boxMaterial );
    // this.scene.add( cube );
    
    for (var i = 0; i < numLetters; i++) {
      x[i] = (boxWidth*2/(numLetters - 1)*i - boxWidth);
      y[i] = (boxWidth*2/(numLetters - 1)*i - boxWidth);
      z[i] = (boxWidth*2/(numLetters - 1)*i - boxWidth);
  }
      for (var i = 0; i < numLetters; i++) {
        for (var j = 0; j < numLetters; j++) {
          for (var k = 0; k < numLetters; k++) {
            vertices2.push({
              x: x[i],
              y: y[j],
              z: z[k], 
              wght: mapRange(k, 0, numLetters, wghtMin, wghtMax),
              xprn: mapRange(j, 0, numLetters, xprnMin, xprnMax),
              slnt: mapRange(i, 0, numLetters, slntMin, slntMax)
            })
          }
        }
      }

    let half = 2 * Math.round(strArr.length / 2)/2;
                

    for (var i = 0;i<vertices2.length; i++) {  
      
			var material = new THREE.MeshBasicMaterial();
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = vertices2[i].x;
      mesh.position.y = vertices2[i].y;
      mesh.position.z = vertices2[i].z;

      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      this.scene.add(mesh);

      var text = this._createTextLabel();

      // text.setHTML("x");
      text.element.style.fontVariationSettings = "'wght'" + vertices2[i].wght + ", 'XPRN'" + vertices2[i].xprn + ", 'slnt'" + vertices2[i].slnt;
      
      if (i<(Math.pow(half,2))){           
        if (i%half==i%half){text.setHTML(strArr[half-1-(i%half)]);}
      } else if (i<2*(Math.pow(half,2))){       
        if (i%half==i%half){text.setHTML(strArr[half-(i%half)]);}
      } else if (i<3*(Math.pow(half,2))){       
        if (i%half==i%half){text.setHTML(strArr[half+1-(i%half)]);}
      } else if (i<4*(Math.pow(half,2))){       
        if (i%half==i%half){text.setHTML(strArr[half+2-(i%half)]);}
      } else if (i<5*(Math.pow(half,2))){       
        if (i%half==i%half){text.setHTML(strArr[half+3-(i%half)]);}
      } 

      text.setParent(mesh);
      this.textlabels.push(text);
      this.container.appendChild(text.element);
    }
    
    var _this = this;
    var animate = function() {
      requestAnimationFrame(animate);
      _this.controls.update();
      _this._render();
    }
    animate();
  },
  
  onResize: function() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  },
  
  
  
  _render: function() {
    for(var i=0; i<this.textlabels.length; i++) {
      this.textlabels[i].updatePosition();
      // console.log(this.textlabels[i].position);
    }
    this.renderer.render(this.scene, this.camera);
    // console.log(this.camera);
  },
  
  _createTextLabel: function() {
    var div = document.createElement('div');
    
   
  // root.style.setProperty('--w', wght );
    
    div.className = 'text-label';
    div.style.position = 'absolute';
    div.style.width = 100;
    div.style.height = 100;
    div.innerHTML = " ";
    div.style.top = -1000;
    div.style.left = -1000;
    // div.style.fontWeight = wght;
    
    var _this = this;
    
    return {
      element: div,
      parent: false,
      position: new THREE.Vector3(0,0,0),
      setHTML: function(html) {
        this.element.innerHTML = html;
      },
      setParent: function(threejsobj) {
        this.parent = threejsobj;
      },
      updatePosition: function() {
        if(parent) {
          this.position.copy(this.parent.position);
        }
        
        var coords2d = this.get2DCoords(this.position, _this.camera);
        this.element.style.left = coords2d.x + 'px';
        this.element.style.top = coords2d.y + 'px';
      },
      get2DCoords: function(position, camera) {
        var vector = position.project(camera);
        vector.x = (vector.x + 1)/2 * window.innerWidth;
        vector.y = -(vector.y - 1)/2 * window.innerHeight;
        // console.log(vector);
        return vector;
      }
    };
  }
};

viewer.container = document.getElementById('THREE');
viewer.onReady();
window.addEventListener('resize', function() {
  viewer.onResize();
}, false);

}

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// Stephens Function for the above
function interpolate(min,max,t) {
  return (max - min) * t + min;
}

// Distinguish between clicking for typing and dragging for moving
let element = document.getElementById("THREE");
let moved;
let downListener = () => { moved = false }
element.onmousedown = downListener;
let moveListener = () => { moved = true }
element.onmousemove = moveListener;
let upListener = () => {
    if (moved) {
        // moved
    } else {
        // not moved
        document.getElementById("textInput").focus();
    }
}
element.onmouseup = upListener;

element.removeEventListener('mousedown', downListener)
element.removeEventListener('mousemove', moveListener)
element.removeEventListener('mouseup', upListener)


// }

function changeString(){
  str = document.getElementById("textInput").value;
  // document.getElementsByTagName("canvas")[0].parentNode.removeChild(document.getElementsByTagName("canvas")[0]);
  document.getElementById("THREE").innerHTML = '';
  cubify(str);
}

document.getElementById("textInput").oninput = function(){
  let key = document.getElementById("textInput").value;
  document.getElementById("textInput").value = '';
  let str = key + key + key + key + key + key + key + key + key;
  console.log(str);
  console.log(key*9);
  document.getElementById("textInput").value = str;
}