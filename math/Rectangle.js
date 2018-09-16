Gui3D.Rectangle = function(vec1, vec2, vec3){
	this.minX = vec1.x;
	if(vec2.x < this.minX) this.minX = vec2.x;
	if(vec3.x < this.minX) this.minX = vec3.x;

	this.minY = vec1.y;
	if(vec2.y < this.minY) this.minY = vec2.y;
	if(vec3.y < this.minY) this.minY = vec3.y;

	this.maxX = vec1.x;
	if(vec2.x > this.maxX) this.maxX = vec2.x;
	if(vec3.x > this.maxX) this.maxX = vec3.x;

	this.maxY = vec1.y;
	if(vec2.y > this.maxY) this.maxY = vec2.y;
	if(vec3.y > this.maxY) this.maxY = vec3.y;
}

Gui3D.Rectangle.prototype.isPointInside = function(x, y){
	return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
};

Gui3D.Rectangle.prototype.isInScreen = function(){
	return this.minX <= 1 && this.maxX >= -1 && this.minY <= 1 && this.maxY >= -1;
};