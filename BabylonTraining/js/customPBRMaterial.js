/**
 * Created by Nicolas Buecher on 06/07/2016.
 */

// TODO: Figure out what it does (heritage)
var __extends =
    (this && this.__extends) ||
    function (d, b)
    {
        for (var p in b)
        {
            if (b.hasOwnProperty(p))
            {
                d[p] = b[p];
            }
        }

        function __()
        {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

// TODO: Figure out what it does
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc)
    {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;

        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        {
            r = Reflect.decorate(decorators, target, key, desc);
        }
        else
        {
            for (var i = decorators.length - 1; i >= 0; i--)
            {
                if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }

        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };


// BABYLON namespace
var BABYLON;

(function (BABYLON) {
    // Build defines for the shaders
    var CustomPBRMaterialDefines = (function (_super)
    {
        // TODO: Figure out what it does (heritage)
        __extends(CustomPBRMaterialDefines, _super);

        // Constructor
        function CustomPBRMaterialDefines()
        {
            // Call parent constructor
            _super.call(this);

            // Properties
            this.ALBEDO = false;
            this.SPECULAR = false;
            this.NORMAL = false;
            this.UV1 = false;

            // At the first initialization, defines must be different from cachedDefines
            // During first initialization, this key will automatically be set to false by the reset operation of defines
            // So, it will never appear in the defines of the shader
            // During first initialization, this key set to false will be automatically cloned to cached defines
            // So, no issue with cached defines either
            this.NOTCACHED = true;

            // Delete and rebuild 'this'
            this.rebuild();
        }

        return CustomPBRMaterialDefines;
    } (BABYLON.MaterialDefines));

    // Build custom HapViz PBR material, based on BABYLON StandardMaterial structure
    var CustomPBRMaterial = (function (_super)
    {
        // TODO: Figure out what it does (heritage)
        __extends(CustomPBRMaterial, _super);

        // Constructor
        function CustomPBRMaterial(name, scene, options)
        {
            // Store this in private variable to use it further in callbacks
            var _this = this;

            // Call parent constructor
            _super.call(this, name, scene);

            // Initialize properties
            this.albedoColor = options.albedoColor || new BABYLON.Vector3(0.8, 0.2, 0.6);
            this.albedoTexture = options.albedoTexture || undefined;
            this.specularColor = options.specularColor || undefined;// || new BABYLON.Vector3(1.0, 1.0, 1.0);

            this._defines = new CustomPBRMaterialDefines();
            this._cachedDefines = new CustomPBRMaterialDefines();

            this.maxSimultaneousLights = 4;
        }

        // Methods
        // TODO: Figure out what it does
        CustomPBRMaterial.prototype._checkCache = function (scene, mesh, useInstances)
        {
            if (!mesh)
            {
                return true;
            }
            if (this._defines.INSTANCES !== useInstances)
            {
                return false;
            }
            if (mesh._materialDefines && mesh._materialDefines.isEqual(this._defines))
            {
                return true;
            }
            return false;
        };

        CustomPBRMaterial.BindLights = function (scene, mesh, effect, defines, useScalarInLinearSpace, maxSimultaneousLights, usePhysicalLightFalloff) 
        {
            maxSimultaneousLights = 4;
            useScalarInLinearSpace = false;
            usePhysicalLightFalloff = false;


            // Initialize values
            var lightIndex = 0;
            var depthValuesAlreadySet = false;

            // For each light in the scene, ???
            for (var index = 0; index < scene.lights.length; index++)
            {
                // Get the light
                var light = scene.lights[index];

                // Check if light is disabled
                if (!light.isEnabled())
                {
                    continue; // Skip this light for this mesh, go to the next one
                }

                // Check if mesh is not affected by light
                if (!light.canAffectMesh(mesh))
                {
                    continue; // Skip this light for this mesh, go to the next one
                }

                // If light is enabled and can affect mesh, go ahead

                // Compute some properties as transformed position of the light and set them to the effect
                // The properties bound depend on the light type :
                // PointLight: "vLightData" + index / vec4(transformedX, transformedY, transformedZ, 0)
                // DirectionalLight: "vLightData" + index / vec4(transformedX, transformedY, transformedZ, 1)
                // SpotLight: "vLightData" + index / vec4(transformedX, transformedY, transformedZ, exponent)
                //            "vLightDirection" + index / vec4(normalizeDirectionX, normalizeDirectionY, normalizeDirectionZ, cos(angle*5))
                // HemisphericLight: "vLightData" + index / vec4(normalizeDirectionX, normalizeDirectionY, normalizeDirectionZ, 0)
                //                   "vLightGround" + index / color3(groundColor.scale(intensity))
                BABYLON.MaterialHelper.BindLightProperties(light, effect, lightIndex);
/*
                // TODO: Add lightPower to lightPosition, manage multiple lights !
                
                // GAMMA CORRECTION.
                this.convertColorToLinearSpaceToRef(light.diffuse, PBRMaterial._scaledAlbedo, useScalarInLinearSpace);
                
                PBRMaterial._scaledAlbedo.scaleToRef(light.intensity, PBRMaterial._scaledAlbedo);
                
                effect.setColor4("vLightDiffuse" + lightIndex, PBRMaterial._scaledAlbedo, usePhysicalLightFalloff ? light.radius : light.range);
                
                if (defines["SPECULARTERM"])
                {
                    this.convertColorToLinearSpaceToRef(light.specular, PBRMaterial._scaledReflectivity, useScalarInLinearSpace);
                    PBRMaterial._scaledReflectivity.scaleToRef(light.intensity, PBRMaterial._scaledReflectivity);
                    effect.setColor3("vLightSpecular" + lightIndex, PBRMaterial._scaledReflectivity);
                }
                
                // Shadows
                if (scene.shadowsEnabled)
                {
                    depthValuesAlreadySet = BABYLON.MaterialHelper.BindLightShadow(light, scene, mesh, lightIndex, effect, depthValuesAlreadySet);
                }
                
                lightIndex++;
                
                if (lightIndex === maxSimultaneousLights)
                {
                    break;
                }*/
            }
        };
        
        // TODO
        CustomPBRMaterial.prototype.isReady = function (mesh, useInstances)
        {
            // Check if material is frozen to not reload it each frame
            if (this.isFrozen)
            {
                // If it's frozen, initialize it at least once
                if (this._wasPreviouslyReady)
                {
                    return true;
                }
            }

            // Get scene
            var scene = this.getScene();

            // Check if material has to be initialized each frame
            if (!this.checkReadyOnEveryCall)
            {
                // If not, check if we're in tha good render loop
                if (this._renderId === scene.getRenderId())
                {
                    // Look if material is already ready in cache
                    if (this._checkCache(scene, mesh, useInstances))
                    {
                        // If true, no need to check if material is ready again
                        return true;
                    }
                }
            }

            // Get engine
            var engine = scene.getEngine();

            // Initialize booleans
            var needNormals = false;
            var needUVs = false;

            // Reset all defines properties to 0 and false each time we want to check if material is ready (to avoid to keep old defines states)
            this._defines.reset();

            // Prepare textures except if textures are disabled in scene
            if (scene.texturesEnabled)
            {

                // General case :
                // For each texture property, check if property is defined AND if this specific texture has not been disabled
                // For material being ready, texture has to be ready. Otherwise, return false.
                // If at least one texture is needed, UVs have to be computed and sent to the vertex shader
                // For each enabled texture, enable its corresponding defines to use it in the shaders

                // Albedo texture
                if (this.albedoTexture && CustomPBRMaterial.AlbedoTextureEnabled)
                {
                    if (!this.albedoTexture.isReady())
                    {
                        return false;
                    }
                    else
                    {
                        needUVs = true;
                        this._defines.ALBEDO = true;
                    }
                }

            }

            if (this.specularColor)
            {
                this._defines.SPECULAR = true;
            }

            // Prepare effects enabling their corresponding defines in the shaders
/*
            // TODO: Look at what it does
            if (scene.clipPlane)
            {
                this._defines.CLIPPLANE = true;
            }
            // TODO: Look at what it does
            if (engine.getAlphaTesting())
            {
                this._defines.ALPHATEST = true;
            }
            // TODO: Look at what it does
            if (this._shouldUseAlphaFromDiffuseTexture())
            {
                this._defines.ALPHAFROMDIFFUSE = true;
            }
            // TODO: Look at what it does
            if (this.useEmissiveAsIllumination)
            {
                this._defines.EMISSIVEASILLUMINATION = true;
            }
            // TODO: Look at what it does
            if (this.linkEmissiveWithDiffuse)
            {
                this._defines.LINKEMISSIVEWITHDIFFUSE = true;
            }
            // TODO: Look at what it does
            if (this.useLogarithmicDepth)
            {
                this._defines.LOGARITHMICDEPTH = true;
            }

            // TODO: Look at what it does (Point size)
            if (this.pointsCloud || scene.forcePointsCloud)
            {
                this._defines.POINTSIZE = true;
            }

            // Enable fog part in the shaders if we meet all the necessary requirements
            if (scene.fogEnabled && mesh && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE && this.fogEnabled)
            {
                this._defines.FOG = true;
            }
*/
            // Enable lighting part in the shaders, except if it has been exceptionally disabled
            // For each light, a "LIGHT" + index define is created
            // Defines prepared depend on light type :
            // PointLight: "POINTLIGHT" + index
            // DirectionalLight: "DIRLIGHT" + index
            // SpotLight: "SPOTLIGHT" + index
            // HemisphericLight: "HEMILIGHT" + index
            // Besides, "SPECULARTERM" is defined if at least one light.specular is defined
            // Besides, create also shadow defines
            if (scene.lightsEnabled && !this.disableLighting)
            {
                needNormals = BABYLON.MaterialHelper.PrepareDefinesForLights(scene, mesh, this._defines, this.maxSimultaneousLights);
            }
/*

            if (CustomPBRMaterial.FresnelEnabled)
            {
                // Fresnel
                if (this.diffuseFresnelParameters && this.diffuseFresnelParameters.isEnabled ||
                    this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled ||
                    this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled ||
                    this.refractionFresnelParameters && this.refractionFresnelParameters.isEnabled ||
                    this.reflectionFresnelParameters && this.reflectionFresnelParameters.isEnabled) {
                    if (this.diffuseFresnelParameters && this.diffuseFresnelParameters.isEnabled) {
                        this._defines.DIFFUSEFRESNEL = true;
                    }
                    if (this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled) {
                        this._defines.OPACITYFRESNEL = true;
                    }
                    if (this.reflectionFresnelParameters && this.reflectionFresnelParameters.isEnabled) {
                        this._defines.REFLECTIONFRESNEL = true;
                        if (this.useReflectionFresnelFromSpecular) {
                            this._defines.REFLECTIONFRESNELFROMSPECULAR = true;
                        }
                    }
                    if (this.refractionFresnelParameters && this.refractionFresnelParameters.isEnabled) {
                        this._defines.REFRACTIONFRESNEL = true;
                    }
                    if (this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled) {
                        this._defines.EMISSIVEFRESNEL = true;
                    }
                    needNormals = true;
                    this._defines.FRESNEL = true;
                }
            }
            if (this._defines.SPECULARTERM && this.useSpecularOverAlpha) {
                this._defines.SPECULAROVERALPHA = true;
            }*/

            // Prepare attributes defines for the shaders
            if (mesh)
            {
                // To enable normals in shaders, normal data has to be available in mesh
                if (needNormals && mesh.isVerticesDataPresent(BABYLON.VertexBuffer.NormalKind))
                {
                    this._defines.NORMAL = true;
                }
                // To enable UVs in shaders, uv data has to be available in mesh
                if (needUVs)
                {
                    if (mesh.isVerticesDataPresent(BABYLON.VertexBuffer.UVKind))
                    {
                        this._defines.UV1 = true;
                    }/*
                    if (mesh.isVerticesDataPresent(BABYLON.VertexBuffer.UV2Kind))
                    {
                        this._defines.UV2 = true;
                    }*/
                }

                /*
                // To enable color in vertex shaders, color data has to be available in mesh
                if (mesh.useVertexColors && mesh.isVerticesDataPresent(BABYLON.VertexBuffer.ColorKind))
                {
                    this._defines.VERTEXCOLOR = true;

                    // To enable alpha in vertex shaders, alpha data has to be available in mesh
                    if (mesh.hasVertexAlpha)
                    {
                        this._defines.VERTEXALPHA = true;
                    }
                }

                if (mesh.useBones && mesh.computeBonesUsingShaders)
                {
                    this._defines.NUM_BONE_INFLUENCERS = mesh.numBoneInfluencers;
                    this._defines.BonesPerMesh = (mesh.skeleton.bones.length + 1);
                }
                // Instances
                if (useInstances)
                {
                    this._defines.INSTANCES = true;
                }*/
            }

            // Check if defines have already been cached, get the correct effect otherwise
            if (!this._defines.isEqual(this._cachedDefines))
            {
                // Put defines into cache
                this._defines.cloneTo(this._cachedDefines);

                // TODO: Look at what it does
                scene.resetCachedMaterial();

                // Prepare fallbacks
                var fallbacks = new BABYLON.EffectFallbacks();
                /*
                // For each define enabled, add a corresponding fallback
                if (this._defines.REFLECTION)
                {
                    fallbacks.addFallback(0, "REFLECTION");
                }
                if (this._defines.SPECULAR)
                {
                    fallbacks.addFallback(0, "SPECULAR");
                }
                if (this._defines.BUMP)
                {
                    fallbacks.addFallback(0, "BUMP");
                }
                if (this._defines.PARALLAX)
                {
                    fallbacks.addFallback(1, "PARALLAX");
                }
                if (this._defines.PARALLAXOCCLUSION)
                {
                    fallbacks.addFallback(0, "PARALLAXOCCLUSION");
                }
                if (this._defines.SPECULAROVERALPHA)
                {
                    fallbacks.addFallback(0, "SPECULAROVERALPHA");
                }
                if (this._defines.FOG)
                {
                    fallbacks.addFallback(1, "FOG");
                }
                if (this._defines.POINTSIZE)
                {
                    fallbacks.addFallback(0, "POINTSIZE");
                }
                if (this._defines.LOGARITHMICDEPTH)
                {
                    fallbacks.addFallback(0, "LOGARITHMICDEPTH");
                }

                BABYLON.MaterialHelper.HandleFallbacksForShadows(this._defines, fallbacks, this.maxSimultaneousLights);

                if (this._defines.SPECULARTERM)
                {
                    fallbacks.addFallback(0, "SPECULARTERM");
                }
                if (this._defines.DIFFUSEFRESNEL)
                {
                    fallbacks.addFallback(1, "DIFFUSEFRESNEL");
                }
                if (this._defines.OPACITYFRESNEL)
                {
                    fallbacks.addFallback(2, "OPACITYFRESNEL");
                }
                if (this._defines.REFLECTIONFRESNEL)
                {
                    fallbacks.addFallback(3, "REFLECTIONFRESNEL");
                }
                if (this._defines.EMISSIVEFRESNEL)
                {
                    fallbacks.addFallback(4, "EMISSIVEFRESNEL");
                }
                if (this._defines.FRESNEL)
                {
                    fallbacks.addFallback(4, "FRESNEL");
                }*/

                // Prepare attributes array
                var attribs = [BABYLON.VertexBuffer.PositionKind];

                // For each attribute define enabled, push the corresponding string into the array
                if (this._defines.NORMAL)
                {
                    attribs.push(BABYLON.VertexBuffer.NormalKind);
                }
                if (this._defines.UV1)
                {
                    attribs.push(BABYLON.VertexBuffer.UVKind);
                }/*
                if (this._defines.UV2)
                {
                    attribs.push(BABYLON.VertexBuffer.UV2Kind);
                }
                if (this._defines.VERTEXCOLOR)
                {
                    attribs.push(BABYLON.VertexBuffer.ColorKind);
                }*/
/*
                BABYLON.MaterialHelper.PrepareAttributesForBones(attribs, mesh, this._defines, fallbacks);
                BABYLON.MaterialHelper.PrepareAttributesForInstances(attribs, this._defines);
*/


                // Specify custom PBR shader path
                var shaderName = "./shaders/customPBR";

                // TODO: Look at what it does (Legacy browser patch)
                /*if (!scene.getEngine().getCaps().standardDerivatives)
                {
                    shaderName = "legacydefault";
                }*/

                // Make a string with all the defines
                var join = this._defines.toString();

                // Prepare the uniforms array (hard coded)
                var uniforms = ["world", "viewProjection", "albedoColor", "specularColor"];
                // TODO: I think if they are not defined, they don't need to be in this array. Clean this up.
                /*var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vAmbientColor", "vDiffuseColor", "vSpecularColor", "vEmissiveColor",
                    "vFogInfos", "vFogColor", "pointSize",
                    "vDiffuseInfos", "vAmbientInfos", "vOpacityInfos", "vReflectionInfos", "vEmissiveInfos", "vSpecularInfos", "vBumpInfos", "vLightmapInfos", "vRefractionInfos",
                    "mBones",
                    "vClipPlane", "diffuseMatrix", "ambientMatrix", "opacityMatrix", "reflectionMatrix", "emissiveMatrix", "specularMatrix", "bumpMatrix", "lightmapMatrix", "refractionMatrix",
                    "depthValues",
                    "diffuseLeftColor", "diffuseRightColor", "opacityParts", "reflectionLeftColor", "reflectionRightColor", "emissiveLeftColor", "emissiveRightColor", "refractionLeftColor", "refractionRightColor",
                    "logarithmicDepthConstant"
                ];*/

                // Prepare the samplers array (hard coded)
                var samplers = ["albedoTexture"];
                // TODO: I think if they are not defined, they don't need to be in this array. Clean this up.
                //var samplers = ["diffuseSampler", "ambientSampler", "opacitySampler", "reflectionCubeSampler", "reflection2DSampler", "emissiveSampler", "specularSampler", "bumpSampler", "lightmapSampler", "refractionCubeSampler", "refraction2DSampler"];

                //uniforms.push("Light1Position", "light1Power", "cameraPosition", "albedoColor", "microsurface", "reflectivity", "specularColor", "glossiness", "AOPower", "lighSize", "indirectLightPower");
                //samplers.push("albedoTexture", "microsurfaceTexture", "reflectivityTexture", "ReflectionTexture", "bumpTexture", "AOTexture", "shadowSampler", "shadowTex");

                // TODO: Look at what it does deeper
                //BABYLON.MaterialHelper.PrepareUniformsAndSamplersList(uniforms, samplers, this._defines, this.maxSimultaneousLights);

                // Finally create the effect with all previous initializations
                this._effect = scene.getEngine().createEffect(
                    shaderName,                                                 // Shader path
                    attribs,                                                    // Attributes array
                    uniforms,                                                   // Uniforms array
                    samplers,                                                   // Samplers array
                    join,                                                       // Defines string
                    fallbacks,                                                  // Fallbacks for defines
                    this.onCompiled,                                            // On compilation success callback
                    this.onError,                                               // On compilation error callback
                    {
                        maxSimultaneousLights: this.maxSimultaneousLights - 1
                    }
                );
            }

            // Material can't be ready if the created effect isn't ready
            if (!this._effect.isReady())
            {
                return false;
            }

            // Get current loop
            this._renderId = scene.getRenderId();

            // Material has been initialized once, keep track of that of later operations
            this._wasPreviouslyReady = true;

            // If a mesh is provided, clone this material defines to the mesh material defines
            if (mesh)
            {
                if (!mesh._materialDefines)
                {
                    mesh._materialDefines = new CustomPBRMaterialDefines();
                }
                this._defines.cloneTo(mesh._materialDefines);
            }

            // Material is now ready
            return true;
        };

        /*
        CustomPBRMaterial.prototype.unbind = function ()
        {
            if (this.reflectionTexture && this.reflectionTexture.isRenderTarget)
            {
                this._effect.setTexture("reflection2DSampler", null);
            }

            if (this.refractionTexture && this.refractionTexture.isRenderTarget)
            {
                this._effect.setTexture("refraction2DSampler", null);
            }

            _super.prototype.unbind.call(this);
        };
*/

        // TODO: Fill
        CustomPBRMaterial.prototype.bind = function (world, mesh)
        {
            // Get scene
            var scene = this.getScene();

            // Set matrices
            this._effect.setMatrix("world", world);
            this._effect.setMatrix("viewProjection", scene.getTransformMatrix());

            // If material has not already been cached
            if (scene.getCachedMaterial() !== this)
            {
/*
                //this._effect.setVector3("Light1Position", ???);
                //this._effect.setFloat("light1Power", ???);
                this._effect.setVector3("cameraPosition", scene.activeCamera.position);
                this._effect.setVector3("albedoColor", new BABYLON.Vector3(0.8, 0.2, 0.6));
                this._effect.setFloat("microsurface", 0.0);
                this._effect.setFloat("reflectivity", 0.5);
                this._effect.setVector3("specularColor", new BABYLON.Vector3(1, 1, 1));
                this._effect.setFloat("glossiness", 50.0);
                this._effect.setFloat("AOPower", 1.0);
                this._effect.setFloat("lightSize", 5);
                this._effect.setFloat("indirectLightPower", 0.6);

                this._effect.setTexture("albedoTexture", this.albedoTexture);
                //this._effect.setTexture("microsurfaceTexture", whiteTEX);
                //this._effect.setTexture("reflectivityTexture", whiteTEX);
                //this._effect.setTexture("ReflectionTexture", ???);
                //this._effect.setTexture("bumpTexture", ???);
                //this._effect.setTexture("AOTexture", ???);
                //this._effect.setTexture("shadowSampler", ???);
                //this._effect.setTexture("shadowTex", ???);
*/

                // Set textures, except if textures have been disabled in scene
                if (scene.texturesEnabled)
                {
                    // For each texture property, check if property is defined AND if this specific texture has not been disabled
                    // Set texture to the effect

                    if (this.albedoTexture && CustomPBRMaterial.AlbedoTextureEnabled)
                    {
                        this._effect.setTexture("albedoTexture", this.albedoTexture);
                    }

                }
                /*
                // Clip plane
                BABYLON.MaterialHelper.BindClipPlane(this._effect, scene);
                    
                // Point size
                if (this.pointsCloud) 
                {
                    this._effect.setFloat("pointSize", this.pointSize);
                }
                    */
                // Colors
                //this._effect.setColor3("albedoColor", this.albedoColor);
                this._effect.setVector3("albedoColor", this.albedoColor);
                if (this._defines.SPECULAR)
                {
                    this._effect.setVector3("specularColor", this.specularColor);
                }
                /*
                scene.ambientColor.multiplyToRef(this.ambientColor, this._globalAmbientColor);
                this._effect.setVector3("vEyePosition", scene._mirroredCameraPosition ? scene._mirroredCameraPosition : scene.activeCamera.position);
                this._effect.setColor3("vAmbientColor", this._globalAmbientColor);

                if (this._defines.SPECULARTERM)
                {
                    this._effect.setColor4("vSpecularColor", this.specularColor, this.specularPower);
                }

                this._effect.setColor3("vEmissiveColor", this.emissiveColor);*/
            }
                
            if (scene.getCachedMaterial() !== this || !this.isFrozen) 
            {
                if (scene.lightsEnabled && !this.disableLighting)
                {
                    CustomPBRMaterial.BindLights(scene, mesh, this._effect, this._defines, this.useScalarInLinearSpace, this.maxSimultaneousLights, this.usePhysicalLightFalloff);
                }
                /*
                // Diffuse
                this._effect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);
                
                // Lights
                if (scene.lightsEnabled && !this.disableLighting)
                {
                    BABYLON.MaterialHelper.BindLights(scene, mesh, this._effect, this._defines, this.maxSimultaneousLights);
                }
                
                // View
                if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE || this.reflectionTexture || this.refractionTexture) 
                {
                    this._effect.setMatrix("view", scene.getViewMatrix());
                }
                
                // Fog
                BABYLON.MaterialHelper.BindFogParameters(scene, mesh, this._effect);
                
                // Log. depth
                BABYLON.MaterialHelper.BindLogDepth(this._defines, this._effect, scene);*/
            }
                
            _super.prototype.bind.call(this, world, mesh);
        };

        CustomPBRMaterial.prototype.dispose = function (forceDisposeEffect, forceDisposeTextures)
        {
            if (forceDisposeTextures)
            {
                if (this.albedoTexture)
                {
                    this.albedoTexture.dispose();
                }
            }

            _super.prototype.dispose.call(this, forceDisposeEffect, forceDisposeTextures);
        };

        CustomPBRMaterial.prototype.clone = function (name)
        {
            var _this = this;
            return BABYLON.SerializationHelper.Clone(
                function ()
                {
                    return new CustomPBRMaterial(name, _this.getScene());
                },
                this
            );
        };

        CustomPBRMaterial.prototype.serialize = function ()
        {
            return BABYLON.SerializationHelper.Serialize(this);
        };

        // Statics
        CustomPBRMaterial.Parse = function (source, scene, rootUrl)
        {
            return BABYLON.SerializationHelper.Parse(
                function ()
                {
                    return new CustomPBRMaterial(source.name, scene);
                },
                source,
                scene,
                rootUrl
            );
        };

        // Flags used to enable or disable a type of texture for all Custom PBR Materials
        CustomPBRMaterial.AlbedoTextureEnabled = true;

        __decorate([
            BABYLON.serializeAsTexture()
        ], CustomPBRMaterial.prototype, "albedoTexture", void 0);

        __decorate([
            BABYLON.serializeAsColor3("albedo")
        ], CustomPBRMaterial.prototype, "albedoColor", void 0);

        __decorate([
            BABYLON.serializeAsColor3("specular")
        ], CustomPBRMaterial.prototype, "specularColor", void 0);

        return CustomPBRMaterial;
    }(BABYLON.Material));

    BABYLON.CustomPBRMaterial = CustomPBRMaterial;

}) (BABYLON || (BABYLON = {}));
