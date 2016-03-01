var world, timestep = 1/60;
var scene, camera, renderer, control, raycaster, mouse;
var objAry = [];

initWorld();
initScene();
render();

var material = new THREE.MeshPhongMaterial({
	color: 0x156289,
	emissive: 0x072534,
	shininess: 60,
	side: THREE.DoubleSide,
	shading: THREE.FlatShading
});

var textureLoader = new THREE.TextureLoader();

var floorTexture = textureLoader.load('images/table.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(50, 50);

var popBoxTexture = textureLoader.load('images/popbox.png');
var popBottomTexture = textureLoader.load('images/popbottom.png');

var popcornTexture = textureLoader.load('images/popcorn.png');


var floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
var popboxMaterial = new THREE.MeshBasicMaterial({map: popBoxTexture, side: THREE.DoubleSide});
var popBottomMaterial = new THREE.MeshBasicMaterial({map: popBottomTexture, side: THREE.DoubleSide});
var popcornMaterial = new THREE.MeshBasicMaterial({map: popcornTexture});


var floor = new Floor({
	world:world,
	scene:scene,
	size:{x:10, y:10},
	material:floorMaterial
});

//popcorn box
var side1 = new Wall({
	world:world,
	scene:scene,
	mass:0,
	size:{x:10, y:13, z:1},
	position:{x:0, y:6.5, z:-5},
	material:popboxMaterial
},"side1");

var side2 = new Wall({
	world:world,
	scene:scene,
	mass:0,
	size:{x:10, y:13, z:1},
	position:{x:0, y:6.5, z:5},
	material:popboxMaterial
},"side2");

var side3 = new Wall({
	world:world,
	scene:scene,
	mass:0,
	size:{x:1, y:13, z:11},
	position:{x:5.5, y:6.5, z:0},
	material:popboxMaterial
},"side3");

var side4 = new Wall({
	world:world,
	scene:scene,
	mass:0,
	size:{x:1, y:13, z:11},
	position:{x:-5.5, y:6.5, z:0},
	material:popboxMaterial
},"side4");

var bottom = new Wall({
	world:world,
	scene:scene,
	mass:0,
	size:{x:10, y:1, z:10},
	position:{x:0, y:0.5, z:0},
	material:popBottomMaterial
},"side4");


window.addEventListener('click', function (e) {
	mouse.x = e.clientX / window.innerWidth * 2 - 1;
	mouse.y = - e.clientY / window.innerHeight * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects([scene.getObjectByName('floor')]);
	var point = intersects[0].point;
/*	if (Math.random() < 0.5) {*/
		var cube = new Box({
			world:world,
			scene:scene,
			mass:1,
			size:{x:1.5, y:1.5, z:1.5},
			position:{x:point.x, y:1, z:point.z},
			material:popcornMaterial
		});
	/*} else {
		var sphere = new Sphere({
			world:world,
			scene:scene,
			mass:1,
			radius:1,
			position:{x:point.x, y:1, z:point.z},
			material:popcornMaterial
		});*/
	//}
});
