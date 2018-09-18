Gui3D.NoAnimation = function(){};

Gui3D.NoAnimation.prototype.getX = function(state){
	return 0;
};

Gui3D.NoAnimation.prototype.getY = function(state){
	return 0;
};

Gui3D.NoAnimation.prototype.getZ = function(state){
	return 0;
};

Gui3D.NoAnimation.prototype.getPitch = function(state){
	return 0;
};

Gui3D.NoAnimation.prototype.getYaw = function(state){
	return 0;
};

Gui3D.NoAnimation.prototype.getRoll = function(state){
	return 0;
};

Gui3D.NoAnimation.prototype.clone = function(){
	return new Gui3D.NoAnimation();
};