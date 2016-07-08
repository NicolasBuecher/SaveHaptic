precision highp float;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

uniform mat4 world;

uniform vec3 cameraPos;
uniform sampler2D textureSampler;

void main(void) {

    vec3 vLightPosition = vec3(0,20,10);

    // World values
    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
    vec3 viewDirectionW = normalize(cameraPos - vPositionW);

    // Light
    vec3 lightVectorW = normalize(vLightPosition - vPositionW);
    vec3 color = texture2D(textureSampler, vUV).rgb;

    // diffuse
    float ndl = max(0., dot(vNormalW, lightVectorW));

    // Specular
    vec3 angleW = normalize(viewDirectionW + lightVectorW);
    float specComp = max(0., dot(vNormalW, angleW));
    specComp = pow(specComp, max(1., 64.)) * 2.;

    gl_FragColor = vec4(color, 1.0);
    //gl_FragColor = vec4(vec3(color), 0.5);
    //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}