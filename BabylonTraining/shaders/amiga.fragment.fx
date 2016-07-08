precision highp float;
varying vec2 vUV;

uniform sampler2D amigaTexture;

void main(void) {
    gl_FragColor = texture2D(amigaTexture, vUV);
}