/*******************************************************************************
	Copyright (C) 2013 John Chapman

	This software is distributed freely under the terms of the MIT License.
	See "license.txt" or "http://copyfree.org/licenses/mit/license.txt".
*******************************************************************************/
#include "common/def.glsl"

layout(binding=0) uniform sampler2D uInputTex;

uniform int uBlurSize = 4; // use size of noise texture

noperspective in vec2 vTexcoord;

layout(location=0) out vec4 fResult;

/*----------------------------------------------------------------------------*/
void main() {
	vec2 texelSize = 1.0 / vec2(textureSize(uInputTex, 0));
	
//	ideally use a fixed size noise and blur so that this loop can be unrolled
	fResult = vec4(0.0);
	vec2 hlim = vec2(float(-uBlurSize) * 0.5 + 0.5);
	for (int x = 0; x < uBlurSize; ++x) {
		for (int y = 0; y < uBlurSize; ++y) {
			vec2 offset = vec2(float(x), float(y));
			offset += hlim;
			offset *= texelSize;
					
			fResult += texture(uInputTex, vTexcoord + offset);
		}
	}
	
	fResult = fResult / (uBlurSize * uBlurSize);
}