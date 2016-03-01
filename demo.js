var world, timestep = 1/60;
var scene, camera, renderer, control, raycaster, mouse;
var objAry = [];

initWorld();
initScene();
render();

var material = new THREE.MeshPhongMaterial({
	color: 0x156289,
	emissive: 0x072534,
	side: THREE.DoubleSide,
	shading: THREE.FlatShading
});

var floor = new Floor({
	world:world,
	scene:scene,
	material:material
});

window.addEventListener('click', function (e) {
	mouse.x = e.clientX / window.innerWidth * 2 - 1;
	mouse.y = - e.clientY / window.innerHeight * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects([scene.getObjectByName('floor')]);
	var point = intersects[0].point;
	if (Math.random() < 0.5) {
		var cube = new Box({
			world:world,
			scene:scene,
			mass:1,
			size:{x:1, y:1, z:1},
			position:{x:point.x, y:1, z:point.z},
			material:material
		});
	} else {
		var sphere = new Sphere({
			world:world,
			scene:scene,
			mass:1,
			radius:0.5,
			position:{x:point.x, y:1, z:point.z},
			material:material
		});
	}
});
