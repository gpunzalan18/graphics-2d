
var Shader = function(gl, shaderType, sourceFileName) { 
  this.sourceFileName = sourceFileName; 
  this.glShader = gl.createShader(shaderType);  //property of the shader object
  if(shaderSource.hasOwnProperty(sourceFileName)) {  //checks if the property in the shader exists at all
    gl.shaderSource(this.glShader,
                             shaderSource[sourceFileName]); //ShaderSouce is the name of the global object
  } else 
    throw new Error('Shader ' + sourceFileName + ' not found. Check spelling, and whether the essl file is embedded into the html file.'); 
  gl.compileShader(this.glShader); 

  if (!gl.getShaderParameter(this.glShader, gl.COMPILE_STATUS))    
    throw new Error('Error in shader ' + sourceFileName + ':\n' + gl.getShaderInfoLog(this.glShader)); 
};



