Gui3D.Skeleton = function(capacity){
	this.parts = new Array(capacity);
	this.index = 0;
};

Gui3D.Skeleton.prototype.setState = function(state){
	const length = this.parts.length;
	for(let index = 0; index < length; index++){
		this.parts[index].setState(state, this);
	}
};