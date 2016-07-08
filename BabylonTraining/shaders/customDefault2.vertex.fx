uniform mat4 world;
uniform mat4 viewProjection;

attribute vec3 position;

void main(void)
{
    gl_Position = viewProjection * world * vec4(position, 1.0);
}