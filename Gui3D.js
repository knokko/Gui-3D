const Gui3D = {};

function renderModels(pixels, width, height, cameraMatrix, models){
	if(pixels === undefined){
		pixels = new Uint8ClampedArray(4 * width * height);
	}
	const modelsLength = models.length;
	let triangleLength = 0;
	for(let index = 0; index < modelsLength; index++){
		triangleLength += models[index].model.indices.length / 3;
	}
	const triangles = new Array(triangleLength);
	const rectangles = new Array(triangleLength);
	let triangleIndex = 0;
	
	//less garbage
	let model;
	let texture;
	let skeleton;
	let indices;
	let positions;
	let textureCoords;
	let indicesLength;
	let vector4 = new Vectors.Vector4();
	let vector31 = new Vectors.Vector3();
	let vector32 = new Vectors.Vector3();
	let vector33 = new Vectors.Vector3();
	let indexPos = 0;
	//
	for(let modelIndex = 0; modelIndex < modelsLength; modelIndex++){
		model = models[modelIndex].model;
		texture = models[modelIndex].texture;
		skeleton = models[modelIndex].skeleton;
		indices = model.indices;
		positions = model.positions;
		textureCoords = model.textureCoords;
		//const matrices = model.matrices;
		indicesLength = indices.length;
		for(let index = 0; index < indicesLength; index += 3){
			//vector 1
			indexPos = indices[index] * 3;
			vector31.x = positions[indexPos++];
			vector31.y = positions[indexPos++];
			vector31.z = positions[indexPos];
			cameraMatrix.transform(vector31, vector4);
			vector4.w = Math.abs(vector4.w);
			vector31.x = vector4.x / vector4.w;
			vector31.y = vector4.y / vector4.w;
			vector31.z = vector4.z / vector4.w;
			//vector 2
			indexPos = indices[index + 1] * 3;
			vector32.x = positions[indexPos++];
			vector32.y = positions[indexPos++];
			vector32.z = positions[indexPos];
			cameraMatrix.transform(vector32, vector4);
			vector4.w = Math.abs(vector4.w);
			vector32.x = vector4.x / vector4.w;
			vector32.y = vector4.y / vector4.w;
			vector32.z = vector4.z / vector4.w;
			//vector 3
			indexPos = indices[index + 2] * 3;
			vector33.x = positions[indexPos++];
			vector33.y = positions[indexPos++];
			vector33.z = positions[indexPos];
			cameraMatrix.transform(vector33, vector4);
			vector4.w = Math.abs(vector4.w);
			vector33.x = vector4.x / vector4.w;
			vector33.y = vector4.y / vector4.w;
			vector33.z = vector4.z / vector4.w;
			triangles[triangleIndex] = new Gui3D.Triangle(texture, skeleton, vector31, vector32, vector33, 
				textureCoords[indices[index] * 2], textureCoords[indices[index] * 2 + 1],
				textureCoords[indices[index + 1] * 2], textureCoords[indices[index + 1] * 2 + 1],
				textureCoords[indices[index + 2] * 2], textureCoords[indices[index + 2] * 2 + 1]
			);
			rectangles[triangleIndex] = new Gui3D.Rectangle(triangles[triangleIndex++]);
		}
	}
	//less garbage
	let fx = 0.0;
	let fy = 0.0;
	let dist1 = 0.0;
	let dist2 = 0.0;
	let dist3 = 0.0;
	let totalDist = 0.0;
	let textureIndex = 0;
	let triangleTextureData;
	let textureX = 0.0;
	let textureY = 0.0;

	let barCoords;
	let triangle;
	let fz;
	let minZ;
	let closestBarCoords;
	//
	let pixelIndex = 0;
	for(let y = 0; y < height; y++){
		for(let x = 0; x < width; x++){
			fx = (x / width) * 2 - 1;
			fy = (y / height) * -2 + 1;
			minZ = 1;
			closestBarCoords = undefined;
			triangle = undefined;
			for(let index = 0; index < triangleLength; index++){
				if(rectangles[index].isPointInside(fx, fy)){
					fz = triangles[index].getZ(fx, fy);
					if(fz > -1 && fz < minZ){
						barCoords = triangles[index].getBarCoords2(fx, fy);
						if(barCoords !== null){
							minZ = fz;
							triangle = triangles[index];
							closestBarCoords = barCoords;
						}
					}
				}
			}
			if(triangle !== undefined){
				textureX = closestBarCoords[0] * triangle.u1;
				textureY = closestBarCoords[0] * triangle.v1;
						
				//vertex 2
				textureX += closestBarCoords[1] * triangle.u2;
				textureY += closestBarCoords[1] * triangle.v2;
						
				//vertex 3
				textureX += closestBarCoords[2] * triangle.u3;
				textureY += closestBarCoords[2] * triangle.v3;
						
				textureIndex = 4 * (Math.round(textureX) + triangle.texture.width * Math.round(textureY));
				triangleTextureData = triangle.texture.data;
				pixels[pixelIndex] = triangleTextureData[textureIndex++];//red
				pixels[pixelIndex + 1] = triangleTextureData[textureIndex++];//green
				pixels[pixelIndex + 2] = triangleTextureData[textureIndex++];//blue
				pixels[pixelIndex + 3] = triangleTextureData[textureIndex];//alpha
			}
			pixelIndex += 4;
		}
	}
	return pixels;
};

Gui.CanvasRenderer.prototype.renderModels = function(minX, minY, maxX, maxY, cameraMatrix, models){
	const intMinX = Math.round(minX * this.width);
	const intMinY = Math.round((1 - maxY) * this.height);
	const width = Math.round(maxX * this.width) - intMinX + 1;
	const height = Math.round((1 - minY) * this.height) - intMinY + 1;
	const imageData = this.context.getImageData(intMinX, intMinY, width, height);
	renderModels(imageData.data, width, height, cameraMatrix, models);
	this.context.putImageData(imageData, intMinX, intMinY);
};

Gui.DynamicChildRenderer.prototype.renderModels = function(minX, minY, maxX, maxY, cameraMatrix, models){
	this.parent().renderModels(this.minX() + this.width() * minX, this.minY() + this.height() * minY, this.minX() + this.width() * maxX, this.minY() + this.height() * maxY, cameraMatrix, models);
};

Gui.StaticChildRenderer.prototype.renderModels = function(minX, minY, maxX, maxY, cameraMatrix, models){
	this.parent.renderModels(this.minX + this.width * minX, this.minY + this.height * minY, this.minX + this.width * maxX, this.minY + this.height * maxY, cameraMatrix, models);
};