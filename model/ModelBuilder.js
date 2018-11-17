Gui3D.ModelBuilder = function(current){
	if(current === undefined){
		this.positions = [];
		this.textureCoords = [];
		this.matrices = [];
		this.indices = [];
		this.parts = [];
		this.texture = new Gui.Texture(32, 32);
	}
	else {
		//create new arrays because RawModel uses typed arrays that can't be resized
		this.positions = new Array(current.model.positions.length);
		this.textureCoords = new Array(current.model.textureCoords.length);
		this.matrices = new Array(current.model.matrices.length);
		this.indices = new Array(current.model.indices.length);
		this.parts = new Array(current.skeleton.parts.length);
		javaArrayCopy(current.model.positions, 0, this.positions, 0, this.positions.length);
		javaArrayCopy(current.model.textureCoords, 0, this.textureCoords, 0, this.textureCoords.length);
		javaArrayCopy(current.model.matrices, 0, this.matrices, 0, this.matrices.length);
		javaArrayCopy(current.model.indices, 0, this.indices, 0, this.indices.length);
		javaArrayCopy(current.skeleton.parts, 0, this.parts, 0, this.parts.length);
		this.texture = current.texture.clone();
	}
	this.testModel = new Gui3D.Model(new Gui3D.RawModel(this.positions, this.textureCoords, this.matrices, this.indices), this.texture, new Gui3D.Skeleton(this.parts));
};

Gui3D.ModelBuilder.prototype.addVertex = function(x, y, z, u, v, m){
	this.positions.push(x);
	this.positions.push(y);
	this.positions.push(z);
	this.textureCoords.push(u);
	this.textureCoords.push(v);
	this.matrices.push(m);
	return this.matrices.length - 1;
};

Gui3D.ModelBuilder.prototype.bindTriangle = function(vertex1, vertex2, vertex3){
	this.indices.push(vertex1);
	this.indices.push(vertex2);
	this.indices.push(vertex3);
};

Gui3D.ModelBuilder.prototype.bindFourangle = function(vertex1, vertex2, vertex3, vertex4){
	this.bindTriangle(vertex1, vertex2, vertex3);
	this.bindTriangle(vertex3, vertex4, vertex1);
};

Gui3D.ModelBuilder.prototype.addSkeletonPart = function(part){
	this.parts.push(part);
};

Gui3D.ModelBuilder.prototype.addTriangle = function(x1, y1, z1, u1, v1, m1, x2, y2, z2, u2, v2, m2, x3, y3, z3, u3, v3, m3){
	this.bindTriangle(this.addVertex(x1, y1, z1, u1, v1, m1), this.addVertex(x2, y2, z2, u2, v2, m2), this.addVertex(x3, y3, z3, u3, v3, m3));
};

Gui3D.ModelBuilder.prototype.addFourangle = function(x1, y1, z1, u1, v1, m1, x2, y2, z2, u2, v2, m2, x3, y3, z3, u3, v3, m3, x4, y4, z4, u4, v4, m4){
	this.bindFourangle(this.addVertex(x1, y1, z1, u1, v1, m1), this.addVertex(x2, y2, z2, u2, v2, m2), this.addVertex(x3, y3, z3, u3, v3, m3), this.addVertex(x4, y4, z4, u4, v4, m4));
};

Gui3D.ModelBuilder.prototype.createModel = function(){
	const positions = new Int32Array(this.positions.length);
	const textureCoords = new Uint16Array(this.textureCoords.length);
	const matrices = new Int8Array(this.matrices.length);
	const indices = new Uint16Array(this.indices.length);
	const parts = new Array(this.parts);
	javaArrayCopy(this.positions, 0, positions, 0, positions.length);
	javaArrayCopy(this.textureCoords, 0, textureCoords, 0, textureCoords.length);
	javaArrayCopy(this.matrices, 0, matrices, 0, matrices.length);
	javaArrayCopy(this.indices, 0, indices, 0, indices.length);
	const partsLength = parts.length;
	for(let index = 0; index < parts.length; index++){
		parts[index] = this.parts[index].clone();
	}
	return new Gui3D.Model(new Gui3D.RawModel(positions, textureCoords, matrices, indices), this.texture.clone(), new Gui3D.Skeleton(parts));
};