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

	this.determinant = (this.y2 - this.y3) * (this.x1 - this.x3) + (this.x3 - this.x2) * (this.y1 - this.y3);

	this.vector1 = vector1;
	this.vector2 = vector2;
	this.vector3 = vector3;

	this.direction1 = vector2.substract(vector1, null);
	this.direction2 = vector3.substract(vector1, null);
	this.direction3 = vector3.substract(vector2, null);//not used as much as direction1 and direction2, but still useful
	this.normal = this.direction1.cross(this.direction2, null);
	this.area = this.normal.length() / 2;
	this.w = this.normal.x * vector1.x + this.normal.y * vector1.y + this.normal.z * vector1.z;
};

Gui3D.Triangle.prototype.getBarCoords = function(x, y){//this method will only be called if the x and y coord passed the rectangle check
	/*
	plane: 
	nx * x + ny * y + nz * z = w
	nz * z = w - nx * x - ny * y
	z = (w - nx * x - ny * y) / nz and nz != 0
	*/
	if(this.normal.z !== 0){
		const z = (this.w - this.normal.x * x - this.normal.y * y) / this.normal.z;
		
		const delta2 = new Vectors.Vector3(x - this.vector2.x, y - this.vector2.y, z - this.vector2.z);
		let areaTest = this.direction3.cross(delta2, null);
		const b1 = (areaTest.length() / 2) / this.area;
		if(b1 < 0 || b1 > 1) return null;

		const edge2 = this.direction2.negate(null);
		const delta3 = new Vectors.Vector3(x - this.vector3.x, y - this.vector3.y, z - this.vector3.z);
		areaTest = edge2.cross(delta3, null);
		const b2 = (areaTest.length() / 2) / this.area;
		if(b2 < 0 || b2 > 1) return null;
		const b3 = 1 - b1 - b2;
		if(b3 < 0 || b3 > 1) return null;
		return [b1, b2, b3];
	}
	else {
		return null;//this is the annoying situation where the triangle appears to be a line because of the camera angle
	}
};

Gui3D.Triangle.prototype.getZ = function(x, y){
	/*
	plane: 
	nx * x + ny * y + nz * z = w
	nz * z = w - nx * x - ny * y
	z = (w - nx * x - ny * y) / nz and nz != 0
	*/
	if(this.normal.z !== 0){
		return (this.w - this.normal.x * x - this.normal.y * y) / this.normal.z;
	}
	return 2;//will prevent rendering from now
}

Gui3D.Triangle.prototype.getBarCoords2 = function(fx, fy){
	const factor1 = ((this.y2 - this.y3) * (fx - this.x3) + (this.x3 - this.x2) * (fy - this.y3)) / this.determinant;
	if(factor1 < 0 || factor1 > 1) return null;
	const factor2 = ((this.y3 - this.y1) * (fx - this.x3) + (this.x1 - this.x3) * (fy - this.y3)) / this.determinant;
	if(factor2 < 0 || factor2 > 1) return null;
	const factor3 = 1 - factor1 - factor2;
	if(factor3 < 0 || factor3 > 1) return null;
	return [factor1, factor2, factor3];
};