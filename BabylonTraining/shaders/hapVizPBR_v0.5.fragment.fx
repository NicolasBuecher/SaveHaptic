// ############### HAPTICMEDIA hapViz PRB shader ###############
// ############### author : Loic Muhlmann ###############
// ############### VERSION: V0.5 ###############

// If normal texture !!!!!!!!!!!!!!!!
#extension GL_OES_standard_derivatives : enable

precision highp float;

// ############################## ENTRIES ##############################

// Uniforms

//Manage multiple lights!!!!!!!!!!!!!!!!
uniform vec3 Light1Position;
uniform float light1Power;

uniform vec3 cameraPosition;
uniform mat4 world;

// varying
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUV;
varying vec4 outPos; // If SSAO used !!!!!!!

// user entries

uniform vec3 albedoColor;
uniform sampler2D albedoTexture;
uniform float microsurface;
uniform sampler2D microsurfaceTexture;
uniform float reflectivity;
uniform sampler2D reflectivityTexture;

uniform vec3 specularColor;
uniform float glossiness;

uniform samplerCube ReflectionTexture;

uniform sampler2D bumpTexture;
uniform	sampler2D AOTexture;
uniform float AOPower;

uniform	samplerCube shadowSampler;
uniform	samplerCube shadowTex;
float bias = 0.00001;
uniform float lightSize;
// uniform vec2 depthValues; //minZ et maxZ de la camera
vec2 depthValues = vec2(0.7, 40.0);

uniform float indirectLightPower;

// ############################## TOOLS ##############################

vec2 phongBDRF( vec3 vPosW, vec3 lightPos, float gloss, vec3 normal, vec3 eyeDir )
{
    
    vec3 lightDirection = normalize(lightPos - vPosW);
    float lightDistance = distance(vPosition, lightPos);
    float lightAtenuation = sqrt(1./lightDistance);
    
    // compute diffuse lighting
    
    float LightPower = max(0., dot(normal, lightDirection));
    float Diffuse = LightPower * lightAtenuation;
    
    // compute specular Lighting

    vec3 angleW = normalize(eyeDir + lightDirection);
    float Specular = max(0., dot(normal, angleW));
    Specular = (pow(Specular, max(1.0 , gloss)) * 2.0) * lightAtenuation;

    return vec2 (Diffuse, Specular);
}

// if normal texture !!!!!!!!!!!!!!
// normal mapping

mat3 cotangent_frame(vec3 normal, vec3 p, vec2 uv)
{
    // get edge vectors of the pixel triangle
    vec3 dp1 = dFdx(p);
    vec3 dp2 = dFdy(p);
    vec2 duv1 = dFdx(uv);
    vec2 duv2 = dFdy(uv);

    // solve the linear system
    vec3 dp2perp = cross(dp2, normal);
    vec3 dp1perp = cross(normal, dp1);
    vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 binormal = dp2perp * duv1.y + dp1perp * duv2.y;

    // construct a scale-invariant frame 
    float invmax = inversesqrt(max(dot(tangent, tangent), dot(binormal, binormal)));
    return mat3(tangent * invmax, binormal * invmax, normal);
}

vec3 perturbNormal(vec3 viewDir, vec3 vNormalW)
{
    vec3 map = texture2D(bumpTexture, vUV).xyz;
    map = map * 255.0 / 127.0 - 128.0 / 127.0;
    mat3 TBN = cotangent_frame(vNormalW, viewDir, vUV);
    return normalize(TBN * map);
}

float unpack(vec4 color)
{
    const vec4 bit_shift = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);
    return dot(color, bit_shift);
}

float depthCompare(vec3 coords, float compare, float shadow_rough){
    float depth = unpack(textureCube(shadowSampler, coords)) + bias;
    if (depth < compare) return 0.0;
    else return shadow_rough;
}

float computeShadowCube(vec3 vPositionW, vec3 lightPos)
{
    //depth = receiver distance
    //shadow = blocker distance
    
    vec3 directionToLight = vPositionW - lightPos;
    float depth = length(directionToLight);
    depth = (depth - depthValues.x) / (depthValues.y - depthValues.x);
    depth = clamp(depth, 0., 1.0);
    
    directionToLight = normalize(directionToLight);
    directionToLight.y = -directionToLight.y;

    float shadow = unpack(textureCube(shadowSampler, directionToLight)); + bias;
    
    float penumbra = lightSize * depth * 10.0;
    
    float shadow_rough = textureCube(shadowTex, directionToLight).r;
    
    float shadow_color = textureCube(shadowTex, directionToLight, penumbra).r; 
    
    float biasedDepth = depth - bias;
    
    float visibility = depthCompare(directionToLight, biasedDepth, shadow_rough);
    
    float invShadow = shadow_color * (1.0 - visibility);
    
    return  1.0 - invShadow;
        
}

float computeFresnel (vec3 viewDirectionW, vec3 normalBlend, float reflectivityBlend) {
    if(reflectivityBlend > 0.0) {
        float fresnelTerm = dot(viewDirectionW, normalBlend);
        return clamp(reflectivityBlend * 2.0 - fresnelTerm, 0., 1.0);
    }
    return 0.0;
}

// ############################## VOID ##############################

void main(void) {

    // ************** World values ************** //
    
    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
    
    // 
    
    vec3 albedoBlend = texture2D(albedoTexture, vUV).rgb * albedoColor;
    float microsurfaceBlend = texture2D(microsurfaceTexture, vUV).r * microsurface * 10.0;
    float reflectivityBlend = texture2D(reflectivityTexture, vUV).r * reflectivity;
    
    // If bump map !!!!!!!!
    // vec3 normalBlend = perturbNormal(viewDirectionW, vNormalW); // Si pas de normal Texture, normalBlend = vNormalW !!!!!!!!!!
    //else
    vec3 normalBlend = vNormalW;
    
    vec3 R = 2.0 * dot( viewDirectionW, normalBlend ) * normalBlend - viewDirectionW;

    // ************** DIRECT ************** //

    //To do for each lights !!!!!!!!!!
    vec2 directFactors = phongBDRF(vPositionW, Light1Position, glossiness, normalBlend, viewDirectionW);

    // Direct Specular
    vec3 directSpecular = specularColor * directFactors.y;

    // ************** REFLECTIONS ************** //
    
    vec3 IndirectSpecular = textureCube( ReflectionTexture, R, microsurfaceBlend).rgb;

    //if IBL activated
    // vec3 ambiant = textureCube( ReflectionTexture, vNormalW, 50.0).rgb;

    // ************** FRESNEL ************** //

    //standard method
    float reflPower = computeFresnel(viewDirectionW, normalBlend, reflectivityBlend);
    
    // ************** AO ************** //
    
    //If SSAO
    vec2 screenCoords;
    screenCoords.x = outPos.x / outPos.w / 2.0 + 0.5;
    screenCoords.y = outPos.y / outPos.w / 2.0 + 0.5;
    
    float SSAOShadowTex = mix(1.0, texture2D(AOTexture, screenCoords).r, AOPower); // if SSAO not used, UV coordinates
    float SSAOLightTex = mix(1.0, texture2D(AOTexture, screenCoords).g, AOPower); // if SSAO not used, UV coordinates
    
    // ************** SHADOW ************** //
    
    // for each shadow emitter lights
    float shadow = computeShadowCube(vPositionW, Light1Position);

    
    // ************** LIGHTING ************** //
    
    // Direct Lighting
    
    // multiply each light contributions
    float directLighting = directFactors.x * shadow * light1Power;

    // Inidrect Lighting
    float indirectLighting = mix(1.0, SSAOShadowTex, 1.0 - shadow) * indirectLightPower;
    
    float finalLighting = directLighting + indirectLighting;
    finalLighting *= SSAOLightTex;

    // ************** BLENDINGS ************** //
    
    vec3 finalDiffuse = albedoBlend;
    
    vec3 finalSpecular = IndirectSpecular * reflPower + directSpecular;
    
    // energy conservation

    float energyConsumption = clamp(reflPower + directSpecular.r, 0., 1.);
    
    vec3 finalColor = finalDiffuse * (1.0 - energyConsumption) + finalSpecular;
    
    gl_FragColor = vec4( vec3(finalColor * finalLighting), 1.0);
}
