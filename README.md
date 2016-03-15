#3D Physics

[Demo](http://neolwc.github.io/three-cannon/) -
[Demo in context](http://neolwc.github.io/three-cannon/popcorn.html)

![DEMO](demo.png)

##three-cannon

A plugin built to have
[three.js](https://github.com/mrdoob/three.js/)
and
[cannon.js](https://github.com/schteppe/cannon.js)
working together.

##Usage

###Initiation

```HTML
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>3D Physics</title>
	<style>
		body { margin: 0; overflow: hidden; }
		canvas { width: 100%; height: 100%; }
	</style>
</head>
<body>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r74/three.min.js"></script>
	<script src="vendor/OrbitControls.js"></script>
	<script src="three-cannon.js"></script>
	<script>
		var world, timestep = 1/60;
		var scene, camera, renderer, control, raycaster, mouse, lights=[];
		var objAry = [];

		initWorld();
		initScene();
		render();
	</script>
</body>
</html>
```

###Building

```JavaScript
var material = new THREE.MeshPhongMaterial({
	color: 0x156289,
	emissive: 0x072534,
	side: THREE.DoubleSide,
	shading: THREE.FlatShading
});

var box = new Box({
	parent: scene, // Optional, default is scene.
	mass: 0, // Optional, default is 0.
	position: {x:0, y:0, z:0}, // Optional, default is {x:0, y:0, z:0}.
	material: material, // Optional, default is new THREE.MeshNormalMaterial({side:THREE.DoubleSide}).
	size: {x:2, y:2, z:2} // Required, specific to the Box class.
});
```

##Contributing

Welcome to submit an issues, fork and create a pull request.
