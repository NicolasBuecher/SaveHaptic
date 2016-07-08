uniform sampler2D scene;

varying vec2 vUV;

void main(void) {

    vec4 color = texture2D(scene, vUV);

    gl_FragColor = vec4(color.r, 0.0, 0.0, 1.0);
}