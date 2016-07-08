uniform mat4 worldViewProjection;
uniform mat4 world;

attribute vec3 position;
attribute vec3 normal;

varying vec3 vNormal;

void main(void)
{
    vNormal = vec3(world * vec4(normal, 0.0));

    gl_Position = worldViewProjection * vec4(position, 1.0);
}