Gui3D.Triangle = function(texture, skeleton, vector1, vector2, vector3, u1, v1, u2, v2, u3, v3, m1, m2, m3){
	this.texture = texture;
	this.skeleton = skeleton;
	this.x1 = vector1.x;
	this.y1 = vector1.y;
	this.z1 = vector1.z;
	this.u1 = u1;
	this.v1 = v1;
	//this.m1 = m1;
	this.x2 = vector2.x;
	this.y2 = vector2.y;
	this.z2 = vector2.z;
	this.u2 = u2;
	this.v2 = v2;
	//this.m2 = m2;
	this.x3 = vector3.x;
	this.y3 = vector3.y;
	this.z3 = vector3.z;
	this.u3 = u3;
	this.v3 = v3;
	//this.m3 = m3;

	this.dx32 = this.x3 - this.x2;
	this.dy23 = this.y2 - this.y3;
	this.dx13 = this.x1 - this.x3;
	this.dy31 = this.y3 - this.y1;

	this.determinant = this.dy23 * this.dx13 + this.dx32 * (this.y1 - this.y3);

	const normal = vector2.substract(vector1, null).cross(vector3.substract(vector1, null), null);
	this.nx = normal.x;
	this.ny = normal.y;
	this.nz = normal.z;
	this.w = this.nx * vector1.x + this.ny * vector1.y + this.nz * vector1.z;
};

Gui3D.Triangle.prototype.getZ = function(x, y){
	/*
	plane: 
	nx * x + ny * y + nz * z = w
	nz * z = w - nx * x - ny * y
	z = (w - nx * x - ny * y) / nz and nz != 0
	*/
	if(this.nz !== 0){
		return (this.w - this.nx * x - this.ny * y) / this.nz;
	}
	return 2;//will prevent rendering from now
}

Gui3D.Triangle.prototype.getBarCoords = function(fx, fy){
	const factor1 = (this.dy23 * (fx - this.x3) + this.dx32 * (fy - this.y3)) / this.determinant;
	if(factor1 < 0 || factor1 > 1) return null;
	const factor2 = (this.dy31 * (fx - this.x3) + this.dx13 * (fy - this.y3)) / this.determinant;
	if(factor2 < 0 || factor2 > 1) return null;
	const factor3 = 1 - factor1 - factor2;
	if(factor3 < 0 || factor3 > 1) return null;
	return [factor1, factor2, factor3];
};