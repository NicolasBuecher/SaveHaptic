precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

// Normal
varying vec2 vUV;
varying vec3 vPosition;
varying vec3 vNormal;

void main(void) {
    vPosition = position;
    vNormal = normal;
    vUV = uv;

    gl_Position = worldViewProjection * vec4(position, 1.0);
}