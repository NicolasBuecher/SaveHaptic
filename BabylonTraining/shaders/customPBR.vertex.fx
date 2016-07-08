precision highp float;

// Attributes
attribute vec3 position;
#ifdef NORMAL
    attribute vec3 normal;
#endif
#ifdef UV1
    attribute vec2 uv;
#endif

// Uniforms
uniform mat4 world;
uniform mat4 viewProjection;

// Varying
#ifdef WORLDPOSITION
    varying vec3 vPosition;
#endif
#ifdef POJECTEDPOSITION
    varying vec4 outPos;
#endif
#ifdef NORMAL
    varying vec3 vNormal;
#endif
#ifdef UV1
    varying vec2 vUV;
#endif

void main(void)
{
    vec4 finalPos = viewProjection * world * vec4(position, 1.0);

    #ifdef WORLDPOSITION
        vPosition = position;
    #endif
    #ifdef PROJECTEDPOSITION
        outPos = finalPos;
    #endif
    #ifdef NORMAL
        vNormal = normal;
    #endif
    #ifdef UV1
        vUV = uv;
    #endif

    gl_Position = finalPos;

}