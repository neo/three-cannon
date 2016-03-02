var world, timestep = 1/60;
var scene, camera, renderer, control, raycaster, mouse, lights=[];
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
	material:material
});

var boxMaterial = new THREE.MeshPhongMaterial({
	color: 0xff5252
});

var box = new THREE.Object3D();
box.name = 'box';
var front = new Box({
	parent: box,
	mass: 0,
	size: {x:20, y:20, z: 2},
	position: {x:1, y:12, z:10},
	material: boxMaterial
});
var back = new Box({
	parent: box,
	mass: 0,
	size: {x:20, y:20, z: 2},
	position: {x:-1, y:12, z:-10},
	material: boxMaterial
});
var left = new Box({
	parent: box,
	mass: 0,
	size: {x:2, y:20, z: 20},
	position: {x:-10, y:12, z:1},
	material: boxMaterial
});
var right = new Box({
	parent: box,
	mass: 0,
	size: {x:2, y:20, z: 20},
	position: {x:10, y:12, z:-1},
	material: boxMaterial
});
var bottom = new Box({
	parent: box,
	mass: 0,
	size: {x:22, y:2, z:22},
	position: {x:0, y:1, z:0},
	material: boxMaterial
});

lights[1].position.set(25, 100, 25);
camera.position.set(5, 50, 10);

var balls = new THREE.Object3D();
var cubes = new THREE.Object3D();
scene.add(balls, cubes, box);

window.addEventListener('click', function (e) {
	mouse.x = e.clientX / window.innerWidth * 2 - 1;
	mouse.y = - e.clientY / window.innerHeight * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects([scene.getObjectByName('floor')]);
	var point = intersects[0].point;
	var boxIntersects = raycaster.intersectObjects(box.children);
	if (boxIntersects[0]) point = boxIntersects[0].point;
	if (Math.random() < 0.5) {
		var cube = new Box({
			parent:cubes,
			mass:1,
			size:{x:1, y:1, z:1},
			position:{x:point.x, y:point.y, z:point.z},
			material:material
		});
	} else {
		var sphere = new Sphere({
			parent:balls,
			mass:1,
			radius:0.5,
			position:{x:point.x, y:point.y, z:point.z},
			material:material
		});
	}
});
