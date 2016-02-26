var objAry = [];

function Obj3d (obj, shape, geometry) {
	this.shape = shape;
	this.geometry = geometry;
	this.body = new CANNON.Body({
		position:obj.position || {x:0, y:0, z:0},
		mass:obj.mass || 0,
		shape:this.shape
	});
	this.mesh = new THREE.Mesh(this.geometry, obj.material || new THREE.MeshNormalMaterial({side:THREE.DoubleSide}));
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
	obj.world.add(this.body);
	obj.scene.add(this.mesh);
	this.update = function () {
		this.mesh.position.copy(this.body.position);
		this.mesh.quaternion.copy(this.body.quaternion);
	}
	objAry.push(this);
}

function Sphere (obj) {
	this.shape = new CANNON.Sphere(obj.radius);
	this.geometry = new THREE.SphereGeometry(obj.radius, 64, 64);
	Obj3d.call(this, obj, this.shape, this.geometry);
}

function Box (obj) {
	this.shape = new CANNON.Box(new CANNON.Vec3(obj.size.x/2, obj.size.y/2, obj.size.z/2));
	this.body = new CANNON.Body({
		position:obj.position || {x:0, y:0, z:0},
		mass:obj.mass || 0,
		shape:this.shape
	});
	this.geometry = new THREE.BoxGeometry(obj.size.x, obj.size.y, obj.size.z);
	this.mesh = new THREE.Mesh(this.geometry, obj.material || new THREE.MeshNormalMaterial({side:THREE.DoubleSide}));
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
	obj.world.add(this.body);
	obj.scene.add(this.mesh);
	this.update = function () {
		this.mesh.position.copy(this.body.position);
		this.mesh.quaternion.copy(this.body.quaternion);
	}
	objAry.push(this);
}

function Plane (obj) {
	this.shape = new CANNON.Plane();
	this.body = new CANNON.Body({
		position:obj.position || {x:0, y:0, z:0},
		mass:obj.mass || 0,
		shape:this.shape
	});
	this.geometry = new THREE.PlaneGeometry(obj.size.x, obj.size.y);
	this.mesh = new THREE.Mesh(this.geometry, obj.material || new THREE.MeshNormalMaterial({side:THREE.DoubleSide}));
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
	obj.world.add(this.body);
	obj.scene.add(this.mesh);
	this.update = function () {
		this.mesh.position.copy(this.body.position);
		this.mesh.quaternion.copy(this.body.quaternion);
	}
	objAry.push(this);
}

function Floor (obj) {
	obj.size = {x:1000, y:1000};
	Plane.call(this, obj);
	this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
	this.mesh.name = 'floor';
}
// why? only use when .prototype was called
// Floor.prototype = Object.create(Plane.prototype);
// Floor.prototype.constructor = Floor;