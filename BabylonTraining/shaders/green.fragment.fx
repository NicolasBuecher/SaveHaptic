uniform sampler2D resultScene;
uniform sampler2D originalScene;

varying vec2 vUV;

void main(void) {

    vec4 resultColor = texture2D(resultScene, vUV);
    vec4 color = texture2D(originalScene, vUV);

    gl_FragColor = vec4(resultColor.r, color.g, 0.0, 1.0);
    //gl_FragColor = color;
    //gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}