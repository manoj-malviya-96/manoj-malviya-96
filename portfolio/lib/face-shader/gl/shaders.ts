export const FACE_VERTEX_SHADER = /* glsl */ `#version 300 es
	in vec2 aPosition;
	in vec3 aColor;

	out vec3 vColor;
	out vec2 vClipPosition;

	void main() {
		vColor = aColor;
		vClipPosition = aPosition;
		gl_Position = vec4(aPosition, 0.0, 1.0);
	}
`;

// Mirrors the canvas-2D mesh's fade language (ambient pulse + pointer-proximity boost +
// a radial vignette) but evaluated per-fragment instead of via canvas gradients.
export const FACE_FRAGMENT_SHADER = /* glsl */ `#version 300 es
	precision highp float;

	in vec3 vColor;
	in vec2 vClipPosition;

	uniform vec2 uPointer;
	uniform float uPointerStrength;
	uniform float uAmbientPulse;
	uniform float uAspect;

	out vec4 fragColor;

	void main() {
		vec2 aspectCorrected = vec2(vClipPosition.x * uAspect, vClipPosition.y);
		float edgeDistance = length(aspectCorrected);
		float vignette = 1.0 - smoothstep(0.75, 1.05, edgeDistance);

		vec2 pointerDelta = (vClipPosition - uPointer) * vec2(uAspect, 1.0);
		float pointerDistance = length(pointerDelta);
		float pointerGlow = (1.0 - smoothstep(0.0, 0.6, pointerDistance)) * uPointerStrength;

		float ambient = mix(0.55, 0.85, uAmbientPulse);
		float brightness = ambient + pointerGlow * 0.6;
		vec3 boosted = mix(vColor, vec3(1.0), pointerGlow * 0.35);

		float alpha = vignette * (0.75 + pointerGlow * 0.25);
		fragColor = vec4(boosted * brightness, alpha);
	}
`;
