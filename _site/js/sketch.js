cubify("recursive");

let noLerp = false;
let originalInnerWidth = window.innerWidth;
let originalInnerHeight = window.innerHeight;

function cubify(inputString) {
	let str = inputString;
	let strArr = str.split("");
	let numLetters = str.length / 2;
	const boxWidth = 50;

	const slntMin = 0;
	const slntMax = -15;
	const wghtMin = 300;
	const wghtMax = 1000;
	const caslMin = 0;
	const caslMax = 1;

	const mouse = new THREE.Vector2();

	const lim = 0;
	const limFade = 200;

	let mouseMoved = 0;
	let mouseIsDown = false;

	var x = [];
	var y = [];
	var z = [];

	let posX, posY, posZ;

	let a = true;
	let b = true;
	let c = false;
	let d = false;
	let top = true;
	let bottom = false;

	let tint, dist;

	let aFade, bFade, cFade, dFade, topFade, bottomFade;

	let frustumSize = -450;

	const viewer = {
		// variables
		camera: false,
		controls: false,
		scene: false,
		renderer: false,
		container: false,
		textlabels: [],

		onMouseDown: function(event) {
			mouseMoved = 1;
		},

		onReady: function() {
			this.scene = new THREE.Scene();
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(originalInnerWidth, originalInnerHeight);

			this.container.appendChild(this.renderer.domElement);

			//
			this.camera = new THREE.OrthographicCamera(
				originalInnerWidth / -50,
				originalInnerWidth / 50,
				(originalInnerHeight - 200) / 50,
				(originalInnerHeight - 200) / -50,
				-500,
				0
			);

			this.camera.position.x = originalInnerWidth / 2;
			this.camera.position.y = originalInnerHeight / 2;
			this.camera.position.z = 750;

			if (originalInnerWidth < 960) {
				this.camera.zoom = 0.0002 * originalInnerWidth;
			} else {
				this.camera.zoom = 0.0002 * originalInnerHeight;
			}

			this.camera.aspect = originalInnerWidth / originalInnerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(originalInnerWidth, originalInnerHeight);

			this.controls = new THREE.OrbitControls(
				this.camera,
				this.renderer.domElement
			);
			this.controls.enableDamping = true;
			this.controls.dampingFactor = 0.25;
			this.controls.enableZoom = false;
			// this.controls.enableZoom = true;
			this.controls.enablePan = false;
			this.controls.enableKeys = false;
			this.controls.rotateSpeed = 0.4;

			// world
			var geometry = new THREE.BufferGeometry();
			var vertices = [];

			for (var i = 0; i < numLetters; i++) {
				x[i] = ((boxWidth * 2) / (numLetters - 1)) * i - boxWidth;
				y[i] = ((boxWidth * 2) / (numLetters - 1)) * i - boxWidth;
				z[i] = ((boxWidth * 2) / (numLetters - 1)) * i - boxWidth;
			}
			for (var i = 0; i < numLetters; i++) {
				for (var j = 0; j < numLetters; j++) {
					for (var k = 0; k < numLetters; k++) {
						if (
							i == 0 ||
							j == 0 ||
							k == 0 ||
							i == 4 ||
							j == 4 ||
							k == 4
						) {
							vertices.push({
								x: x[i],
								y: y[j],
								z: z[k],
								wght: mapRange(
									k,
									0,
									numLetters,
									wghtMin,
									wghtMax
								),
								casl: mapRange(
									j,
									0,
									numLetters,
									caslMin,
									caslMax
								),
								slnt: mapRange(
									i,
									0,
									numLetters,
									slntMin,
									slntMax
								),
								display: 1
							});
						} else if (i == 2 && j == 2 && k == 2) {
							vertices.push({
								x: x[i],
								y: y[j],
								z: z[k],
								wght: 400,
								casl: 1,
								slnt: 0,
								display: 1
							});
						} else {
							vertices.push({
								x: x[i],
								y: y[j],
								z: z[k],
								wght: mapRange(
									k,
									0,
									numLetters,
									wghtMin,
									wghtMax
								),
								casl: mapRange(
									j,
									0,
									numLetters,
									caslMin,
									caslMax
								),
								slnt: mapRange(
									i,
									0,
									numLetters,
									slntMin,
									slntMax
								),
								display: 0,
								line: true
							});
						}
					}
				}
			}

			let half = (2 * Math.round(strArr.length / 2)) / 2;

			for (var i = 0; i < vertices.length; i++) {
				if (vertices[i].display == 1) {
					var material = new THREE.MeshBasicMaterial();
					var mesh = new THREE.Mesh(geometry, material);
					mesh.position.x = vertices[i].x;
					mesh.position.y = vertices[i].y;
					mesh.position.z = vertices[i].z;

					var text = this._createTextLabel();
					let letterClass = "d-none-2";

					text.element.style.fontVariationSettings =
						"'MONO'" +
						1 +
						", 'wght'" +
						vertices[i].wght +
						", 'CASL'" +
						vertices[i].casl +
						", 'slnt'" +
						vertices[i].slnt +
						", 'ital' 0";

					if (
						i.between(20, 24, true) ||
						i.between(45, 49, true) ||
						i.between(70, 74, true) ||
						i.between(95, 99, true) ||
						i.between(120, 124, true)
					) {
						letterClass += " top";
					}
					if (
						i.between(100, 104, true) ||
						i.between(75, 79, true) ||
						i.between(50, 54, true) ||
						i.between(25, 29, true) ||
						i.between(0, 4, true)
					) {
						letterClass += " bottom";
					}
					if (i % 5 == 4) {
						letterClass += " sideA";
					}
					if (i.between(100, 124, true)) {
						letterClass += " sideB";
					}
					if (i % 5 == 0) {
						letterClass += " sideC";
					}
					if (i.between(0, 24, true)) {
						letterClass += " sideD";
					}

					if (i < Math.pow(half, 2)) {
						if (i % half == i % half) {
							text.setHTML(
								"<span data-index='" +
									i +
									"' class='" +
									letterClass +
									"'>" +
									strArr[half - 1 - (i % half)] +
									"&#8203;</span>"
							);
						}
					} else if (i < 2 * Math.pow(half, 2)) {
						if (i % half == i % half) {
							text.setHTML(
								"<span data-index='" +
									i +
									"' class='" +
									letterClass +
									"'>" +
									strArr[half - (i % half)] +
									"&#8203;</span>"
							);
						}
					} else if (i < 3 * Math.pow(half, 2)) {
						if (i % half == i % half) {
							text.setHTML(
								"<span data-index='" +
									i +
									"' class='" +
									letterClass +
									"'>" +
									strArr[half + 1 - (i % half)] +
									"&#8203;</span>"
							);
						}
					} else if (i < 4 * Math.pow(half, 2)) {
						if (i % half == i % half) {
							text.setHTML(
								"<span data-index='" +
									i +
									"' class='" +
									letterClass +
									"'>" +
									strArr[half + 2 - (i % half)] +
									"&#8203;</span>"
							);
						}
					} else if (i < 5 * Math.pow(half, 2)) {
						if (i % half == i % half) {
							text.setHTML(
								"<span data-index='" +
									i +
									"' class='" +
									letterClass +
									"'>" +
									strArr[half + 3 - (i % half)] +
									"&#8203;</span>"
							);
						}
					}

					if (i == 124) {
						text.setHTML(
							"<span id='blinkingSpan' class='top sideA sideB'>" +
								strArr[half + 3 - (i % half)] +
								"&#8203;</span>"
						);
					}

					if (i == 62) {
						text.setHTML("<span></span>");
					}

					text.setParent(mesh);
					this.textlabels.push(text);

					this.container.appendChild(text.fragment);
				}
			}

			var _this = this;
			var animate = function() {
				if (mouseMoved == 1) {
					mouseMoved = 0;
				}
				if (!noLerp) {
					_this.camera.position.x = lerp(
						_this.camera.position.x,
						750,
						0.3
					);
					_this.camera.position.y = lerp(
						_this.camera.position.y,
						750,
						0.3
					);
					_this.camera.position.z = lerp(
						_this.camera.position.z,
						750,
						0.3
					);
				}

				posX = _this.camera.position.x;
				posY = _this.camera.position.y;
				posZ = _this.camera.position.z;

				if (posY < -lim) {
					bottom = true;
				} else {
					bottom = false;
				}
				if (posY > lim) {
					top = true;
				} else {
					top = false;
				}
				if (posX > lim) {
					b = true;
				} else {
					b = false;
				}
				if (posX < -lim) {
					d = true;
				} else {
					d = false;
				}
				if (posZ > lim) {
					a = true;
				} else {
					a = false;
				}
				if (posZ < -lim) {
					c = true;
				} else {
					c = false;
				}

				if (posY < -limFade) {
					bottomFade = false;
				} else {
					bottomFade = true;
				}
				if (posY > limFade) {
					topFade = false;
				} else {
					topFade = true;
				}
				if (posX > limFade) {
					bFade = false;
				} else {
					bFade = true;
				}
				if (posX < -limFade) {
					dFade = false;
				} else {
					dFade = true;
				}
				if (posZ > limFade) {
					aFade = false;
				} else {
					aFade = true;
				}
				if (posZ < -limFade) {
					cFade = false;
				} else {
					cFade = true;
				}

				requestAnimationFrame(animate);

				_this.controls.update();
				_this._render();
			};
			animate();
		},

		onResize: function() {
			this.camera.aspect = window.innerHeight / (window.innerHeight - 0); // was 200
			this.camera.updateProjectionMatrix();
		},

		_render: function() {
			const letterElements = document.querySelectorAll(".text-label");
			for (var i = 0; i < this.textlabels.length; i++) {
				this.textlabels[i].updatePosition();
			}

			for (const letter of letterElements) {
				const letterContains = letter.firstElementChild.classList;
				if (
					(letterContains.contains("sideA") && !aFade) ||
					(letterContains.contains("sideB") && !bFade) ||
					(letterContains.contains("sideC") && !cFade) ||
					(letterContains.contains("sideD") && !dFade) ||
					(letterContains.contains("top") && !topFade) ||
					(letterContains.contains("bottom") && !bottomFade)
				) {
					letterContains.remove("d-none-2");
				} else {
					letterContains.add("d-none-2");
				}
			}
			this.renderer.render(this.scene, this.camera);
		},

		_createTextLabel: function() {
			const fragment = new DocumentFragment();
			var textLabelEl = document.createElement("div");
			textLabelEl.className = "text-label loaded";
			textLabelEl.innerHTML = " ";
			fragment.appendChild(textLabelEl);
			var _this = this;

			return {
				element: textLabelEl,
				fragment,
				parent: false,
				position: new THREE.Vector3(0, 0, 0),
				setHTML: function(html) {
					this.element.innerHTML = html;
				},
				setParent: function(threejsobj) {
					this.parent = threejsobj;
				},
				updatePosition: function() {
					if (parent) {
						this.position.copy(this.parent.position);
					}
					var coords2d = this.get2DCoords(
						this.position,
						_this.camera
					);

					this.element.style.setProperty("--posX", `${coords2d.x}px`);
					this.element.style.setProperty("--posY", `${coords2d.y}px`);

					dist = countDistanceToCamera(
						this.parent.position,
						_this.camera.position
					);
					tint = interpolate(dist, 1250, 1350, 255, 0);

					this.element.style.setProperty("--text-tint", tint);
				},
				get2DCoords: function(position, camera) {
					var vector = position.project(camera);
					vector.x = ((vector.x + 1) / 2) * originalInnerWidth;
					vector.y =
						(-(vector.y - 1) / 2) * (originalInnerHeight - 200);
					return vector;
				}
			};
		}
	};

	viewer.container = document.getElementById("THREE");

	let animateTimeout = null;

	const animate = () => {
		viewer.onReady();
		document.getElementsByClassName("lines")[0].style.opacity = "1";
		clearTimeout(animateTimeout);
	};
	// Consider requestAnimationFrame here, but then the intro animation doesn't work properly.
	animateTimeout = setTimeout(animate, 1000);

	let lerpTimeoput = null;

	const lerpFn = () => {
		noLerp = true;
		document.getElementById("THREE").style.pointerEvents = "auto";

		clearTimeout(lerpTimeoput);
	};

	lerpTimeout = setTimeout(lerpFn, 4000);

	window.addEventListener(
		"resize",
		function() {
			viewer.onResize();
		},
		false
	);

	window.addEventListener(
		"mousedown",
		function(e) {
			viewer.onMouseDown(e);
		},
		false
	);
}

function countDistanceToCamera(obj, cam) {
	var a = new THREE.Vector3(obj.x, obj.y, obj.z);

	//no arguments; will be initialised to (0, 0, 0)
	var b = new THREE.Vector3(cam.x, cam.y, cam.z);

	return a.distanceTo(b);
}

function mapRange(value, low1, high1, low2, high2) {
	return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

// Stephens Function for the above
function interpolate(min, max, t) {
	return (max - min) * t + min;
}

// Distinguish between clicking for typing and dragging for moving
let element = document.getElementById("THREE");
let moved;
let downListener = () => {
	moved = false;
	mouseIsDown = true;
	document.getElementsByClassName("lines")[0].style.opacity = "0";
};
element.onmousedown = downListener;
element.ontouchstart = downListener;
let moveListener = () => {
	moved = true;
};
element.onmousemove = moveListener;
let upListener = () => {
	if (moved) {
		// moved
	} else {
		// not moved
		noLerp = false;
		document.getElementById("textInput").focus();
		for (let letterElement of document.querySelectorAll(
			".text-label span"
		)) {
			letterElement.innerHTML = "r&#8203;";
		}
		document.getElementById("THREE").classList.add("blink");
	}
};
element.onmouseup = upListener;

element.removeEventListener("mousedown", downListener);
element.removeEventListener("mousemove", moveListener);
element.removeEventListener("mouseup", upListener);

function changeString() {
	str = document.getElementById("textInput").value + "&#8203;";
	noLerp = true;
	document.getElementById("THREE").classList.remove("blink");
	document.getElementById("textInput").value = "";
	for (let letterElement of document.querySelectorAll(".text-label span")) {
		letterElement.innerHTML = str;
	}
}

function lerp(start, end, t) {
	return start * (1 - t) + end * t;
}

Number.prototype.between = function(a, b, inclusive) {
	var min = Math.min.apply(Math, [a, b]),
		max = Math.max.apply(Math, [a, b]);
	return inclusive ? this >= min && this <= max : this > min && this < max;
};
