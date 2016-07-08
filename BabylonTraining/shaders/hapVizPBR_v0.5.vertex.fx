// ############### HAPTICMEDIA hapViz PRB shader ###############
// ############### author : Loic Muhlmann ###############
// ############### VERSION: V0.4 ###############

precision highp float;

// ############################## ENTRIES ##############################

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 world;
uniform mat4 viewProjection;

// varying
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUV;
varying vec4 outPos;

// ############################## VOID ##############################

void main(void) {
    outPos = viewProjection * world * vec4(position, 1.0);
    vPosition = position;
    vNormal = normal;
    vUV = uv;

    gl_Position = outPos;
}