//uniform sampler2D depthSampler;
uniform sampler2D normalDepthSampler;
uniform sampler2D noiseSampler;

uniform mat4 projectionInverse;

const int MAX_SAMPLE_KERNEL_SIZE = 128;
uniform vec3 uSampleKernel[MAX_SAMPLE_KERNEL_SIZE];
uniform vec2 uNoiseScale;

varying vec2 vUV;

vec3 posFromDepth()
{
    float z = texture2D(normalDepthSampler, vUV).r;
    float x = vUV.s * 2.0 - 1.0;
    float y = (1.0 - vUV.t) * 2.0 - 1.0;
    vec4 projectedPosition = vec4(x, y, z, 1.0);
    vec4 viewSpacePosition = projectionInverse * projectedPosition;
    return viewSpacePosition.xyz / viewSpacePosition.w;
}

float linearizeDepth(float depth)
{
    float zFar = 10.0;
    float zNear = 0.1;
    depth = 2.0 * depth - 1.0;
    return (2.0 * zFar * zNear) / ((zFar + zNear) - depth * (zFar - zNear));
}

void main(void)
{
    float depth = texture2D(normalDepthSampler, vUV).r;

    vec2 noiseSample = texture2D(noiseSampler, vUV * uNoiseScale).rg;

    vec3 origin = posFromDepth();
    /*origin = normalize(origin);
    origin.x *= 0.5;
    origin.x += 0.5;
    origin.y *= 0.5;
    origin.y += 0.5;*/

    vec3 normal = texture2D(normalDepthSampler, vUV).xyz * 2.0 - 1.0;
    normal = normalize(normal);


    //gl_FragColor = vec4(normal, 1.0);
    //gl_FragColor = vec4(smoothstep(0.1, 10.0, linearizeDepth(texture2D(normalDepthSampler, vUV).r)), 0.0, 0.0, 1.0);
    gl_FragColor = texture2D(normalDepthSampler, vUV);
    //gl_FragColor = vec4(origin, 1.0);
    //gl_FragColor = vec4(depth, depth, depth, 1.0);
    //gl_FragColor = vec4(noiseSample, 0.0, 1.0);
    //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

