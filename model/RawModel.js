Gui3D.RawModel = function(expectedVertices, expectedTriangles){
	this.positions = new Array(expectedVertices * 3);
	this.textureCoords = new Array(expectedVertices * 2);
	this.matrices = new Array(expectedVertices);
	this.index = 0;
	this.indices = new Array(expectedTriangles * 3);
	this.indiceIndex = 0;
};

Gui3D.RawModel.prototype.addVertex = function(x, y, z, u, v, m){
	this.positions[this.index * 3] = x;
	this.positions[this.index * 3 + 1] = y;
	this.positions[this.index * 3 + 2] = z;
	this.textureCoords[this.index * 2] = u;
	this.textureCoords[this.index * 2 + 1] = v;
	this.matrices[this.index] = m;
	return this.index++;
};//TODO test the base 3d rendering and improve it as soon as it works

Gui3D.RawModel.prototype.bindTriangle = function(vertex1, vertex2, vertex3){
	this.indices[this.indiceIndex++] = vertex1;
	this.indices[this.indiceIndex++] = vertex2;
	this.indices[this.indiceIndex++] = vertex3;
};