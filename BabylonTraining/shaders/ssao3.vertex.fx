uniform mat4 worldViewProjection;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUV;
varying vec3 vViewRay;

void main(void)
{
    vUV = uv;
    //vViewRay = viewProjection * position; // Ca marche pas puisque que le sahder ne s'applique plus à l'objet

    gl_Position = worldViewProjection * vec4(position, 1.0);
}