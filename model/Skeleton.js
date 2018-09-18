Gui3D.Skeleton = function(parts){
	this.parts = parts;
};

Gui3D.Skeleton.prototype.setState = function(state){
	const length = this.parts.length;
	for(let index = 0; index < length; index++){
		this.parts[index].setState(state, this);
	}
};