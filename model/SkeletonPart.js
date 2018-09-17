Gui3D.SkeletonPart = function(parentIndex, x, y, z, pitch, yaw, roll, animation){
	this.parentIndex = parentIndex;
	this.x = x;
	this.y = y;
	this.z = z;
	this.pitch = pitch;
	this.yaw = yaw;
	this.roll = roll;
	this.animation = animation;
	this.matrix = null;
};

Gui3D.SkeletonPart.prototype.setState = function(state, skeleton){
	this.matrix = Matrices.createTransformationMatrix(this.x + this.animation.getX(state), this.y + this.animation.getY(state), this.z + this.animation.getZ(state), this.pitch + this.animation.getPitch(state), this.yaw + this.animation.getYaw(state), this.roll + this.animation.getRoll(state));
	if(this.parentIndex !== -1){
		skeleton.parts[this.parentIndex].matrix.multiply(this.matrix, this.matrix);
	}
};