var IndexedTrianglesGeometry = function(gl, jsonFile){
  var n = 10;
  this.vertices = new Array(3 * n);
  this.normals = new Array(3 * n);
  this.texturecoords = new Array ( 2 * n);
  this.faces = new Array(n * new Array(3));


  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
        -1, -1, 0,
        -1,  1, 0,
         1, -1, 0,
         1,  1, 0,
    ]),
    gl.STATIC_DRAW);

  this.vertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
       0, 0, 1,
       0, 0, 1,
       0, 0, 1,
       0, 0, 1,
    ]),
    gl.STATIC_DRAW);

  this.vertexTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
         0, 1,
         0, 0,
         1, 1,
         1, 0,
    ]),
    gl.STATIC_DRAW);

  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([
      0, 1, 2,
      1, 2, 3,
    ]),
    gl.STATIC_DRAW);
};