var world, timestep = 1/60;
var scene, camera, renderer, control, raycaster, mouse, lights=[];
var objAry = [];

initWorld();
initScene();
render();

//texture loader
var textureLoader = new THREE.TextureLoader();

//textures and materials
var baseMaterial = new THREE.MeshBasicMaterial({
	color: 0x111111
});

var floorTexture = textureLoader.load('img/table.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(50, 50);

var popBoxTexture = textureLoader.load('img/popbox.png');
var popBottomTexture = textureLoader.load('img/popbottom.png');
var popTopTexture = textureLoader.load('img/poptop.png');
var popcornTexture = textureLoader.load('img/popcorn.png');
var textTexture = textureLoader.load('img/poptext.png');
var glassTexture = textureLoader.load('img/glass.png');
var dvdCoverTexture = textureLoader.load('img/dvdcover.png');

var textMaterial = new THREE.MeshPhongMaterial( {map: textTexture, emissive: 0x466676, side:THREE.DoubleSide } );
textMaterial.transparent = true;

var glassMaterial = new THREE.MeshPhongMaterial( {map: glassTexture, emissive: 0x466676, side:THREE.DoubleSide } );
glassMaterial.transparent = true;

var floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture, side: THREE.DoubleSide});
var popBoxMaterial = new THREE.MeshPhongMaterial({map: popBoxTexture, emissive: 0x072534});
var popBottomMaterial = new THREE.MeshPhongMaterial({map: popBottomTexture, emissive: 0x072534,side: THREE.DoubleSide});
var popTopMaterial = new THREE.MeshPhongMaterial({map: popTopTexture, emissive: 0x072534,side: THREE.DoubleSide});
var popcornMaterial = new THREE.MeshBasicMaterial({map: popcornTexture});
var dvdCoverMaterial = new THREE.MeshPhongMaterial({map: dvdCoverTexture});

var popBoxAllMaterials = [popBoxMaterial, popBoxMaterial, popTopMaterial, popBoxMaterial, popBoxMaterial, popBoxMaterial];
var popBoxFaceMaterial = new THREE.MeshFaceMaterial( popBoxAllMaterials );

var dvdAllMaterials = [baseMaterial, baseMaterial, dvdCoverMaterial, baseMaterial, baseMaterial, baseMaterial];
var dvdFaceMaterial = new THREE.MeshFaceMaterial( dvdAllMaterials );

//text and image on box
var text = new THREE.Mesh(
		new THREE.PlaneGeometry(10,10),
		textMaterial
	);
text.position.set(0,7,5.6);
scene.add( text );

//cup
var loader = new THREE.ObjectLoader();
loader.load('models/cup.json', function (obj) {
	obj.position.set(20,5,-15);
	obj.scale.set(3,5,3);
	scene.add(obj);
});

var floor = new Floor({
	material:floorMaterial
});

//dvd box
var dvd = new Box({
	mass: 0,
	size: {x:10, y:1.5, z:14},
	position: {x:20, y:0.5, z:3},
	material: dvdFaceMaterial
});

var box = new THREE.Object3D();
box.name = 'box';
var front = new Box({
	parent: box,
	mass: 0,
	size: {x:10, y:13, z:1},
	position: {x:0, y:6.5, z:-5},
	material: popBoxFaceMaterial
});
var back = new Box({
	parent: box,
	mass: 0,
	size: {x:10, y:13, z:1},
	position: {x:0, y:6.5, z:5},
	material: glassMaterial
});
var left = new Box({
	parent: box,
	mass: 0,
	size: {x:1, y:13, z:11},
	position: {x:5.5, y:6.5, z:0},
	material: popBoxFaceMaterial
});
var right = new Box({
	parent: box,
	mass: 0,
	size: {x:1, y:13, z:11},
	position: {x:-5.5, y:6.5, z:0},
	material: popBoxFaceMaterial
});
var bottom = new Box({
	parent: box,
	mass: 0,
	size: {x:11, y:1, z:10},
	position: {x:0, y:0.5, z:0.5},
	material: popBottomMaterial
});

lights[1].position.set(25, 100, 25);
camera.position.set(10, 20, 20);

var balls = new THREE.Object3D();
var cubes = new THREE.Object3D();
scene.add(balls, cubes, box);

window.addEventListener('click', function (e) {
	mouse.x = e.clientX / window.innerWidth * 2 - 1;
	mouse.y = - e.clientY / window.innerHeight * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(box.children);
	if (intersects[0]) {
		point = intersects[0].point;
		var size = 1.5;
		if (point.y <= 2) point.y += size / 2;
		var popcorn = new Box({
			parent:cubes,
			mass:1,
			size:{x:size, y:size, z:size},
			position:{x:point.x, y:point.y, z:point.z},
			material:popcornMaterial
		});
	}
});
