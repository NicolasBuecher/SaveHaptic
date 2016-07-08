#extension GL_OES_standard_derivatives : enable

precision highp float;

// Varying
#ifdef WORLDPOSITION
    varying vec3 vPosition;
#endif
#ifdef PROJECTEDPOSITION
    varying vec4 outPos; // If SSAO used !!!!!!!
#endif
#ifdef NORMAL
    varying vec3 vNormal;
#endif
#ifdef UV1
    varying vec2 vUV;
#endif


// User entries
uniform vec3 albedoColor;
#ifdef ALBEDO
    uniform sampler2D albedoTexture;
#endif
#ifdef SPECULAR
    uniform vec3 specularColor;
#endif







// Lights
// Babylon ONLY looks for includes into its own include folder. You can fool it by using "../" three times to return into your project folder.
// Also, it's NECESSARY to use an include if you want to use the internal Babylon parser for shaders (in order to use {X} notation for example)
#include<../../../shaders/includeLightFragment>[0..maxSimultaneousLights]





#ifdef WORLDPOSITION
vec2 phongBDRF(vec3 vPosW, vec3 lightPos, float gloss, vec3 normal, vec3 eyeDir)
{

    vec3 lightDirection = normalize(lightPos - vPosW);
    float lightDistance = distance(vPosition, lightPos);
    float lightAtenuation = sqrt(1.0/lightDistance);

    // compute diffuse lighting

    float lightPower = max(0., dot(normal, lightDirection));
    float diffuse = lightPower * lightAtenuation;

    // compute specular Lighting

    vec3 angleW = normalize(eyeDir + lightDirection);
    float specular = max(0., dot(normal, angleW));
    specular = (pow(specular, max(1.0 , gloss)) * 2.0) * lightAtenuation;

    return vec2 (diffuse, specular);
}
#endif




void main(void)
{





    vec3 albedoBlend = albedoColor;

    #ifdef ALBEDO
        albedoBlend *= texture2D(albedoTexture, vUV).rgb;
    #endif

    //To do for each lights !!!!!!!!!!
    //vec2 directFactors = phongBDRF(vPositionW, Light1Position, glossiness, normalBlend, viewDirectionW);

    #ifdef SPECULAR
        vec3 specularBlend = specularColor;
    #endif

    vec3 color = albedoBlend;

    #ifdef SPECULAR
        color += specularBlend;
    #endif

    gl_FragColor = vec4(color, 1.0);
}