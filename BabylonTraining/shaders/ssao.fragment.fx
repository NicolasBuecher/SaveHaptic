uniform sampler2D noiseTexture;
uniform sampler2D amigaTexture;

void main(void) {
    vec2 resolution = vec2(512.0, 256.0);
    float zr = 1.0 - texture2D( amigaTexture, gl_FragCoord.xy / resolution ).x;

    float ao = 0.0;

    for( int i = 0; i < 8; i++ )
    {
        // get a random 2D offset vector
        vec2 noiseResolution = vec2(256.0, 256.0);
        vec2 off = -1.0 + 2.0*texture2D( noiseTexture, (gl_FragCoord.xy + 23.71*float(i))/noiseResolution ).xz;
        // sample the zbuffer at a neightbor pixel (in a 16 pixel radious)
        float z = 1.0 - texture2D( amigaTexture, (gl_FragCoord.xy + floor(off*16.0))/resolution ).x;
        // accumulate occlusion if difference is less than 0.1 units
    	ao += clamp( (zr-z)/0.1, 0.0, 1.0);
    }

    ao = clamp( 1.0 - ao/8.0, 0.0, 1.0 );

    vec3 col = vec3(ao);

    col *= texture2D( amigaTexture, gl_FragCoord.xy / resolution ).xyz;

    gl_FragColor = vec4(col, 1.0);
}