uniform mat4 normalMatrix;

varying vec3 vNormal;

void main(void)
{
    //mat4 normalMatrix = transpose(inverse(view * world));
    vec3 normal = mat3(normalMatrix) * vNormal;

    float depth =  1.0 - (2.0 / (100.0 + 1.0 - gl_FragCoord.z * (100.0 - 1.0)));

    gl_FragColor = vec4(normal, depth);
}

