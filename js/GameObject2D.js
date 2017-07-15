var GameObject2D = function(mesh) { 
  this.mesh = mesh;
  
  this.velocity = new Vec2(0,0);
  this.acceleration = new Vec2(0,0);
  this.position = new Vec3(0, 0, 0);

  //this.drag = new Vec2(0,0); 
  this.angularVelocity = new Vec2(0,0);
  this.orientation = (0,0); 
  this.scale = new Vec3(.5, .5, .5); 
  this.opacity = 1;
  this.texOffset = new Vec2(0,0);
  this.rotation = 0;

  this.modelMatrix = new Mat4(); 
  this.updateModelTransformation(); 
  this.move = function(dt, keysPressed){};
};
GameObject2D.prototype.updateModelTransformation = function(){ 
  this.modelMatrix.set(). 
    scale(this.scale). 
    rotate(this.orientation). 
    translate(this.position);

};
GameObject2D.prototype.draw = function(camera){ 

  Material.shared.modelViewProjMatrix.set(). 
    mul(this.modelMatrix).mul(camera.viewProjMatrix);
  Material.shared.texOffset.set(this.texOffset);
  Material.shared.opacity.set(this.opacity);


  this.mesh.draw(); 
};
