Gui3D.Camera = function(fov, nearPlane, farPlane, screenWidth, screenHeight, x, y, z, pitch, yaw, roll){
	this.fov = fov;
	this.nearPlane = nearPlane;
	this.farPlane = farPlane;
	this.width = screenWidth;
	this.height = screenHeight;
	this.x = x;
	this.y = y;
	this.z = z;
	this.pitch = pitch;
	this.yaw = yaw;
	this.roll = roll;
	this.shouldUpdateMatrix = true;
	this.matrix = null;
	this.lookVector = null;
	this.shouldUpdateVectors = true;
};

Gui3D.Camera.prototype.setFOV = function(fov){
	if (fov !== this.fov) {
		this.fov = fov;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.getFOV = function(){
	return this.fov;
};

Gui3D.Camera.prototype.setNearPlane = function(nearPlane){
	if (nearPlane !== this.nearPlane) {
		this.nearPlane = nearPlane;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.getNearPlane = function(){
	return this.nearPlane;
};

Gui3D.Camera.prototype.setFarPlane = function(farPlane){
	if (farPlane !== this.farPlane) {
		this.farPlane = farPlane;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.getFarPlane = function(){
	return this.farPlane;
};

Gui3D.Camera.prototype.setScreenWidth = function(width){
	if (width !== this.width){
		this.width = width;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.getScreenWidth = function(){
	return this.width;
};

Gui3D.Camera.prototype.setScreenHeight = function(height){
	if (height !== this.height){
		this.height = height;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.getScreenHeight = function(){
	return this.height;
};

Gui3D.Camera.prototype.setX = function(x){
	if (x !== this.x) {
		this.x = x;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.increaseX = function(dx){
	if (dx) {
		this.x += dx;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.getX = function(){
	return this.x;
};

Gui3D.Camera.prototype.setY = function(y){
	if (y !== this.y) {
		this.y = y;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.increaseY = function(dy){
	if (dy) {
		this.y += dy;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.getY = function(){
	return this.y;
};

Gui3D.Camera.prototype.setZ = function(z){
	if (z !== this.z) {
		this.z = z;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.increaseZ = function(dz){
	if (dz) {
		this.z += dz;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.getZ = function(){
	return this.z;
};

Gui3D.Camera.prototype.setPosition = function(x, y, z){
	if (x !== this.x || y !== this.y || z !== this.z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.increasePosition = function(dx, dy, dz){
	if (dx || dy || dz){
		this.x += dx;
		this.y += dy;
		this.z += dz;
		this.shouldUpdateMatrix = true;
	}
};

Gui3D.Camera.prototype.setPitch = function(pitch){
	if (pitch !== this.pitch) {
		this.pitch = pitch;
		this.shouldUpdateMatrix = true;
		this.shouldUpdateVectors = true;
	}
};

Gui3D.Camera.prototype.increasePitch = function(amount){
	if (amount) {
		this.pitch += amount;
		this.shouldUpdateMatrix = true;
		this.shouldUpdateVectors = true;
	}
};

Gui3D.Camera.prototype.getPitch = function(){
	return this.pitch;
};

Gui3D.Camera.prototype.setYaw = function(yaw){
	if (yaw !== this.yaw) {
		this.yaw = yaw;
		this.shouldUpdateMatrix = true;
		this.shouldUpdateVectors = true;
	}
};

Gui3D.Camera.prototype.increaseYaw = function(amount){
	if (amount) {
		this.yaw += amount;
		this.shouldUpdateMatrix = true;
		this.shouldUpdateVectors = true;
	}
};

Gui3D.Camera.prototype.getYaw = function(){
	return this.yaw;
};

Gui3D.Camera.prototype.setRoll = function(roll){
	if (roll !== this.roll) {
		this.roll = roll;
		this.shouldUpdateMatrix = true;
		this.shouldUpdateVectors = true;
	}
};

Gui3D.Camera.prototype.increaseRoll = function(amount){
	if (amount) {
		this.roll += amount;
		this.shouldUpdateMatrix = true;
		this.shouldUpdateVectors = true;
	}
};

Gui3D.Camera.prototype.getRoll = function(){
	return this.roll;
};

Gui3D.Camera.prototype.getMatrix = function(){
	if (this.shouldUpdateMatrix) {
		this.matrix = this.createMatrix();
		this.shouldUpdateMatrix = false;
	}
	return this.matrix;
};

Gui3D.Camera.prototype.createMatrix = function(){
	return Matrices.createCameraMatrix(this.fov, this.nearPlane, this.farPlane, this.width, this.height, this.x, this.y, this.z, this.pitch, this.yaw, this.roll);
};

Gui3D.Camera.prototype.getForwardVector = function(){
	if (this.shouldUpdateVectors) {
		this.createVectors();
	}
	return this.forwardVector;
};

Gui3D.Camera.prototype.getUpVector = function(){
	if (this.shouldUpdateVectors) {
		this.createVectors();
	}
	return this.upVector;
};

Gui3D.Camera.prototype.getRightVector = function(){
	if (this.shouldUpdateVectors) {
		this.createVectors();
	}
	return this.rightVector;
};

Gui3D.Camera.prototype.createVectors = function(){
	this.shouldUpdateVectors = false;
	const pitch = toRadians(this.pitch);
	const yaw = toRadians(this.yaw);
	const sinPitch = Math.sin(pitch);
	const cosPitch = Math.cos(pitch);
	const sinYaw = Math.sin(yaw);
	const cosYaw = Math.cos(yaw);
	this.forwardVector = new Vectors.Vector3(sinYaw * cosPitch, -sinPitch, -cosYaw * cosPitch);
	this.upVector = new Vectors.Vector3(0, 1, 0);
	this.rightVector = new Vectors.Vector3(cosYaw, 0, sinYaw);
};