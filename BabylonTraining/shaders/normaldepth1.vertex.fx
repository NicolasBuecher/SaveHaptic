uniform mat4 worldViewProjection;

attribute vec3 position;
attribute vec3 normal;

varying vec2 vDepth;
//varying vec4 vNormalDepth;

void main(void)
{
    vec4 outputPosition = worldViewProjection * vec4(position, 1.0);
    gl_Position = outputPosition;

    //vNormalDepth.xyz = normal;
    //vNormalDepth.w = outputPosition.z / outputPosition.w;
    vDepth.xy = outputPosition.zw;
}
