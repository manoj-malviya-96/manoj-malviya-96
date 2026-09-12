function compileShader(
	gl: WebGL2RenderingContext,
	type: number,
	source: string,
): WebGLShader {
	const shader = gl.createShader(type);
	if (!shader) throw new Error("Failed to allocate WebGL shader");
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const log = gl.getShaderInfoLog(shader);
		gl.deleteShader(shader);
		throw new Error(`Shader compile error: ${log}`);
	}
	return shader;
}

export function createProgram(
	gl: WebGL2RenderingContext,
	vertexSource: string,
	fragmentSource: string,
): WebGLProgram {
	const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
	const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

	const program = gl.createProgram();
	if (!program) throw new Error("Failed to allocate WebGL program");
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		const log = gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw new Error(`Program link error: ${log}`);
	}
	return program;
}

export function createAttributeBuffer(
	gl: WebGL2RenderingContext,
	program: WebGLProgram,
	attribute: string,
	data: Float32Array,
	componentsPerVertex: number,
): void {
	const location = gl.getAttribLocation(program, attribute);
	if (location < 0)
		throw new Error(`Attribute "${attribute}" not found in program`);

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, componentsPerVertex, gl.FLOAT, false, 0, 0);
}

export function createIndexBuffer(
	gl: WebGL2RenderingContext,
	data: Uint32Array,
): void {
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
}
