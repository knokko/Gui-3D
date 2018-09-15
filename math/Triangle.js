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
};

Gui3D.Triangle.prototype.isPointInside = function(x, y){//time to write this stuff
	return true;
};