uniform sampler2D normalDepthTexture;
uniform sampler2D sceneTexture;
uniform sampler2D noiseTexture;

uniform mat4 projection;
uniform mat4 projectionInverse;
uniform vec3 uSampleKernel[128];
uniform float uRadius;
uniform float uPower;

const int uSampleKernelSize = 6;

varying vec2 vUV;

vec3 readNormal(vec2 coord)
{
     return normalize(texture2D(normalDepthTexture, coord).xyz * 2.0  - 1.0);
}

vec3 posFromDepth(vec2 coord)
{
     float d = texture2D(normalDepthTexture, coord).a;
     vec3 tray = mat3(projectionInverse) * vec3((coord.x - 0.5) * 2.0, (coord.y - 0.5) * 2.0, 1.0);
     return tray * d;
}

void main(void)
{
    vec3 origin = posFromDepth(vUV);
    vec3 normal = readNormal(vUV);
    vec3 rvec = texture2D(noiseTexture, vUV).xyz * 2.0 - 1.0;
    vec3 tangent = normalize(rvec - normal * dot(rvec, normal));
    vec3 bitangent = cross(normal, tangent);
    mat3 tbn = mat3(tangent, bitangent, normal);

    float occlusion = 0.0;
    for (int i = 0; i < uSampleKernelSize; ++i)
    {
    // get sample position:
       vec3 sample = tbn * uSampleKernel[i];
       sample = sample * uRadius + origin;

    // project sample position:
       vec4 offset = vec4(sample, 1.0);
       offset = projection * offset;
       offset.xy /= offset.w;
       offset.xy = offset.xy * 0.5 + 0.5;

    // get sample depth:
       float sampleDepth = texture2D(normalDepthTexture, offset.xy).a;

    // range check & accumulate:
       float rangeCheck = abs(origin.z - sampleDepth) < uRadius ? 1.0 : 0.0;
       occlusion += (sampleDepth <= sample.z ? 1.0 : 0.0) * rangeCheck;
    }

    occlusion = 1.0 - (occlusion / float(uSampleKernelSize));

    gl_FragColor = vec4(pow(occlusion, uPower), pow(occlusion, uPower), pow(occlusion, uPower), 1.0);
    //gl_FragColor = vec4(pow(occlusion, uPower));
}