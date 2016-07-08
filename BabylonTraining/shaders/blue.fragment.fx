uniform sampler2D resultScene;
uniform sampler2D originalScene;

varying vec2 vUV;

void main(void) {
/*
    vec4 color = texture2D(scene, vUV);

    gl_FragColor = vec4(0.0, 0.0, color.b, 1.0);*/

    vec4 resultColor = texture2D(resultScene, vUV);
    vec4 color = texture2D(originalScene, vUV);

    gl_FragColor = vec4(resultColor.r, resultColor.g, color.b, 1.0);

}