var app;
var overlay;
var pendingResources = {};

var x = 0;
var y = 0;

var a = 0;
var b = 0;

var down = false;

// App constructor
var App = function(canvas) {


	// set a pointer to our canvas
	this.canvas = canvas;
	//this.minimap = minimap;
	var theApp = this;
	
	this.gl = canvas.getContext("experimental-webgl");
	if (this.gl == null) {
		alert( ">>> Browser does not support WebGL <<<" );
		return;
	}

	this.scene = new Scene(this.gl, 1);
	//this.mscene = new Scene(this.gl, 1);

	// set the initial canvas size and viewport
	this.canvas.width = this.canvas.clientWidth;
	this.canvas.height = this.canvas.clientHeight;

	this.scene.camera.setAspectRatio(this.canvas.clientWidth /this.canvas.clientHeight );
	//this.scene.camera.setAspectRatio(this.minimap.clientWidth /this.minimap.clientHeight );

	this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	

	

	
	this.keysPressed = {};
	document.onkeydown = function(event){
		theApp.keysPressed[keyboardMap[event.keyCode]] = true;
		
	}
	document.onkeyup = function(event){
		theApp.keysPressed[keyboardMap[event.keyCode]] = false;
		engine = false;
		bottomEngine = false;
		rightEngine = false;
		leftEngine = false;

	}
	document.onclick = function(event) {

		x = event.clientX;   // Get the horizontal coordinate
		y= event.clientY; 

		motion = true;

	};
	// document.onmousemove = function(event) {
	// 	if(down && captured){
	// 	a = event.clientX;   // Get the horizontal coordinate
	// 	b = event.clientY; 

	// 	}

	// };
	document.onmousedown = function(event) {
		down = true;
		a = event.clientX;
		b = event.clientY;

		//console.log(a + "," + b);
	};
	document.onmouseup = function(event) {
		down = false;
	};



	window.addEventListener('resize', function() {
	  theApp.canvas.width = this.canvas.clientWidth;
	  theApp.canvas.height = this.canvas.clientHeight;

	  theApp.gl.viewport(0, 0,this.canvas.width, this.canvas.height);
	  theApp.scene.camera.setAspectRatio(this.canvas.clientWidth /this.canvas.clientHeight );

});


}

// animation frame update
App.prototype.update = function() {

	
	var pendingResourceNames = Object.keys(pendingResources);
	if(pendingResourceNames.length === 0) {

		this.scene.update(this.gl, this.keysPressed, this.canvas, this.minimap);
		
		//overlay.innerHTML = "Ready.";
	} else {
		//overlay.innerHTML = "Loading: " + pendingResourceNames;
	}

	// refresh
	window.requestAnimationFrame(function() {
		app.update();
	});
}

// entry point from HTML
window.addEventListener('load', function() {

	var canvas = document.getElementById("canvas");
	

	//var minimap = document.getElementById("minimap");

	// overlay = document.getElementById("overlay");
	// overlay.innerHTML = "WebGL";

	app = new App(canvas);

	window.requestAnimationFrame(function() {
		app.update();
	});


});