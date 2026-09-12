export const FACE_VERTEX_SHADER = /* glsl */ `#version 300 es
	in vec2 aPosition;
	in float aBrightness;

	// flat: each triangle takes its provoking vertex's brightness instead of
	// interpolating across the three — that's what makes the facets read as
	// triangles instead of a smoothly blurred gradient.
	flat out float vBrightness;
	out vec2 vClipPosition;

	void main() {
		vBrightness = aBrightness;
		vClipPosition = aPosition;
		gl_Position = vec4(aPosition, 0.0, 1.0);
	}
`;

// Monochrome, tinted by the theme's content color: brightness comes from the source
// photo, hue never does. The only reactivity is a glow that brightens near the cursor.
export const FACE_FRAGMENT_SHADER = /* glsl */ `#version 300 es
	precision highp float;

	flat in float vBrightness;
	in vec2 vClipPosition;

	uniform vec2 uPointer;
	uniform float uPointerStrength;
	uniform vec3 uThemeColor;

	out vec4 fragColor;

	void main() {
		float pointerDistance = length(vClipPosition - uPointer);
		float pointerGlow = (1.0 - smoothstep(0.0, 0.6, pointerDistance)) * uPointerStrength;

		vec3 color = uThemeColor * mix(0.45, 1.0, vBrightness);
		color *= 1.0 + pointerGlow * 0.8;

		fragColor = vec4(color, 1.0);
	}
`;
