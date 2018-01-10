function main() {
  // Get A WebGL context
  var canvas = document.getElementById("canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  startGL()

  function startGL () {
    var buffers = []
    var positionAttributeLocation = initShaders()
    buffers.push(initBuffers(gl, [
      0, 0,
      0, 0.5,
      0.7, 0
    ], "STATIC_DRAW"))
    gl.clearColor(0, 0, 0, 0);
    drawScene(gl, buffers)
  }

  function drawScene(gl, buffers) {
    resize(canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT)
    buffers.map((buffer) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.vertexAttribPointer(
        positionAttributeLocation, buffer.size, buffer.type, buffer.normalize, buffer.stride, buffer.offset)
    })
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  //returns positionBuffer//
  function initBuffers(gl, data, usage) {
    positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl[usage])
    setBufferProps(positionBuffer, 2, gl.FLOAT, false, 0, 0)
    return positionBuffer;
  }

  function setBufferProps(buffer, size, type, normalize, stride, offset) {
    buffer.size = size
    buffer.type = type,
    buffer.normalize = normalize
    buffer.stride = stride
    buffer.offset = offset
  }

  //returns position attribute location//
  function initShaders() {
    var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
    var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

    // create GLSL shaders, upload the GLSL source, compile the shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    var program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    return positionAttributeLocation;
  }

  function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    gl.deleteShader(shader);
  }

  function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    gl.deleteProgram(program);
  }

  function resize(canvas) {
    var displayWidth = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
    if(canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
  }
}

main()
