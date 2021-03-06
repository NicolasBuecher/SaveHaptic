/*******************************************************************************
	Copyright (C) 2013 John Chapman

	This software is distributed freely under the terms of the MIT License.
	See "license.txt" or "http://copyfree.org/licenses/mit/license.txt".
*******************************************************************************/
#include "../common/def.glsl"
#include "../common/utils.glsl"
#include "../common/normals.glsl"


layout(binding=0) uniform samplerCube uEnvTex;
uniform float uEnvTexMaxLod = 8.0; // max lod for uEnvTex

layout(binding=1) uniform sampler2D uGBufferDiffuseTex;
layout(binding=2) uniform sampler2D uGBufferMaterialTex;
layout(binding=3) uniform sampler2D uGBufferGeometricTex;
layout(binding=4) uniform sampler2D uGBufferDepthTex;

uniform vec2 uNearFar; // near/far clipping planes
uniform mat4 uInverseViewMatrix; // for view->world space conversion

in VertexDataT {
	smooth vec3 position; // view space position
	smooth vec2 texcoord; // copied through from aTexcoord
	smooth mat3 tangentViewMatrix; // tangent->view space matrix
	noperspective vec3 viewRay; // ray to far plane (use linear interpolation)
} vertexIn;
	
layout(location=0) out vec4 fResult;

/*----------------------------------------------------------------------------*/
void main() {
//	get surface properties:
	vec4 kd = texture(uGBufferDiffuseTex, vertexIn.texcoord);

	vec4 material = texture(uGBufferMaterialTex, vertexIn.texcoord);
	float ks = material.r;
	float ke = material.g;
	float km = material.b;
	
	vec4 geometric = texture(uGBufferGeometricTex, vertexIn.texcoord);
	
	vec3 n = decodeNormal(geometric.xyz);
	float ko = geometric.a; // local occlusion
	
	// depth doesn't need to be linear in this case
	vec3 position = vertexIn.viewRay * texture(uGBufferDepthTex, vertexIn.texcoord).r;
	
//	get light properties:	
	vec4 ld = textureLod(uEnvTex, (uInverseViewMatrix * vec4(n, 0.0)).xyz, uEnvTexMaxLod);
	
	vec3 r = reflect(position, n);
	float lod = pow(1.0 - ke, 0.5); // linearize, since mips aren't linearly spaced	
	vec4 ls = textureLod(uEnvTex, (uInverseViewMatrix * vec4(r, 0.0)).xyz, uEnvTexMaxLod * lod);
	
//	compute final radiance:
	vec4 intensity = mix(kd * ld + ks * ls, ks * kd * ls, km) * ko;
	
	fResult = intensity;
	//fResult = vec4(position, 1.0);
}