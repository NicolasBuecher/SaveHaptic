varying vec2 vDepth;
//varying vec4 vNormalDepth;

void main(void)
{
    //gl_FragColor = vNormalDepth;
    gl_FragColor.r = vDepth.x / vDepth.y;
}
