Gui3D.Rectangle = function(triangle){
	this.minX = triangle.x1;
	if(triangle.x2 < this.minX){
		this.minX = triangle.x2;
	}
	if(triangle.x3 < this.minX){
		this.minX = triangle.x3;
	}
		
	this.minY = triangle.y1;
	if(triangle.y2 < this.minY){
		this.minY = triangle.y2;
	}
	if(triangle.y3 < this.minY){
		this.minY = triangle.y3;
	}
		
	this.maxX = triangle.x1;
	if(triangle.x2 > this.maxX){
		this.maxX = triangle.x2;
	}
	if(triangle.x3 > this.maxX){
		this.maxX = triangle.x3;
	}
		
	this.maxY = triangle.y1;
	if(triangle.y2 > this.maxY){
		this.maxY = triangle.y2;
	}
	if(triangle.y3 > this.maxY){
		this.maxY = triangle.y3;
	}
};

Gui3D.Rectangle.prototype.isPointInside = function(x, y){
	return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
};