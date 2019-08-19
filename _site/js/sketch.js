const str = "recursive";
const spaces = (str.length - 1)/2;

const slntMin = 0;
const slntMax = -15;
const wghtMin = 300;
const wghtMax = 900;
const xprnMin = 0;
const xprnMax = 1;

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
    this.camera.zoom = 0.25;
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
   

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor =  0.25;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.enableKeys = false;
    
    // console.log(this.zoom);
    
    // world
    var geometry = new THREE.BufferGeometry();
    var box = new THREE.BoxGeometry( 100, 100, 100, spaces, spaces, spaces )
    var vertices = box.vertices;
    console.log(vertices);
    var colors = new Float32Array( vertices.length * 3 );
    var positions = new Float32Array( vertices.length * 3 );
    var color = new THREE.Color();
    
    // var boxMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    
    // var cube = new THREE.Mesh( box, boxMaterial );
    // this.scene.add( cube );

    for (var i = 0, l = vertices.length; i < l; i ++) {
      
      vertex = vertices[ i ];
			vertex.toArray( positions, i * 3 );
      
      
      var material = new THREE.MeshBasicMaterial({
        color: "rgb(0%,0%,0%)"
      });
      
      color.setHSL( 0.01 + 0.1 * ( i / l ), 1.0, 0.5 );
			color.toArray( colors, i * 3 );

      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = vertices[i].x;
      mesh.position.y = vertices[i].y;
      mesh.position.z = vertices[i].z;
      
      
      
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      this.scene.add(mesh);
      
      var text = this._createTextLabel();
      
      var P1 =Math.pow((str.length/2) + 0.5, 2);
      
      let wght = mapRange(i, 0, vertices.length, wghtMin, wghtMax);
      let ital = mapRange(i, 0, vertices.length, wghtMin, wghtMax);
      let prop = mapRange(i, 0, vertices.length, wghtMin, wghtMax);
      let xprn = mapRange(i, 0, vertices.length, wghtMin, wghtMax);
      let style='font-variation-settings: "PROP" '+ prop +', "XPRN" '+ xprn +', "ital" '+ ital +', "CRSV" '+ wght +';'
      
      if (i < 26) {
        text.setHTML("<span style='color:red;'> </span>");
      } 
      else if (mesh.position.y < 0){
        text.setHTML("-y");
      } else if (mesh.position.z < 0){
        text.setHTML("-z");
      } 
      else {
        text.setHTML("+");
      }

      if (i<P1){
        if (i%5==0){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>r</span>"); //2nd
        } else if (i%5==1){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>s</span>");
        } else if (i%5==2){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>i</span>");
        } else if (i%5==3){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>v</span>");
        } else if (i%5==4){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>e</span>");
        } 
      } 
      else if(i<P1*2){
        if (i%5==0){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>r</span>"); //2nd
        } else if (i%5==1){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>u</span>");
        } else if (i%5==2){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>c</span>");
        } else if (i%5==3){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>e</span>");
        } else if (i%5==4){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>r</span>");
        } 
      } 
      else if(i<100){
        if (i==50){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>s</span>");
        } else if (i==51) {
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>i</span>");
        } else if (i==52){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>v</span>");
        } else if (i==53){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>r</span>");
        } else if (i==54){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>s</span>");
        } else if (i==55){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>i</span>");
        } else if (i==56){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>u</span>");
        } else if (i==57){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>r</span>");
        } else if (i==58){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>s</span>");
        } else if (i==59){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>c</span>");
        } else if (i==60){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>u</span>");
        } else if (i==61){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>r</span>");
        } else if (i==62){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>e</span>");
        } else if (i==63){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>c</span>");
        } else if (i==64){
          text.setHTML("<span style='"+ style +"font-weight:"+wght+"'>u</span>");
        } else if (i==65){
          text.setHTML("e");
        } else if (i==66){
          text.setHTML("c");
        } else if (i==67){
          text.setHTML("u");
        } else if (i==68){
          text.setHTML("c");
        } else if (i==69){
          text.setHTML("u");
        } else if (i==70){
          text.setHTML("r");
        } else if (i==71){
          text.setHTML("u");
        } else if (i==72){
          text.setHTML("r");
        } else if (i==73){
          text.setHTML("s");
        } else if (i==74){
          text.setHTML("r");
        } else if (i==75){
          text.setHTML("s");
        } else if (i==76){
          text.setHTML("i");
        } else if (i==77){
          text.setHTML("s");
        } else if (i==78){
          text.setHTML("<span style'font-weight:"+wght+"'>i</span>");
        } else if (i==79){
          text.setHTML("v");
        } else if (i==80){
          text.setHTML("e");
        } else if (i==81){
          text.setHTML("c");
        } else if (i==82){
          text.setHTML("u");
        } else if (i==83){
          text.setHTML("e");
        } else if (i==84){
          text.setHTML("c");
        } else if (i==85){
          text.setHTML("u");
        } else if (i==86){
          text.setHTML("e");
        } else if (i==87){
          text.setHTML("c");
        } else if (i==88){
          text.setHTML("<span style='font-weight:"+wght+"'>u</span>");
        } else if (i==89){
           
          text.setHTML("<span style='font-weight:"+wght+"'>v</span>");
        } else if (i==90){
          text.setHTML("<span style'font-weight:"+wght+"'>i</span>");
        } else if (i==91){
          text.setHTML("<span style='font-weight:"+wght+"'>s</span>");
        } else if (i==92){
          text.setHTML("<span style='font-weight:"+wght+"'>v</span>");
        } else if (i==93){
          text.setHTML("<span style='font-weight:"+wght+"'>i</span>");
        } else if (i==94){
          text.setHTML("<span style='font-weight:"+wght+"'>s</span>");
        } else if (i==95){
          text.setHTML("<span style='font-weight:"+wght+"'>v</span>");
        } else if (i==96){
          text.setHTML("<span style'font-weight:"+wght+"'>i</span>");
        } else if (i==97){
          text.setHTML("<span style='font-weight:"+wght+"'>s</span>");
        } 
      }
     
      
      // console.log(text);
      
      text.setParent(mesh);
      this.textlabels.push(text);
            this.container.appendChild(text.element);
    }
    
    //
    // animate
    //
    
    
    
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
    }
    this.renderer.render(this.scene, this.camera);
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
        return vector;
      }
    };
  }
};

viewer.container = document.getElementById('three');
viewer.onReady();
window.addEventListener('resize', function() {
  viewer.onResize();
  // console.log(viewer.camera)
}, false);



function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// Stephens Function for the above
function interpolate(min,max,t) {
  return (max - min) * t + min;
}