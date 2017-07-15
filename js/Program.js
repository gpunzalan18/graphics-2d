var Program = function(gl, vertexShader, fragmentShader) { 
  this.gl = gl; 
  this.sourceFileNames = {vs:vertexShader.sourceFileName,
                          fs:fragmentShader.sourceFileName}; 
  this.glProgram = gl.createProgram(); 
  gl.attachShader(this.glProgram, vertexShader.glShader); 
  gl.attachShader(this.glProgram, fragmentShader.glShader); 
  //defining the indices of the attributes: The only difference form the first one was the two addtional attributes
  gl.bindAttribLocation(this.glProgram, 0, 'vertexPosition'); 
  gl.bindAttribLocation(this.glProgram, 1, 'vertexNormal');  
  gl.bindAttribLocation(this.glProgram, 2, 'vertexTexCoord');  
  gl.linkProgram(this.glProgram); 

  //print error message
  if (!gl.getProgramParameter(this.glProgram, gl.LINK_STATUS)) { 
    throw new Error('Could not link shaders [vertex shader:' + vertexShader.sourceFileName +
                                         ']:[fragment shader: ' + fragmentShader.sourceFileName + ']\n' + gl.getProgramInfoLog(this.glProgram)); 
  }

  var textureUnitCount=0; 
  this.uniforms = {}; 
  var nUniforms = gl.getProgramParameter(
               this.glProgram, gl.ACTIVE_UNIFORMS); 
  for(var i=0; i<nUniforms; i++){ 
    var glUniform = gl.getActiveUniform(this.glProgram, i); 
    var uniform = { 
      type      : glUniform.type, 
      arraySize : glUniform.size || 1, 
      location  : gl.getUniformLocation(
                         this.glProgram, glUniform.name) 
    }; 
    // TODO: number samplers (give them texture unit indices)
    this.uniforms[glUniform.name.split('[')[0]] = uniform; 
  }

  if(glUniform.type === gl.SAMPLER_2D || 
            glUniform.type === gl.SAMPLER_CUBE){ 
      uniform.textureUnit = textureUnitCount; 
      textureUnitCount += uniform.arraySize; 
    } 
}; 


//prototype: in JS, the objects are just bags of properties
// it can also be used for inheritance
// way of adding methods to the program
// If you access a property and it's not there, we will access the prototype (kind of like the default) which every single object in program will home

Program.prototype.commit = function(){ 

  //if you want to add methods that acts upon the object, you should put it here so we can use the methods for all objects
  this.gl.useProgram(this.glProgram); 
};