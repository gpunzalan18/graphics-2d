// Object that takes in 2 parameters: gl, and the name of the file.
// File: Make sure the file path was correct. 
// In the scene constructor, we can use this variable to create an object
// declare as this.[name] = Texture2D(gl, parameter)

var Texture2D = function(gl, mediaFileUrl) { 
  pendingResources[mediaFileUrl] =
             ++pendingResources[mediaFileUrl] || 1; 
  this.mediaFileUrl = mediaFileUrl; 
  this.glTexture = gl.createTexture(); 
  this.image = new Image(); 
  var theTexture = this; 
  this.image.onload = function() { theTexture.loaded(gl); }; 
  this.image.src = mediaFileUrl; 
};

Texture2D.prototype.loaded = function(gl){ 
  gl.bindTexture(gl.TEXTURE_2D, this.glTexture); 
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                          gl.UNSIGNED_BYTE, this.image); 
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER,
                                         gl.LINEAR); 
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
                                  gl.LINEAR_MIPMAP_LINEAR); 
  gl.generateMipmap(gl.TEXTURE_2D); 
  gl.bindTexture(gl.TEXTURE_2D, null); 
  if( --pendingResources[this.mediaFileUrl] === 0 ) { 
    delete pendingResources[this.mediaFileUrl]; 
  } 
};

//Commit function for texture that takes in 3 parameters
Texture2D.prototype.commit = function(gl,
                    uniformLocation, textureUnit){ 
  gl.uniform1i(uniformLocation, textureUnit); 
  gl.activeTexture(gl.TEXTURE0 + textureUnit); 
  gl.bindTexture(gl.TEXTURE_2D, this.glTexture); 
}; 
