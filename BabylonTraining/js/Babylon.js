/**
 * Created by Nicolas Buecher on 13/06/2016.
 */

var Babylon = Babylon || {};

Babylon.run = function()
{

    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, false, {limitDeviceRatio: 1});
    //var engine = new BABYLON.Engine(canvas, true);
    var fpsLabel = document.getElementById('fpsLabel');

    var createScene = function()
    {
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(engine);

        // create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera('camera1', 3*Math.PI/2, Math.PI/3, 15, new BABYLON.Vector3(0, 0, 0), scene);
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // attach the camera to the canvas
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
        // create a basic light, aiming 0,0,0 from 0,1,-1
        var light2 = new BABYLON.DirectionalLight('light2', new BABYLON.Vector3(0,-1,1), scene);
        light2.intensity = 0.2;
        // create a basic light, positioned at 0,15,0
        var light3 = new BABYLON.PointLight('light3', new BABYLON.Vector3(0,15,0), scene);


        /////////////////
        // CUSTOM PART //
        /////////////////


        // create geometry
        var ground = new BABYLON.Mesh.CreateGround("ground", 10.0, 5.0, 1, scene);
        var wallLeft = new BABYLON.Mesh.CreatePlane("wallLeft", 5.0, scene);
        wallLeft.rotation.y = -Math.PI/2;
        wallLeft.position.x = -5;
        wallLeft.position.y = +2.5;
        var wallRight = new BABYLON.Mesh.CreatePlane("wallRight", 5.0, scene);
        wallRight.rotation.y = Math.PI/2;
        wallRight.position.x = +5;
        wallRight.position.y = +2.5;
        var wallCenter = new BABYLON.Mesh.CreatePlane("wallCenter", 5.0, scene);
        wallCenter.scaling.x = 2;
        wallCenter.position.z = +2.5;
        wallCenter.position.y = +2.5;
        var cupboardLeft = new BABYLON.Mesh.CreateBox("cupboardLeft", 1.0, scene);
        cupboardLeft.scaling.x = 2;
        cupboardLeft.scaling.y = 3;
        cupboardLeft.scaling.z = 2;
        cupboardLeft.position.x = -1;
        cupboardLeft.position.y = +1.5;
        cupboardLeft.position.z = +1.5;
        var cupboardRightBack = new BABYLON.Mesh.CreateBox("cupboardRightBack", 1.0, scene);
        cupboardRightBack.scaling.x = 2;
        cupboardRightBack.scaling.y = 3;
        cupboardRightBack.scaling.z = 0.1;
        cupboardRightBack.position.x = +1;
        cupboardRightBack.position.y = +1.5;
        cupboardRightBack.position.z = +2.45;
        var cupboardRightTop = new BABYLON.Mesh.CreateBox("cupboardRightTop", 1.0, scene);
        cupboardRightTop.scaling.x = 1.8;
        cupboardRightTop.scaling.y = 0.1;
        cupboardRightTop.scaling.z = 1.8;
        cupboardRightTop.position.x = +1;
        cupboardRightTop.position.y = +2.95;
        cupboardRightTop.position.z = +1.5;
        var cupboardRightBottom = new BABYLON.Mesh.CreateBox("cupboardRightBottom", 1.0, scene);
        cupboardRightBottom.scaling.x = 1.8;
        cupboardRightBottom.scaling.y = 0.1;
        cupboardRightBottom.scaling.z = 1.8;
        cupboardRightBottom.position.x = +1;
        cupboardRightBottom.position.y = +0.05;
        cupboardRightBottom.position.z = +1.5;
        var cupboardRightLeft = new BABYLON.Mesh.CreateBox("cupboardRightLeft", 1.0, scene);
        cupboardRightLeft.scaling.x = 0.1;
        cupboardRightLeft.scaling.y = 3;
        cupboardRightLeft.scaling.z = 1.8;
        cupboardRightLeft.position.x = +0.05;
        cupboardRightLeft.position.y = +1.5;
        cupboardRightLeft.position.z = +1.5;
        var cupboardRightRight = new BABYLON.Mesh.CreateBox("cupboardRightRight", 1.0, scene);
        cupboardRightRight.scaling.x = 0.1;
        cupboardRightRight.scaling.y = 3;
        cupboardRightRight.scaling.z = 1.8;
        cupboardRightRight.position.x = +1.95;
        cupboardRightRight.position.y = +1.5;
        cupboardRightRight.position.z = +1.5;
        var cupboardRightCenterTop = new BABYLON.Mesh.CreateBox("cupboardRightCenterTop", 1.0, scene);
        cupboardRightCenterTop.scaling.x = 1.8;
        cupboardRightCenterTop.scaling.y = 0.1;
        cupboardRightCenterTop.scaling.z = 1.8;
        cupboardRightCenterTop.position.x = +1;
        cupboardRightCenterTop.position.y = +2.05;
        cupboardRightCenterTop.position.z = +1.5;
        var cupboardRightCenterBottom = new BABYLON.Mesh.CreateBox("cupboardRightCenterBottom", 1.0, scene);
        cupboardRightCenterBottom.scaling.x = 1.8;
        cupboardRightCenterBottom.scaling.y = 0.1;
        cupboardRightCenterBottom.scaling.z = 1.8;
        cupboardRightCenterBottom.position.x = +1;
        cupboardRightCenterBottom.position.y = +1.95;
        cupboardRightCenterBottom.position.z = +1.5;
        var cupboardDoor = new BABYLON.Mesh.CreateBox("cupboardDoor", 1.0, scene);
        cupboardDoor.scaling.x = 2;
        cupboardDoor.scaling.y = 2;
        cupboardDoor.scaling.z = 0.1;
        cupboardDoor.position.x = +1;
        cupboardDoor.position.y = +1;
        cupboardDoor.position.z = +0.55;


        // create door rotation animation
        var doorAnimation1 = new BABYLON.Animation("doorAnimation1",
            "rotation.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
        // animation keys
        var keys = [];
        // at the animation key 0, the value of rotation is 0
        keys.push({
            frame: 0,
            value: 0
        });
        // at the animation key 30, the value of rotation is -PI/2
        keys.push({
            frame: 30,
            value: -Math.PI/2
        });
        // at the animation key 60, the value of rotation is 0
        keys.push({
            frame: 60,
            value: 0
        });
        // adding keys to the animation object
        doorAnimation1.setKeys(keys);
        // adding animation to the mesh
        cupboardDoor.animations.push(doorAnimation1);

        // create door X position animation
        var doorAnimation2 = new BABYLON.Animation("doorAnimation2",
            "position.x",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        // animation keys
        keys = [];
        // at the animation key 0, the value of X position is 1
        keys.push({
            frame: 0,
            value: 1
        });
        // at the animation key 30, the value of X position is 1.95
        keys.push({
            frame: 30,
            value: +1.95
        });
        // at the animation key 60, the value of X position is 1
        keys.push({
            frame: 60,
            value: 1
        });
        // adding keys to the animation object
        doorAnimation2.setKeys(keys);
        // adding animation to the mesh
        cupboardDoor.animations.push(doorAnimation2);

        // create the door Z position animation
        var doorAnimation3 = new BABYLON.Animation("doorAnimation3",
            "position.z",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        // animation keys
        keys = [];
        // at the animation key 0, the value of Z position is 0.55
        keys.push({
            frame: 0,
            value: 0.55
        });
        // at the animation key 30, the value of Z position is -0.4
        keys.push({
            frame: 30,
            value: -0.4
        });
        // at the animation key 60, the value of Z position is 0.55
        keys.push({
            frame: 60,
            value: 0.55
        });
        // adding keys to the animation object
        doorAnimation3.setKeys(keys);
        // adding animation to the mesh
        cupboardDoor.animations.push(doorAnimation3);


        // keep track of animation
        var doorRotated = false;
        var animationIsRunning = false;

        // open or close the door
        var toggleDoor = function()
        {
            // don't do anything if last animation is still running
            if (!animationIsRunning)
            {
                // Declare that a new animation is running
                animationIsRunning = true;
                // Check if door is opened or closed
                if (doorRotated)
                {
                    // Close door
                    scene.beginAnimation(cupboardDoor, 30, 60, false, 1, function() {
                        // Declare that the animation is finished
                        animationIsRunning = false;
                    });
                }
                else
                {
                    // Open door
                    scene.beginAnimation(cupboardDoor, 0, 30, false, 1, function() {
                        // Declare that the animation is finished
                        animationIsRunning = false;
                    });
                }
                // Change the state of the door (closed/opened)
                doorRotated = !doorRotated;
            }
        };

        // Handle animation on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 100)
            {
                toggleDoor();
            }
        });
        // Handle animation on button click
        document.getElementById('animateButton').addEventListener('click', function() {
            toggleDoor();
        });

        // Learning postprocess
        var standardPipeline = new BABYLON.PostProcessRenderPipeline(engine, "standardPipeline");
        var horizontalBlur = new BABYLON.PostProcessRenderEffect(
            engine,
            "horizontalBlurEffect",
            function() {
                return new BABYLON.BlurPostProcess(
                    "hb",
                    new BABYLON.Vector2(1.0, 0),
                    3.0,
                    1.0,
                    null,
                    null,
                    engine,
                    true
                )
            }
        );
        standardPipeline.addEffect(horizontalBlur);
        scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);
        scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera);

        // Enable post processing effect in the render loop
        var effectEnabled = true;
        // Enable or disable effect
        var toggleEffect = function()
        {
            if (effectEnabled)
            {
                scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
            }
            else
            {
                scene.postProcessRenderPipelineManager.enableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
            }
            effectEnabled = !effectEnabled;
        };

        // Handle effect enabling on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 101)
            {
                toggleEffect();
            }
        });
        // Handle effect enabling on button click
        document.getElementById('effectButton').addEventListener('click', function() {
            toggleEffect();
        });


        /////////
        // END //
        /////////


        // Keep track of render state
        var isRendering = true;
        // Enable or disable render loop
        var toggleRender = function()
        {
            if (isRendering)
            {
                engine.stopRenderLoop();
            }
            else
            {
                engine.runRenderLoop(function(){
                    // render scene
                    scene.render();

                    // display fps
                    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
                });
            }
            isRendering = !isRendering;
        };
        // Stop rendering on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 115)
            {
                toggleRender();
            }
        });
        // Stop rendering on button click
        document.getElementById('stopBabylonButton').addEventListener('click', function() {
            toggleRender();
        });

        // return the created scene
        return scene;
    };

    var scene = createScene();


    engine.runRenderLoop(function()
    {
        // render scene
        scene.render();

        // display fps
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
    });


    window.addEventListener('resize', function()
    {
        engine.resize();
    });
    
};



Babylon.run2 = function()
{
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, false, {limitDeviceRatio: 1});
    //var engine = new BABYLON.Engine(canvas, true);
    var fpsLabel = document.getElementById('fpsLabel');

    var createScene = function()
    {
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(engine);

        // create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera('camera1', 3*Math.PI/2, Math.PI/3, 15, new BABYLON.Vector3(0, 0, 0), scene);
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // attach the camera to the canvas
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
        // create a basic light, aiming 0,0,0 from 0,1,-1
        var light2 = new BABYLON.DirectionalLight('light2', new BABYLON.Vector3(0,-1,1), scene);
        light2.intensity = 0.2;
        // create a basic light, positioned at 0,15,0
        var light3 = new BABYLON.PointLight('light3', new BABYLON.Vector3(0,15,0), scene);


        /////////////////
        // CUSTOM PART //
        /////////////////

        var renderTexture = new BABYLON.RenderTargetTexture("render", 512, scene, true);

        var jMax = 10;
        var iMax = 10;
        for (var j = 0; j < jMax; j++) {
            for (var i = 0; i < iMax; i++) {
                var box = new BABYLON.Mesh.CreateBox('box' + i + '' + j, 0.2, scene);
                box.position.y = 3;
                box.position.x = -(iMax*0.25/2) + i * 0.25;
                box.position.z = -(jMax*0.25/2) + j * 0.25;
                renderTexture.renderList.push(box);
            }
        }
        /*var box = new BABYLON.Mesh.CreateBox('box', 1.0, scene);
        box.position.y = 3;
        box.material = new BABYLON.StandardMaterial("f", scene);*/
        var ground = new BABYLON.Mesh.CreateGround('ground', 10.0, 10.0, 1, scene);
        ground.position.y = -2;

        ground.material = new BABYLON.StandardMaterial("g", scene);
        ground.material.diffuseTexture = renderTexture;

        scene.customRenderTargets.push(renderTexture);



        /////////
        // END //
        /////////


        // Keep track of render state
        var isRendering = true;
        // Enable or disable render loop
        var toggleRender = function()
        {
            if (isRendering)
            {
                engine.stopRenderLoop();
            }
            else
            {
                engine.runRenderLoop(function(){
                    // render scene
                    scene.render();

                    // display fps
                    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
                });
            }
            isRendering = !isRendering;
        };
        // Stop rendering on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 115)
            {
                toggleRender();
            }
        });
        // Stop rendering on button click
        document.getElementById('stopBabylonButton').addEventListener('click', function() {
            toggleRender();
        });

        // return the created scene
        return scene;
    };

    var scene = createScene();


    engine.runRenderLoop(function()
    {
        // render scene
        scene.render();

        // display fps
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
    });


    window.addEventListener('resize', function()
    {
        engine.resize();
    });
};



Babylon.run3 = function() {

    var canvas = document.getElementById('renderCanvas');
    //var engine = new BABYLON.Engine(canvas, false, {limitDeviceRatio: 1});
    //var engine = new BABYLON.Engine(canvas, true);
    // function Engine(canvas, antialias, options, adaptToDeviceRatio) 
    var engine = new BABYLON.Engine(canvas, false, null, false);
    var fpsLabel = document.getElementById('fpsLabel');
    var potentialFpsLabel = document.getElementById('potentialFpsLabel');
    var resolutionLabel = document.getElementById('resolutionLabel');
    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();

    var createScene = function()
    {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera('camera1', 3*Math.PI/2, Math.PI/3, 15, new BABYLON.Vector3(0, 0, 0), scene);
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // attach the camera to the canvas
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
        // create a basic light, aiming 0,0,0 from 0,1,-1
        var light2 = new BABYLON.DirectionalLight('light2', new BABYLON.Vector3(0,-1,1), scene);
        light2.intensity = 0.2;
        // create a basic light, positioned at 0,15,0
        var light3 = new BABYLON.PointLight('light3', new BABYLON.Vector3(0,15,0), scene);


        /////////////////
        // CUSTOM PART //
        /////////////////


        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);


        /////////
        // END //
        /////////


        // Keep track of render state
        var isRendering = true;
        // Enable or disable render loop
        var toggleRender = function()
        {
            if (isRendering)
            {
                engine.stopRenderLoop();
            }
            else
            {
                engine.runRenderLoop(function(){
                    // render scene
                    scene.render();

                    // display fps
                    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

                    slowPotentialFps();

                });
            }
            isRendering = !isRendering;
        };
        // Stop rendering on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 115)
            {
                toggleRender();
            }
        });
        // Stop rendering on button click
        document.getElementById('stopBabylonButton').addEventListener('click', function() {
            toggleRender();
        });

        // return the created scene
        return scene;
    };

    var scene = createScene();
    var slowPotentialFpsCount = 0;
    var slowPotentialFps = function()
    {
        if (slowPotentialFpsCount === 0)
        {
            potentialFpsLabel.innerHTML = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0) + " fps";
        }
        slowPotentialFpsCount++;
        if (slowPotentialFpsCount > 50)
        {
            slowPotentialFpsCount = 0;
        }
    };

    engine.runRenderLoop(function()
    {
        // render scene
        scene.render();

        // display fps
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

        slowPotentialFps();
    });


    window.addEventListener('resize', function()
    {
        engine.resize();

        resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
    });
};

Babylon.run4 = function() {

    var canvas = document.getElementById('renderCanvas');
    //var engine = new BABYLON.Engine(canvas, false, {limitDeviceRatio: 1});
    //var engine = new BABYLON.Engine(canvas, true);
    // function Engine(canvas, antialias, options, adaptToDeviceRatio)
    var engine = new BABYLON.Engine(canvas, false, null, false);
    var fpsLabel = document.getElementById('fpsLabel');
    var potentialFpsLabel = document.getElementById('potentialFpsLabel');
    var resolutionLabel = document.getElementById('resolutionLabel');
    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();

    var createScene = function()
    {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera('camera1', 3*Math.PI/2, Math.PI/3, 15, new BABYLON.Vector3(0, 0, 0), scene);
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // attach the camera to the canvas
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
        // create a basic light, aiming 0,0,0 from 0,1,-1
        var light2 = new BABYLON.DirectionalLight('light2', new BABYLON.Vector3(0,-1,1), scene);
        light2.intensity = 0.2;
        // create a basic light, positioned at 0,15,0
        var light3 = new BABYLON.PointLight('light3', new BABYLON.Vector3(0,15,0), scene);


        /////////////////
        // CUSTOM PART //
        /////////////////


        var jMax = 20;
        var iMax = 20;
        for (var j = 0; j < jMax; j++) {
            for (var i = 0; i < iMax; i++) {
                var box = new BABYLON.Mesh.CreateBox('box' + i + '' + j, 0.2, scene);
                box.position.y = 3;
                box.position.x = -(iMax*0.25/2) + i * 0.25;
                box.position.z = -(jMax*0.25/2) + j * 0.25;
            }
        }


        /////////
        // END //
        /////////


        // Keep track of render state
        var isRendering = true;
        // Enable or disable render loop
        var toggleRender = function()
        {
            if (isRendering)
            {
                engine.stopRenderLoop();
            }
            else
            {
                engine.runRenderLoop(function(){
                    // render scene
                    scene.render();

                    // display fps
                    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

                    slowPotentialFps();

                });
            }
            isRendering = !isRendering;
        };
        // Stop rendering on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 115)
            {
                toggleRender();
            }
        });
        // Stop rendering on button click
        document.getElementById('stopBabylonButton').addEventListener('click', function() {
            toggleRender();
        });

        // return the created scene
        return scene;
    };

    var scene = createScene();
    var slowPotentialFpsCount = 0;
    var slowPotentialFps = function()
    {
        if (slowPotentialFpsCount === 0)
        {
            potentialFpsLabel.innerHTML = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0) + " fps";
        }
        slowPotentialFpsCount++;
        if (slowPotentialFpsCount > 50)
        {
            slowPotentialFpsCount = 0;
        }
    };

    engine.runRenderLoop(function()
    {
        // render scene
        scene.render();

        // display fps
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

        slowPotentialFps();
    });


    window.addEventListener('resize', function()
    {
        engine.resize();

        resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
    });
};




Babylon.run5 = function() {

    var canvas = document.getElementById('renderCanvas');
    //var engine = new BABYLON.Engine(canvas, false, {limitDeviceRatio: 1});
    //var engine = new BABYLON.Engine(canvas, true);
    // function Engine(canvas, antialias, options, adaptToDeviceRatio)
    var engine = new BABYLON.Engine(canvas, true, null, true);
    var fpsLabel = document.getElementById('fpsLabel');
    var potentialFpsLabel = document.getElementById('potentialFpsLabel');
    var resolutionLabel = document.getElementById('resolutionLabel');
    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();

    var createScene = function()
    {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera('camera1', 3*Math.PI/2, Math.PI/3, 15, new BABYLON.Vector3(0, 0, 0), scene);
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // attach the camera to the canvas
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
        // create a basic light, aiming 0,0,0 from 0,1,-1
        var light2 = new BABYLON.DirectionalLight('light2', new BABYLON.Vector3(0,-1,1), scene);
        light2.intensity = 0.2;
        // create a basic light, positioned at 0,15,0
        var light3 = new BABYLON.PointLight('light3', new BABYLON.Vector3(0,15,0), scene);


        /////////////////
        // CUSTOM PART //
        /////////////////


        var jMax = 20;
        var iMax = 20;
        for (var j = 0; j < jMax; j++) {
            for (var i = 0; i < iMax; i++) {
                var box = new BABYLON.Mesh.CreateBox('box' + i + '' + j, 0.2, scene);
                box.position.y = 3;
                box.position.x = -(iMax*0.25/2) + i * 0.25;
                box.position.z = -(jMax*0.25/2) + j * 0.25;
                box.convertToUnIndexedMesh();
            }
        }


        /////////
        // END //
        /////////


        // Keep track of render state
        var isRendering = true;
        // Enable or disable render loop
        var toggleRender = function()
        {
            if (isRendering)
            {
                engine.stopRenderLoop();
            }
            else
            {
                engine.runRenderLoop(function(){
                    // render scene
                    scene.render();

                    // display fps
                    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

                    slowPotentialFps();

                });
            }
            isRendering = !isRendering;
        };
        // Stop rendering on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 115)
            {
                toggleRender();
            }
        });
        // Stop rendering on button click
        document.getElementById('stopBabylonButton').addEventListener('click', function() {
            toggleRender();
        });

        // return the created scene
        return scene;
    };

    var scene = createScene();
    var slowPotentialFpsCount = 0;
    var slowPotentialFps = function()
    {
        if (slowPotentialFpsCount === 0)
        {
            potentialFpsLabel.innerHTML = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0) + " fps";
        }
        slowPotentialFpsCount++;
        if (slowPotentialFpsCount > 50)
        {
            slowPotentialFpsCount = 0;
        }
    };

    engine.runRenderLoop(function()
    {
        // render scene
        scene.render();

        // display fps
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

        slowPotentialFps();
    });


    window.addEventListener('resize', function()
    {
        engine.resize();

        resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
    });
};




Babylon.run6 = function() {

    var canvas = document.getElementById('renderCanvas');
    //var engine = new BABYLON.Engine(canvas, false, {limitDeviceRatio: 1});
    //var engine = new BABYLON.Engine(canvas, true);
    // function Engine(canvas, antialias, options, adaptToDeviceRatio)
    var engine = new BABYLON.Engine(canvas, false, null, false);
    var fpsLabel = document.getElementById('fpsLabel');
    var potentialFpsLabel = document.getElementById('potentialFpsLabel');
    var resolutionLabel = document.getElementById('resolutionLabel');
    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();

    var createScene = function()
    {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera('camera1', 3*Math.PI/2, Math.PI/3, 15, new BABYLON.Vector3(0, 0, 0), scene);
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // attach the camera to the canvas
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
        // create a basic light, aiming 0,0,0 from 0,1,-1
        var light2 = new BABYLON.DirectionalLight('light2', new BABYLON.Vector3(0,-1,1), scene);
        light2.intensity = 0.2;
        // create a basic light, positioned at 0,15,0
        var light3 = new BABYLON.PointLight('light3', new BABYLON.Vector3(0,15,0), scene);


        /////////////////
        // CUSTOM PART //
        /////////////////


        var jMax = 20;
        var iMax = 20;
        for (var j = 0; j < jMax; j++) {
            for (var i = 0; i < iMax; i++) {
                var box = new BABYLON.Mesh.CreateBox('box' + i + '' + j, 0.2, scene);
                box.position.y = 3;
                box.position.x = -(iMax*0.25/2) + i * 0.25;
                box.position.z = -(jMax*0.25/2) + j * 0.25;
                box.material = new BABYLON.StandardMaterial('texture1', scene);
                box.material.freeze();
            }
        }


        /////////
        // END //
        /////////


        // Keep track of render state
        var isRendering = true;
        // Enable or disable render loop
        var toggleRender = function()
        {
            if (isRendering)
            {
                engine.stopRenderLoop();
            }
            else
            {
                engine.runRenderLoop(function(){
                    // render scene
                    scene.render();

                    // display fps
                    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

                    slowPotentialFps();

                });
            }
            isRendering = !isRendering;
        };
        // Stop rendering on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 115)
            {
                toggleRender();
            }
        });
        // Stop rendering on button click
        document.getElementById('stopBabylonButton').addEventListener('click', function() {
            toggleRender();
        });

        // return the created scene
        return scene;
    };

    var scene = createScene();
    var slowPotentialFpsCount = 0;
    var slowPotentialFps = function()
    {
        if (slowPotentialFpsCount === 0)
        {
            potentialFpsLabel.innerHTML = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0) + " fps";
        }
        slowPotentialFpsCount++;
        if (slowPotentialFpsCount > 50)
        {
            slowPotentialFpsCount = 0;
        }
    };

    engine.runRenderLoop(function()
    {
        // render scene
        scene.render();

        // display fps
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

        slowPotentialFps();
    });


    window.addEventListener('resize', function()
    {
        engine.resize();

        resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
    });
};




Babylon.run7 = function()
{

    var canvas = document.getElementById('renderCanvas');
    // function Engine(canvas, antialias, options, adaptToDeviceRatio)
    var engine = new BABYLON.Engine(canvas, false, null, false);
    var fpsLabel = document.getElementById('fpsLabel');
    var potentialFpsLabel = document.getElementById('potentialFpsLabel');
    var resolutionLabel = document.getElementById('resolutionLabel');
    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();

    var createScene = function()
    {
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(engine);

        // create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera('camera1', 3*Math.PI/2, Math.PI/3, 15, new BABYLON.Vector3(0, 0, 0), scene);
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // attach the camera to the canvas
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
        // create a basic light, aiming 0,0,0 from 0,1,-1
        var light2 = new BABYLON.DirectionalLight('light2', new BABYLON.Vector3(0,-1,1), scene);
        light2.intensity = 0.2;
        // create a basic light, positioned at 0,15,0
        var light3 = new BABYLON.PointLight('light3', new BABYLON.Vector3(0,15,0), scene);


        /////////////////
        // CUSTOM PART //
        /////////////////


        // create geometry
        var ground = new BABYLON.Mesh.CreateGround("ground", 10.0, 5.0, 1, scene);
        var wallLeft = new BABYLON.Mesh.CreatePlane("wallLeft", 5.0, scene);
        wallLeft.rotation.y = -Math.PI/2;
        wallLeft.position.x = -5;
        wallLeft.position.y = +2.5;
        var wallRight = new BABYLON.Mesh.CreatePlane("wallRight", 5.0, scene);
        wallRight.rotation.y = Math.PI/2;
        wallRight.position.x = +5;
        wallRight.position.y = +2.5;
        var wallCenter = new BABYLON.Mesh.CreatePlane("wallCenter", 5.0, scene);
        wallCenter.scaling.x = 2;
        wallCenter.position.z = +2.5;
        wallCenter.position.y = +2.5;
        var cupboardLeft = new BABYLON.Mesh.CreateBox("cupboardLeft", 1.0, scene);
        cupboardLeft.scaling.x = 2;
        cupboardLeft.scaling.y = 3;
        cupboardLeft.scaling.z = 2;
        cupboardLeft.position.x = -1;
        cupboardLeft.position.y = +1.5;
        cupboardLeft.position.z = +1.5;
        var cupboardRightBack = new BABYLON.Mesh.CreateBox("cupboardRightBack", 1.0, scene);
        cupboardRightBack.scaling.x = 2;
        cupboardRightBack.scaling.y = 3;
        cupboardRightBack.scaling.z = 0.1;
        cupboardRightBack.position.x = +1;
        cupboardRightBack.position.y = +1.5;
        cupboardRightBack.position.z = +2.45;
        var cupboardRightTop = new BABYLON.Mesh.CreateBox("cupboardRightTop", 1.0, scene);
        cupboardRightTop.scaling.x = 1.8;
        cupboardRightTop.scaling.y = 0.1;
        cupboardRightTop.scaling.z = 1.8;
        cupboardRightTop.position.x = +1;
        cupboardRightTop.position.y = +2.95;
        cupboardRightTop.position.z = +1.5;
        var cupboardRightBottom = new BABYLON.Mesh.CreateBox("cupboardRightBottom", 1.0, scene);
        cupboardRightBottom.scaling.x = 1.8;
        cupboardRightBottom.scaling.y = 0.1;
        cupboardRightBottom.scaling.z = 1.8;
        cupboardRightBottom.position.x = +1;
        cupboardRightBottom.position.y = +0.05;
        cupboardRightBottom.position.z = +1.5;
        var cupboardRightLeft = new BABYLON.Mesh.CreateBox("cupboardRightLeft", 1.0, scene);
        cupboardRightLeft.scaling.x = 0.1;
        cupboardRightLeft.scaling.y = 3;
        cupboardRightLeft.scaling.z = 1.8;
        cupboardRightLeft.position.x = +0.05;
        cupboardRightLeft.position.y = +1.5;
        cupboardRightLeft.position.z = +1.5;
        var cupboardRightRight = new BABYLON.Mesh.CreateBox("cupboardRightRight", 1.0, scene);
        cupboardRightRight.scaling.x = 0.1;
        cupboardRightRight.scaling.y = 3;
        cupboardRightRight.scaling.z = 1.8;
        cupboardRightRight.position.x = +1.95;
        cupboardRightRight.position.y = +1.5;
        cupboardRightRight.position.z = +1.5;
        var cupboardRightCenterTop = new BABYLON.Mesh.CreateBox("cupboardRightCenterTop", 1.0, scene);
        cupboardRightCenterTop.scaling.x = 1.8;
        cupboardRightCenterTop.scaling.y = 0.1;
        cupboardRightCenterTop.scaling.z = 1.8;
        cupboardRightCenterTop.position.x = +1;
        cupboardRightCenterTop.position.y = +2.05;
        cupboardRightCenterTop.position.z = +1.5;
        var cupboardRightCenterBottom = new BABYLON.Mesh.CreateBox("cupboardRightCenterBottom", 1.0, scene);
        cupboardRightCenterBottom.scaling.x = 1.8;
        cupboardRightCenterBottom.scaling.y = 0.1;
        cupboardRightCenterBottom.scaling.z = 1.8;
        cupboardRightCenterBottom.position.x = +1;
        cupboardRightCenterBottom.position.y = +1.95;
        cupboardRightCenterBottom.position.z = +1.5;
        var cupboardDoor = new BABYLON.Mesh.CreateBox("cupboardDoor", 1.0, scene);
        cupboardDoor.scaling.x = 2;
        cupboardDoor.scaling.y = 2;
        cupboardDoor.scaling.z = 0.1;
        cupboardDoor.position.x = +1;
        cupboardDoor.position.y = +1;
        cupboardDoor.position.z = +0.55;


        // create door rotation animation
        var doorAnimation1 = new BABYLON.Animation("doorAnimation1",
            "rotation.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
        // animation keys
        var keys = [];
        // at the animation key 0, the value of rotation is 0
        keys.push({
            frame: 0,
            value: 0
        });
        // at the animation key 30, the value of rotation is -PI/2
        keys.push({
            frame: 30,
            value: -Math.PI/2
        });
        // at the animation key 60, the value of rotation is 0
        keys.push({
            frame: 60,
            value: 0
        });
        // adding keys to the animation object
        doorAnimation1.setKeys(keys);
        // adding animation to the mesh
        cupboardDoor.animations.push(doorAnimation1);

        // create door X position animation
        var doorAnimation2 = new BABYLON.Animation("doorAnimation2",
            "position.x",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        // animation keys
        keys = [];
        // at the animation key 0, the value of X position is 1
        keys.push({
            frame: 0,
            value: 1
        });
        // at the animation key 30, the value of X position is 1.95
        keys.push({
            frame: 30,
            value: +1.95
        });
        // at the animation key 60, the value of X position is 1
        keys.push({
            frame: 60,
            value: 1
        });
        // adding keys to the animation object
        doorAnimation2.setKeys(keys);
        // adding animation to the mesh
        cupboardDoor.animations.push(doorAnimation2);

        // create the door Z position animation
        var doorAnimation3 = new BABYLON.Animation("doorAnimation3",
            "position.z",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        // animation keys
        keys = [];
        // at the animation key 0, the value of Z position is 0.55
        keys.push({
            frame: 0,
            value: 0.55
        });
        // at the animation key 30, the value of Z position is -0.4
        keys.push({
            frame: 30,
            value: -0.4
        });
        // at the animation key 60, the value of Z position is 0.55
        keys.push({
            frame: 60,
            value: 0.55
        });
        // adding keys to the animation object
        doorAnimation3.setKeys(keys);
        // adding animation to the mesh
        cupboardDoor.animations.push(doorAnimation3);


        // keep track of animation
        var doorRotated = false;
        var animationIsRunning = false;

        // open or close the door
        var toggleDoor = function()
        {
            // don't do anything if last animation is still running
            if (!animationIsRunning)
            {
                // Declare that a new animation is running
                animationIsRunning = true;
                // Check if door is opened or closed
                if (doorRotated)
                {
                    // Close door
                    scene.beginAnimation(cupboardDoor, 30, 60, false, 1, function() {
                        // Declare that the animation is finished
                        animationIsRunning = false;
                    });
                }
                else
                {
                    // Open door
                    scene.beginAnimation(cupboardDoor, 0, 30, false, 1, function() {
                        // Declare that the animation is finished
                        animationIsRunning = false;
                    });
                }
                // Change the state of the door (closed/opened)
                doorRotated = !doorRotated;
            }
        };

        // Handle animation on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 100)
            {
                toggleDoor();
            }
        });
        // Handle animation on button click
        document.getElementById('animateButton').addEventListener('click', function() {
            toggleDoor();
        });









        var toggleFunction = function(elemId, init, isEnabled, ifStatement, elseStatement, key)
        {
            var toggleButton = document.getElementById(elemId);

            init();

            var toggle = function()
            {
                if (isEnabled)
                {
                    ifStatement();
                }
                else
                {
                    elseStatement();
                }
                isEnabled = !isEnabled;
            };

            window.addEventListener('keypress', function(k)
            {
                if (k.which === key)
                {
                    toggle();
                }
            });
            toggleButton.addEventListener('click', function() {
                toggle();
            });

        };



        toggleFunction(
            'effectButton',
            function() {
                var standardPipeline = new BABYLON.PostProcessRenderPipeline(engine, "standardPipeline");
                var horizontalBlur = new BABYLON.PostProcessRenderEffect(
                    engine,
                    "horizontalBlurEffect",
                    function() {
                        return new BABYLON.BlurPostProcess(
                            "hb",
                            new BABYLON.Vector2(1.0, 0),
                            3.0,
                            1.0,
                            null,
                            null,
                            engine,
                            true
                        )
                    }
                );
                standardPipeline.addEffect(horizontalBlur);
                scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);
                scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera);
            },
            true,
            function() {
                scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
            },
            function() {
                scene.postProcessRenderPipelineManager.enableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
            },
            101
        );






        /*

        // Learning postprocess
        var standardPipeline = new BABYLON.PostProcessRenderPipeline(engine, "standardPipeline");
        var horizontalBlur = new BABYLON.PostProcessRenderEffect(
            engine,
            "horizontalBlurEffect",
            function() {
                return new BABYLON.BlurPostProcess(
                    "hb",
                    new BABYLON.Vector2(1.0, 0),
                    3.0,
                    1.0,
                    null,
                    null,
                    engine,
                    true
                )
            }
        );
        standardPipeline.addEffect(horizontalBlur);
        scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);
        scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera);

        // Enable post processing effect in the render loop
        var effectEnabled = true;
        // Enable or disable effect
        var toggleEffect = function()
        {
            if (effectEnabled)
            {
                scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
            }
            else
            {
                scene.postProcessRenderPipelineManager.enableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
            }
            effectEnabled = !effectEnabled;
        };

        // Handle effect enabling on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 101)
            {
                toggleEffect();
            }
        });
        // Handle effect enabling on button click
        document.getElementById('effectButton').addEventListener('click', function() {
            toggleEffect();
        });
*/
        // Using renderTargetTexture
        var renderTexture = new BABYLON.RenderTargetTexture('renderTexture', 512, scene);
        renderTexture.renderList.push(cupboardLeft);
        renderTexture.renderList.push(cupboardRightBack);
        renderTexture.renderList.push(cupboardRightTop);
        renderTexture.renderList.push(cupboardRightBottom);
        renderTexture.renderList.push(cupboardRightLeft);
        renderTexture.renderList.push(cupboardRightRight);
        renderTexture.renderList.push(cupboardRightCenterTop);
        renderTexture.renderList.push(cupboardRightCenterBottom);
        renderTexture.renderList.push(cupboardDoor);
        var renderTargetPlane = new BABYLON.Mesh.CreatePlane('renderTargetPlane', 5.0, scene);
        renderTargetPlane.position.z = -2.5;
        renderTargetPlane.position.y = -2.5;
        var renderTargetMaterial = new BABYLON.StandardMaterial('renderTargetMaterial', scene);
        renderTargetPlane.material = renderTargetMaterial;
        renderTargetPlane.material.diffuseTexture = renderTexture;
        scene.customRenderTargets.push(renderTexture);
        //renderTargetPlane.material.freeze();

        // Show the mirror plane
        var isTargetRendered = true;
        // Display or remove the mirror plane
        var renderTarget = function()
        {
            if (isTargetRendered)
            {
                renderTargetPlane.setEnabled(0);
            }
            else
            {
                renderTargetPlane.setEnabled(1);
            }
            isTargetRendered = !isTargetRendered;
        };

        scene.debugLayer.show();

        // Handle target render on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 114)
            {
                renderTarget();
            }
        });
        // Handle target render on button click
        document.getElementById('renderTargetButton').addEventListener('click', function() {
            renderTarget();
        });

        // Don't expand babylon canvas at the beginning
        var isExpanded = false;
        // Expand or contract canvas to cover window width or not
        var expandCanvas = function()
        {
            if (isExpanded)
            {
                canvas.style.width = "50%";
                engine.resize();
                resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
            }
            else
            {
                canvas.style.width = "100%";
                engine.resize();
                resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
            }
            isExpanded = !isExpanded;
        };

        // Handle expand on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 116)
            {
                expandCanvas();
            }
        });
        // Handle expand on button click
        document.getElementById('expandButton').addEventListener('click', function() {
            expandCanvas();
        });

        /////////
        // END //
        /////////


        // Keep track of render state
        var isRendering = true;
        // Enable or disable render loop
        var toggleRender = function()
        {
            if (isRendering)
            {
                engine.stopRenderLoop();
            }
            else
            {
                engine.runRenderLoop(function(){
                    // render scene
                    scene.render();

                    // display fps
                    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

                    slowPotentialFps();
                });
            }
            isRendering = !isRendering;
        };
        // Stop rendering on keypress
        window.addEventListener('keypress', function(key)
        {
            if (key.which === 115)
            {
                toggleRender();
            }
        });
        // Stop rendering on button click
        document.getElementById('stopBabylonButton').addEventListener('click', function() {
            toggleRender();
        });

        // return the created scene
        return scene;
    };

    var scene = createScene();

    var slowPotentialFpsCount = 0;
    var slowPotentialFps = function()
    {
        if (slowPotentialFpsCount === 0)
        {
            potentialFpsLabel.innerHTML = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0) + " fps";
        }
        else
        {
            var a = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0);
            if (100 > a){
                potentialFpsLabel.innerHTML = a + " fps";
            }

        }
        slowPotentialFpsCount++;
        if (slowPotentialFpsCount > 50)
        {
            slowPotentialFpsCount = 0;
        }
    };

    engine.runRenderLoop(function()
    {
        // render scene
        scene.render();

        // display fps
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

        slowPotentialFps();
    });


    window.addEventListener('resize', function()
    {
        engine.resize();

        resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();

    });

};






// This function is a basic Babylon scene with some options

Babylon.run8 = function(animation, effect, rtt, expansion, debug, stop)
{

    ////////////////////////////////////////////////////////
    // Babylon engine and global variables initialization //
    ////////////////////////////////////////////////////////

    // Get the canvas element
    var canvas = document.getElementById('renderCanvas');

    // Antialiasing is useless with post processing effects, turn it off.
    var antialiasing = false;
    // Feel free to fill the options object to modify the context
    var options = {
        antialias: antialiasing,                            // Also in the constructor parameters
        preserveDrawingBuffer: false,                       // Didn't look what it does
        limitDeviceRatio: window.devicePixelRatio || 1.0    // Used to set the device ratio if adaptToDeviceRatio is turned on
    };
    // Adapting to device ratio is energy-intensive, turn it off.
    var adaptToDeviceRatio = false;
    // Bind the canvas element to the Babylon engine.
    var engine = new BABYLON.Engine(canvas, antialiasing, options, adaptToDeviceRatio);

    // Get an HTML element to display framerate
    var fpsLabel = document.getElementById('fpsLabel');
    // Get an HTML element to display potential framerate
    var potentialFpsLabel = document.getElementById('potentialFpsLabel');
    // Get an HTML element to display current device resolution
    var resolutionLabel = document.getElementById('resolutionLabel');
    // Initialize the device resolution
    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();


    ///////////////////
    // Main function //
    ///////////////////

    var createScene = function()
    {

        ////////////////////
        // Scene & Camera //
        ////////////////////

        // Create a basic Babylon Scene object
        var scene = new BABYLON.Scene(engine);

        // Create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera(
            'defaultCamera',
            3*Math.PI/2,                    // Alpha position
            Math.PI/3,                      // Beta position
            15,                             // Distance from the target
            new BABYLON.Vector3(0, 0, 0),   // Target
            scene                           // Bind the camera to the scene
        );
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // Attach the camera to the canvas element
        camera.attachControl(canvas, true);


        ////////////
        // Lights //
        ////////////

        // Create a basic hemispheric light, aiming aiming the sky
        var hemisphericLight = new BABYLON.HemisphericLight(
            'defaultHemisphericLight',
            new BABYLON.Vector3(0, 1, 0),   // Target
            scene                           // Bind the light to the scene
        );
        // Create a basic directional light, aiming the vector direction (0, -1, 1)
        var directionalLight = new BABYLON.DirectionalLight(
            'defaultDirectionalLight',
            new BABYLON.Vector3(0, -1, 1),  // Target
            scene                           // Bind the light to the scene
        );
        // Decrease the light intensity, default is too bright
        directionalLight.intensity = 0.2;
        // Create a basic point light, positioned at vector position (0, 15, 0)
        var pointLight = new BABYLON.PointLight(
            'defaultPointLight',
            new BABYLON.Vector3(0, 15, 0),  // Position
            scene                           // Bind the light to the scene
        );


        //////////////
        // Geometry //
        //////////////

        // Create the ground, please consider using MeshBuilder class instead of Mesh
        var ground = new BABYLON.MeshBuilder.CreateGround(
            "ground",
            {
                width: 10.0,
                height: 5.0,
                subdivisions: 1,
                updatable: false    // Set to true if you plan to change vertices after the mesh has been rendered
            },
            scene                   // Bind the ground to the scene
        );

        // Create the walls, please consider using MeshBuilder class instead of Mesh
        var wallLeft = new BABYLON.MeshBuilder.CreatePlane(
            "wallLeft",
            {
                size: 5.0,                                  // Size determines width and height in Mesh class. It's just there to maintain backwards compatibility
                width: 5.0,
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,   // FRONT, BACK or DOUBLE
                updatable: false,                           // True if vertices are supposed to change once created
                sourcePlane: null                           // Plane instance. It builds a mesh plane from a Math plane
            },
            scene
        );
        var wallRight = new BABYLON.MeshBuilder.CreatePlane(
            "wallRight",
            {
                size: 5.0,
                width: 5.0,
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                updatable: false,
                sourcePlane: null
            },
            scene
        );
        var wallCenter = new BABYLON.MeshBuilder.CreatePlane(
            "wallCenter",
            {
                size: 5.0,
                width: 10.0,                                 // wallCenter.scaling.x = 2;
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                updatable: false,
                sourcePlane: null
            },
            scene
        );

        // First way to translate a mesh
        wallLeft.position.x = -5;
        wallLeft.position.y = +2.5;
        // Second way to transalte a mesh
        wallLeft.position = new BABYLON.Vector3(-5, 2.5, 0);
        // Third way to translate a mesh
        wallLeft.setPositionWithLocalVector(new BABYLON.Vector3(-5, 2.5, 0));
        // Fourth way to translate a mesh
        wallLeft.locallyTranslate(new BABYLON.Vector3(5, -2.5, 0));
        // Fifth way to translate a mesh
        wallLeft.translate(new BABYLON.Vector3(-5, 2.5, 0), 1, BABYLON.Space.LOCAL);

        // First way to rotate a mesh
        wallLeft.rotation.y = -Math.PI/2;
        // Second way to rotate a mesh
        wallLeft.rotation = new BABYLON.Vector3(0, -2*Math.PI/2, 0);
        // Third way to rotate a mesh
        wallLeft.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);

        // Rotate and translate walls
        wallRight.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
        wallRight.position = new BABYLON.Vector3(5, 2.5, 0);
        wallCenter.position = new BABYLON.Vector3(0, 2.5, 2.5);

        // Merge wall meshes to reduce draw calls
        var wall = new BABYLON.Mesh.MergeMeshes(
            [wallLeft, wallRight, wallCenter],  // Array of meshes to merge, they must be of the same material
            true,                               // Dispose of the source meshes (when false, you get two sets of meshes !)
            true,                               // TOTALLY USELESS after diving into the source code : "When the sum of the vertices > 64k, this must be set to true. Otherwise, it's faster set to false."
            null                                // When set, vertices inserted into this Mesh.  Meshes can then be merged into a Mesh sub-class.
        );

        // Create the cupboard, please consider to use MeshBuilder class instead of Mesh
        var cupboardLeft = new BABYLON.MeshBuilder.CreateBox(
            "cupboardLeft",
            {
                size: 1.0,                                  // When height, width or depth is not defined, size is the default value
                height: 3.0,                                // cupboardLeft.scaling.y = 3;
                width: 2.0,                                 // cupboardLeft.scaling.x = 2;
                depth: 2.0,                                 // cupboardLeft.scaling.z = 2;
                faceColors: null,                           // Array of 6 Color4, one color for each face
                faceUV: null,                               // Array of 6 Vector4, one UV definition for each face
                updatable: false,
                sideOrientation: BABYLON.Mesh.FRONTSIDE
            },
            scene
        );
        var cupboardRightBack = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightBack",
            {
                height: 3.0,                                // cupboardLeft.scaling.y = 3;
                width: 2.0,                                 // cupboardLeft.scaling.x = 2;
                depth: 0.1                                  // cupboardLeft.scaling.z = 0.1;
            },
            scene
        );
        // Clones are new Mesh objects with exactly the same geometry but which can vary on everything else
        var cupboardRightLeft = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightLeft",
            {
                width: 0.1,
                height: 3,
                depth: 1.8
            },
            scene
        );
        var cupboardRightRight = cupboardRightLeft.clone("cupboardRightRight");
        var cupboardRightTop = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightTop",
            {
                width: 1.8,
                height: 0.1,
                depth: 1.8
            },
            scene
        );
        // Instances can only vary on position, rotation, quaternion, pivotMatrix and scaling properties
        // Instances share geometry and material, so they reduce draw calls
        var cupboardRightBottom = cupboardRightTop.createInstance("cupboardRightBottom");
        var cupboardRightCenterTop = cupboardRightTop.createInstance("cupboardRightCenterTop");
        var cupboardRightCenterBottom = cupboardRightTop.createInstance("cupboardRightCenterBottom");

        // Translate cupboard meshes
        cupboardLeft.position = new BABYLON.Vector3(-1, 1.5, 1.5);
        cupboardRightBack.position = new BABYLON.Vector3(1, 1.5, 2.45);
        cupboardRightLeft.position = new BABYLON.Vector3(0.05, 1.5, 1.5);
        cupboardRightRight.position = new BABYLON.Vector3(1.95, 1.5, 1.5);
        cupboardRightTop.position = new BABYLON.Vector3(1.0, 2.95, 1.5);
        // Merging instances messes with mesh position
        // So position is a translation compared to last instance position
        //cupboardRightBottom.position = new BABYLON.Vector3(1, 0.05, 1.5);
        cupboardRightBottom.position = new BABYLON.Vector3(0, -2.9, 0);
        //cupboardRightCenterTop.position = new BABYLON.Vector3(1, 2.05, 1.5);
        cupboardRightCenterTop.position = new BABYLON.Vector3(0, 2, 0);
        //cupboardRightCenterBottom.position = new BABYLON.Vector3(1, 1.95, 1.5);
        cupboardRightCenterBottom.position = new BABYLON.Vector3(0, -0.1, 0);

        // Merge cupboard meshes to reduce draw calls
        // Instances seems to not have any interest when merging them
        var cupboard = BABYLON.Mesh.MergeMeshes(
            [
                cupboardLeft,
                cupboardRightBack,
                cupboardRightLeft,
                cupboardRightRight,
                cupboardRightTop,
                cupboardRightBottom,
                cupboardRightCenterTop,
                cupboardRightCenterBottom
            ],
            true,                               // Dispose of source meshes
            true                                // Useless, but you avoid an useless boucle by setting to true
        );

        // Create the animated door mesh, please consider using MeshBuilder class instead of Mesh
        var cupboardDoor = new BABYLON.MeshBuilder.CreateBox(
            "cupboardDoor",
            {
                width: 2,
                height: 2,
                depth: 0.1
            },
            scene
        );

        // Translate the door
        cupboardDoor.position = new BABYLON.Vector3(1, 1, 0.55);


        /////////////////
        // CUSTOM PART //
        /////////////////





        /////////
        // END //
        /////////


        ////////////////////
        // Door animation //
        ////////////////////

        // Get the HTML element to handle door animation
        var animationButton = document.getElementById('animateButton');

        // Create or remove the animation handling
        if (animation)
        {
            // Create door rotation animation
            var doorRotationAnimation = new BABYLON.Animation(
                "doorRotationAnimation",
                "rotation.y",                                   // Property to animate
                60,                                             // Framerate requested, highest FPS possible in the animation
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,          // Type of change
                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,   // Loop mode
                false                                           // Enable or disable blending (not in the docs, it does shit when enabled)
            );
            // Create door translation animation
            var doorTranslationAnimation = new BABYLON.Animation(
                "doorTranslationAnimation",
                "position",
                60,
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
            );
            // Create animation keys
            var rotationKeys = [];
            var translationKeys = [];
            // Create source and target vectors outside the keys to avoid creating new oject each frame
            var rotationTarget = -Math.PI/2;
            var translationSource = new BABYLON.Vector3(1, 1, 0.55);
            var translationTarget = new BABYLON.Vector3(1.95, 1, -0.4);
            // Populate animation keys
            rotationKeys.push({
                frame: 0,
                value: 0
            });
            rotationKeys.push({
                frame: 30,
                value: rotationTarget
            });
            rotationKeys.push({
                frame: 60,
                value: 0
            });
            translationKeys.push({
                frame: 0,
                value: translationSource
            });
            translationKeys.push({
                frame: 30,
                value: translationTarget
            });
            translationKeys.push({
                frame: 60,
                value: translationSource
            });
            // Set animation keys to their respective animation
            doorRotationAnimation.setKeys(rotationKeys);
            doorTranslationAnimation.setKeys(translationKeys);
            // Add animations to the door mesh
            cupboardDoor.animations.push(doorRotationAnimation);
            cupboardDoor.animations.push(doorTranslationAnimation);

            // Keep track of animation
            var doorRotated = false;
            var animationIsRunning = false;

            // Open or close the door
            var toggleDoor = function()
            {
                // Don't do anything if last animation is still running
                if (!animationIsRunning)
                {
                    // Declare that a new animation is running
                    animationIsRunning = true;

                    // Check if door is opened or closed
                    if (doorRotated)
                    {
                        // Close door
                        scene.beginAnimation(
                            cupboardDoor,                   // The mesh to animate
                            30,                             // The starting frame
                            60,                             // The ending frame
                            false,                          // Depends on animation loop mode, enable or disable looping
                            1,                              // Speed ratio of the animation, default is 1
                            function() {                    // Callback on animation end
                                // Declare that the animation is finished
                                animationIsRunning = false;
                            }
                        );
                    }
                    else
                    {
                        // Open door
                        scene.beginAnimation(
                            cupboardDoor,
                            0,
                            30,
                            false,
                            1,
                            function() {
                                // Declare that the animation is finished
                                animationIsRunning = false;
                            }
                        );
                    }

                    // Change the state of the door (closed/opened)
                    doorRotated = !doorRotated;
                }
            };

            // Handle animation on keypress
            window.addEventListener('keypress', function(key)
            {
                if (key.which === 97) // 'A' as 'Animation'
                {
                    toggleDoor();
                }
            });
            // Handle animation on button click
            document.getElementById('animateButton').addEventListener('click', function() {
                toggleDoor();
            });
        }
        else
        {
            // Remove the HTML element from the DOM
            animationButton.parentNode.removeChild(animationButton);
        }


        /////////////////////////////
        // Generic toggle function //
        /////////////////////////////

        var toggleFunction = function(elem, enable, ifStatement, elseStatement, key)
        {
            //Keep track of the process state;
            var isEnabled = !enable;

            // Generic toggle function
            var toggle = function()
            {
                if (isEnabled)
                {
                    // Custom statement if the process is turned off
                    ifStatement();
                }
                else
                {
                    // Custom statement if the process is turned on
                    elseStatement();
                }
                // Toggle the process state
                if (toggle)
                {
                    isEnabled = !isEnabled;
                }
            };

            // Init process state
            toggle();

            // Handle process on keypress event
            window.addEventListener('keypress', function(k)
            {
                if (k.which === key)
                {
                    toggle();
                }
            });
            // Handle process on button click event
            elem.addEventListener('click', function() {
                toggle();
            });

        };


        /////////////////
        // Blur effect //
        /////////////////

        // Get the HTML element to handle blur effect
        var effectButton = document.getElementById('effectButton');

        // Create or remove the blur effect handling
        if (effect)
        {
            // First, create a pipeline to handle PP effects
            var standardPipeline = new BABYLON.PostProcessRenderPipeline(engine, "standardPipeline");

            // Create the blur PP effect
            var horizontalBlur = new BABYLON.PostProcessRenderEffect(
                engine,                                 // Bind the effect to the Babylon engine
                "horizontalBlurEffect",
                function() {
                    return new BABYLON.BlurPostProcess(
                        "hb",
                        new BABYLON.Vector2(1.0, 0),    // Direction
                        3.0,                            // Blur width
                        1.0,                            // Options
                        null,                           // Camera
                        null,                           // Sampling mode, default is BABYLON.Texture.BILINEAR_SAMPLINGMODE
                        engine,                         // Babylon engine
                        true                            // Reusable, diving into the source code, seems to be useless
                    )
                }
            );

            // Add the PP effect to the pipeline
            standardPipeline.addEffect(horizontalBlur);

            // Add the pipeline to a global pipeline manager
            scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);

            // Bind the default camera to the pipeline
            scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera);


            // Call the generic toggle function with custom attributes
            toggleFunction(
                effectButton,
                false,
                function() {
                    scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
                },
                function() {
                    scene.postProcessRenderPipelineManager.enableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
                },
                101     // 'E' as 'Effect'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            effectButton.parentNode.removeChild(effectButton);
        }


        ///////////////////////////
        // Render target texture //
        ///////////////////////////

        // Get the HTML element to handle render target texture
        var renderTargetButton = document.getElementById('renderTargetButton');

        // Create or remove the render target texture handling
        if (rtt)
        {
            // First, create a render target texture
            var renderTexture = new BABYLON.RenderTargetTexture(
                'renderTexture',
                512,                                    // Size of the texture
                scene,                                  // Bind the texture to the scene
                false,                                  // Set true if you want to generate mipmaps
                true,                                   // Update TransformMatrix every frame when set to false. Default is true. It does shit (deformation of the original scene) when enabled.
                BABYLON.Engine.TEXTURETYPE_UNSIGNED_INT,// Texture type. Default is BABYLON.Engine.TEXTURETYPE_UNSIGNED_INT
                false,                                  // True if it's a cubic texture. Default is false
                BABYLON.Texture.TRILINEAR_SAMPLINGMODE  // Filtering method. Default is BABYLON.Texture.TRILINEAR_SAMPLINGMODE
            );

            // Populate render list
            renderTexture.renderList.push(cupboard);
            renderTexture.renderList.push(cupboardDoor);

            // Create a plane to apply the texture
            var renderTargetPlane = new BABYLON.MeshBuilder.CreatePlane(
                'renderTargetPlane',
                {
                    width: 10.0,
                    height: 5.0
                },
                scene
            );
            renderTargetPlane.position = new BABYLON.Vector3(0, -2.5, -2.5);

            // Create a material to use the texture
            var renderTargetMaterial = new BABYLON.StandardMaterial(
                'renderTargetMaterial',
                scene,                      // Bind the material to the scene
                false                       // If true, add the material to the scene materials array
            );

            // Bind the material to the plane
            renderTargetPlane.material = renderTargetMaterial;
            renderTargetPlane.material.diffuseTexture = renderTexture;

            // Finally add the texture to the scene custom render targets
            scene.customRenderTargets.push(renderTexture);

            // Call the generic toggle function with custom attributes
            toggleFunction(
                renderTargetButton,                     // HTML element
                false,                                  // Turns the process off at application launch
                function() {
                    renderTargetPlane.setEnabled(0);    // Disable render target texture
                },
                function() {
                    renderTargetPlane.setEnabled(1);    // Enable render target texture
                },
                114                                     // 'R' as 'Render Target Texture'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            renderTargetButton.parentNode.removeChild(renderTargetButton);
        }


        //////////////////////
        // Canvas expansion //
        //////////////////////

        // Get the HTML element to handle expansion
        var expandButton = document.getElementById('expandButton');

        // Create or remove the expansion handling
        if (expansion)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                expandButton,
                true,
                function() {
                    canvas.style.width = "50%";     // Contract the canvas element
                    engine.resize();
                    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
                },
                function() {
                    canvas.style.width = "100%";    // Expand the canvas element
                    engine.resize();
                    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
                },
                99                                  // 'C' as 'Canvas expansion'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            expandButton.parentNode.removeChild(expandButton);
        }


        /////////////////
        // Debug layer //
        /////////////////

        // Get the HTML element to handle debug layer display
        var debugButton = document.getElementById('debugButton');

        if (debug)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                debugButton,
                true,
                function() {
                    scene.debugLayer.hide();        // Hide the debug layer
                },
                function() {
                    scene.debugLayer.show();        // Show the debug layer
                },
                100                                 // 'D' as 'Debug'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            debugButton.parentNode.removeChild(debugButton);
        }


        ////////////////////
        // Stop rendering //
        ////////////////////

        // Get the HTML element to handle render loop
        var stopButton = document.getElementById('stopBabylonButton');

        // Create or remove the render loop handling
        if (stop)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                stopButton,
                false,
                function() {
                    engine.stopRenderLoop();            // Stop render loop
                },
                function() {
                    engine.runRenderLoop(function(){    // Start render loop
                        scene.render();
                        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
                        slowPotentialFps();
                    });
                },
                115                                     // 'S' as 'Stop'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            stopButton.parentNode.removeChild(stopButton);
        }


        //////////////////////////
        // End of main function //
        //////////////////////////

        // Return the created scene
        return scene;
    };


    ///////////
    // Utils //
    ///////////

    // Create a variable to slow potential framerate display
    var slowPotentialFps = 0;

    // Display potential framerate
    var displayPotentialFps = function()
    {
        // Compute potential framerate
        var potentialFps = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0);

        // To slow display, display only every 50 incrementations of slowPotentialFps
        if (slowPotentialFps === 0)
        {
            potentialFpsLabel.innerHTML = potentialFps + " fps";
        }
        else
        {
            // Exceptionally, display potential framerate if it's under 100
            if (potentialFps < 100)
            {
                potentialFpsLabel.innerHTML = potentialFps + " fps";
            }
        }

        // Increment the slow variable
        slowPotentialFps++;

        // Reinitialize the slow variable every 50 incrementations
        if (slowPotentialFps > 50)
        {
            slowPotentialFps = 0;
        }
    };


    ///////////////////////////////////////////
    // Finally call main functions to render //
    ///////////////////////////////////////////

    // Call the main function to create scene
    var scene = createScene();

    // Render loop
    engine.runRenderLoop(function()
    {
        // Render scene
        scene.render();

        // Display framerate
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

        // Display potential framerate
        displayPotentialFps();
    });


    ////////////
    // Events //
    ////////////

    // Resize engine on canvas resize
    window.addEventListener('resize', function()
    {
        engine.resize();
        resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
    });
};




















// Shader training !

Babylon.run9 = function(animation, effect, rtt, expansion, debug, stop)
{

    ////////////////////////////////////////////////////////
    // Babylon engine and global variables initialization //
    ////////////////////////////////////////////////////////

    // Get the canvas element
    var canvas = document.getElementById('renderCanvas');

    // Antialiasing is useless with post processing effects, turn it off.
    var antialiasing = false;
    // Feel free to fill the options object to modify the context
    var options = {
        antialias: antialiasing,                            // Also in the constructor parameters
        preserveDrawingBuffer: false,                       // Didn't look what it does
        limitDeviceRatio: window.devicePixelRatio || 1.0    // Used to set the device ratio if adaptToDeviceRatio is turned on
    };
    // Adapting to device ratio is energy-intensive, turn it off.
    var adaptToDeviceRatio = false;
    // Bind the canvas element to the Babylon engine.
    var engine = new BABYLON.Engine(canvas, antialiasing, options, adaptToDeviceRatio);

    // Get an HTML element to display framerate
    var fpsLabel = document.getElementById('fpsLabel');
    // Get an HTML element to display potential framerate
    var potentialFpsLabel = document.getElementById('potentialFpsLabel');
    // Get an HTML element to display current device resolution
    var resolutionLabel = document.getElementById('resolutionLabel');
    // Initialize the device resolution
    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();


    ///////////////////
    // Main function //
    ///////////////////

    var createScene = function()
    {

        ////////////////////
        // Scene & Camera //
        ////////////////////

        // Create a basic Babylon Scene object
        var scene = new BABYLON.Scene(engine);

        // Create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        camera = new BABYLON.ArcRotateCamera(
            'defaultCamera',
            3*Math.PI/2,                    // Alpha position
            Math.PI/3,                      // Beta position
            15,                             // Distance from the target
            new BABYLON.Vector3(0, 0, 0),   // Target
            scene                           // Bind the camera to the scene
        );
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // Attach the camera to the canvas element
        camera.attachControl(canvas, true);


        ////////////
        // Lights //
        ////////////

        // Create a basic hemispheric light, aiming aiming the sky
        var hemisphericLight = new BABYLON.HemisphericLight(
            'defaultHemisphericLight',
            new BABYLON.Vector3(0, 1, 0),   // Target
            scene                           // Bind the light to the scene
        );
        // Create a basic directional light, aiming the vector direction (0, -1, 1)
        var directionalLight = new BABYLON.DirectionalLight(
            'defaultDirectionalLight',
            new BABYLON.Vector3(0, -1, 1),  // Target
            scene                           // Bind the light to the scene
        );
        // Decrease the light intensity, default is too bright
        directionalLight.intensity = 0.2;
        // Create a basic point light, positioned at vector position (0, 15, 0)
        var pointLight = new BABYLON.PointLight(
            'defaultPointLight',
            new BABYLON.Vector3(0, 15, 0),  // Position
            scene                           // Bind the light to the scene
        );


        //////////////
        // Geometry //
        //////////////

        // Create the ground, please consider using MeshBuilder class instead of Mesh
        var ground = new BABYLON.MeshBuilder.CreateGround(
            "ground",
            {
                width: 10.0,
                height: 5.0,
                subdivisions: 1,
                updatable: false    // Set to true if you plan to change vertices after the mesh has been rendered
            },
            scene                   // Bind the ground to the scene
        );

        // Create the walls, please consider using MeshBuilder class instead of Mesh
        var wallLeft = new BABYLON.MeshBuilder.CreatePlane(
            "wallLeft",
            {
                size: 5.0,                                  // Size determines width and height in Mesh class. It's just there to maintain backwards compatibility
                width: 5.0,
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,   // FRONT, BACK or DOUBLE
                updatable: false,                           // True if vertices are supposed to change once created
                sourcePlane: null                           // Plane instance. It builds a mesh plane from a Math plane
            },
            scene
        );
        var wallRight = new BABYLON.MeshBuilder.CreatePlane(
            "wallRight",
            {
                size: 5.0,
                width: 5.0,
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                updatable: false,
                sourcePlane: null
            },
            scene
        );
        var wallCenter = new BABYLON.MeshBuilder.CreatePlane(
            "wallCenter",
            {
                size: 5.0,
                width: 10.0,                                 // wallCenter.scaling.x = 2;
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                updatable: false,
                sourcePlane: null
            },
            scene
        );

        // First way to translate a mesh
        wallLeft.position.x = -5;
        wallLeft.position.y = +2.5;
        // Second way to transalte a mesh
        wallLeft.position = new BABYLON.Vector3(-5, 2.5, 0);
        // Third way to translate a mesh
        wallLeft.setPositionWithLocalVector(new BABYLON.Vector3(-5, 2.5, 0));
        // Fourth way to translate a mesh
        wallLeft.locallyTranslate(new BABYLON.Vector3(5, -2.5, 0));
        // Fifth way to translate a mesh
        wallLeft.translate(new BABYLON.Vector3(-5, 2.5, 0), 1, BABYLON.Space.LOCAL);

        // First way to rotate a mesh
        wallLeft.rotation.y = -Math.PI/2;
        // Second way to rotate a mesh
        wallLeft.rotation = new BABYLON.Vector3(0, -2*Math.PI/2, 0);
        // Third way to rotate a mesh
        wallLeft.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);

        // Rotate and translate walls
        wallRight.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
        wallRight.position = new BABYLON.Vector3(5, 2.5, 0);
        wallCenter.position = new BABYLON.Vector3(0, 2.5, 2.5);

        // Merge wall meshes to reduce draw calls
        var wall = new BABYLON.Mesh.MergeMeshes(
            [wallLeft, wallRight, wallCenter],  // Array of meshes to merge, they must be of the same material
            true,                               // Dispose of the source meshes (when false, you get two sets of meshes !)
            true,                               // TOTALLY USELESS after diving into the source code : "When the sum of the vertices > 64k, this must be set to true. Otherwise, it's faster set to false."
            null                                // When set, vertices inserted into this Mesh.  Meshes can then be merged into a Mesh sub-class.
        );

        // Create the cupboard, please consider to use MeshBuilder class instead of Mesh
        var cupboardLeft = new BABYLON.MeshBuilder.CreateBox(
            "cupboardLeft",
            {
                size: 1.0,                                  // When height, width or depth is not defined, size is the default value
                height: 3.0,                                // cupboardLeft.scaling.y = 3;
                width: 2.0,                                 // cupboardLeft.scaling.x = 2;
                depth: 2.0,                                 // cupboardLeft.scaling.z = 2;
                faceColors: null,                           // Array of 6 Color4, one color for each face
                faceUV: null,                               // Array of 6 Vector4, one UV definition for each face
                updatable: false,
                sideOrientation: BABYLON.Mesh.FRONTSIDE
            },
            scene
        );
        var cupboardRightBack = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightBack",
            {
                height: 3.0,                                // cupboardLeft.scaling.y = 3;
                width: 2.0,                                 // cupboardLeft.scaling.x = 2;
                depth: 0.1                                  // cupboardLeft.scaling.z = 0.1;
            },
            scene
        );
        // Clones are new Mesh objects with exactly the same geometry but which can vary on everything else
        var cupboardRightLeft = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightLeft",
            {
                width: 0.1,
                height: 3,
                depth: 1.8
            },
            scene
        );
        var cupboardRightRight = cupboardRightLeft.clone("cupboardRightRight");
        var cupboardRightTop = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightTop",
            {
                width: 1.8,
                height: 0.1,
                depth: 1.8
            },
            scene
        );
        // Instances can only vary on position, rotation, quaternion, pivotMatrix and scaling properties
        // Instances share geometry and material, so they reduce draw calls
        var cupboardRightBottom = cupboardRightTop.createInstance("cupboardRightBottom");
        var cupboardRightCenterTop = cupboardRightTop.createInstance("cupboardRightCenterTop");
        var cupboardRightCenterBottom = cupboardRightTop.createInstance("cupboardRightCenterBottom");

        // Translate cupboard meshes
        cupboardLeft.position = new BABYLON.Vector3(-1, 1.5, 1.5);
        cupboardRightBack.position = new BABYLON.Vector3(1, 1.5, 2.45);
        cupboardRightLeft.position = new BABYLON.Vector3(0.05, 1.5, 1.5);
        cupboardRightRight.position = new BABYLON.Vector3(1.95, 1.5, 1.5);
        cupboardRightTop.position = new BABYLON.Vector3(1.0, 2.95, 1.5);
        // Merging instances messes with mesh position
        // So position is a translation compared to last instance position
        //cupboardRightBottom.position = new BABYLON.Vector3(1, 0.05, 1.5);
        cupboardRightBottom.position = new BABYLON.Vector3(0, -2.9, 0);
        //cupboardRightCenterTop.position = new BABYLON.Vector3(1, 2.05, 1.5);
        cupboardRightCenterTop.position = new BABYLON.Vector3(0, 2, 0);
        //cupboardRightCenterBottom.position = new BABYLON.Vector3(1, 1.95, 1.5);
        cupboardRightCenterBottom.position = new BABYLON.Vector3(0, -0.1, 0);

        // Merge cupboard meshes to reduce draw calls
        // Instances seems to not have any interest when merging them
        var cupboard = BABYLON.Mesh.MergeMeshes(
            [
                cupboardLeft,
                cupboardRightBack,
                cupboardRightLeft,
                cupboardRightRight,
                cupboardRightTop,
                cupboardRightBottom,
                cupboardRightCenterTop,
                cupboardRightCenterBottom
            ],
            true,                               // Dispose of source meshes
            true                                // Useless, but you avoid an useless boucle by setting to true
        );

        // Create the animated door mesh, please consider using MeshBuilder class instead of Mesh
        var cupboardDoor = new BABYLON.MeshBuilder.CreateBox(
            "cupboardDoor",
            {
                width: 2,
                height: 2,
                depth: 0.1
            },
            scene
        );

        // Translate the door
        cupboardDoor.position = new BABYLON.Vector3(1, 1, 0.55);


        /////////////////
        // CUSTOM PART //
        /////////////////


        var amigaMaterial = new BABYLON.ShaderMaterial(
            "amiga",
            scene,
            "./shaders/amiga",
            {
                attributes: ["position", "uv"],
                uniforms: ["worldViewProjection"]
            }
        );

        amigaMaterial.setTexture(
            "amigaTexture",
            new BABYLON.Texture(
                "resources/textures/amiga.jpg",
                scene
            )
        );

        cupboard.material = amigaMaterial;



        /*BABYLON.SceneLoader.Load("./resources/models/", "Diamond.obj", engine, function (newScene) {
            // ...
        });*/

/*        var loader = new BABYLON.AssetsManager(scene);
        var diamond = loader.addMeshTask("diamond", "", "./resources/models/", "Diamond.obj");
*/

        BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

        BABYLON.SceneLoader.ImportMesh("", "./resources/models/", "diamond_2.obj", scene, function (meshes) {
            console.log(meshes.length);
            diamond = meshes[0];
            diamond.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
            diamond.position = new BABYLON.Vector3(0, 1, -3);
            diamond.rotation = new BABYLON.Vector3(0, 0, 0);
            //diamond.computeVertexNormals();
            //diamond.computeFaceNormals();
            //diamond.updateMeshPositions(null, true);
            diamond.material = diamondMaterial;
            //diamond.material = amigaMaterial;
            //diamond.material = new BABYLON.NormalMaterial("normal", scene);
            //diamond.material.diffuseTexture = new BABYLON.Texture("resources/textures/amiga.jpg", scene);
            //diamond.material.alpha = 0.5;
        });

        diamondMaterial = new BABYLON.ShaderMaterial(
            "diamondMaterial",
            scene,
            "./shaders/diamond",
            {
                attributes: ["uv", "position", "normal"],
                uniforms: ["world", "worldViewProjection"],
                needAlphaBlending: true
            }
        );

        diamondMaterial.setTexture(
            "textureSampler",
            new BABYLON.Texture(
                "resources/textures/amiga.jpg",
                scene
            )
        );

        diamondMaterial.setVector3("cameraPos", camera.position);


        /////////
        // END //
        /////////


        ////////////////////
        // Door animation //
        ////////////////////

        // Get the HTML element to handle door animation
        var animationButton = document.getElementById('animateButton');

        // Create or remove the animation handling
        if (animation)
        {
            // Create door rotation animation
            var doorRotationAnimation = new BABYLON.Animation(
                "doorRotationAnimation",
                "rotation.y",                                   // Property to animate
                60,                                             // Framerate requested, highest FPS possible in the animation
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,          // Type of change
                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,   // Loop mode
                false                                           // Enable or disable blending (not in the docs, it does shit when enabled)
            );
            // Create door translation animation
            var doorTranslationAnimation = new BABYLON.Animation(
                "doorTranslationAnimation",
                "position",
                60,
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
            );
            // Create animation keys
            var rotationKeys = [];
            var translationKeys = [];
            // Create source and target vectors outside the keys to avoid creating new oject each frame
            var rotationTarget = -Math.PI/2;
            var translationSource = new BABYLON.Vector3(1, 1, 0.55);
            var translationTarget = new BABYLON.Vector3(1.95, 1, -0.4);
            // Populate animation keys
            rotationKeys.push({
                frame: 0,
                value: 0
            });
            rotationKeys.push({
                frame: 30,
                value: rotationTarget
            });
            rotationKeys.push({
                frame: 60,
                value: 0
            });
            translationKeys.push({
                frame: 0,
                value: translationSource
            });
            translationKeys.push({
                frame: 30,
                value: translationTarget
            });
            translationKeys.push({
                frame: 60,
                value: translationSource
            });
            // Set animation keys to their respective animation
            doorRotationAnimation.setKeys(rotationKeys);
            doorTranslationAnimation.setKeys(translationKeys);
            // Add animations to the door mesh
            cupboardDoor.animations.push(doorRotationAnimation);
            cupboardDoor.animations.push(doorTranslationAnimation);

            // Keep track of animation
            var doorRotated = false;
            var animationIsRunning = false;

            // Open or close the door
            var toggleDoor = function()
            {
                // Don't do anything if last animation is still running
                if (!animationIsRunning)
                {
                    // Declare that a new animation is running
                    animationIsRunning = true;

                    // Check if door is opened or closed
                    if (doorRotated)
                    {
                        // Close door
                        scene.beginAnimation(
                            cupboardDoor,                   // The mesh to animate
                            30,                             // The starting frame
                            60,                             // The ending frame
                            false,                          // Depends on animation loop mode, enable or disable looping
                            1,                              // Speed ratio of the animation, default is 1
                            function() {                    // Callback on animation end
                                // Declare that the animation is finished
                                animationIsRunning = false;
                            }
                        );
                    }
                    else
                    {
                        // Open door
                        scene.beginAnimation(
                            cupboardDoor,
                            0,
                            30,
                            false,
                            1,
                            function() {
                                // Declare that the animation is finished
                                animationIsRunning = false;
                            }
                        );
                    }

                    // Change the state of the door (closed/opened)
                    doorRotated = !doorRotated;
                }
            };

            // Handle animation on keypress
            window.addEventListener('keypress', function(key)
            {
                if (key.which === 97) // 'A' as 'Animation'
                {
                    toggleDoor();
                }
            });
            // Handle animation on button click
            document.getElementById('animateButton').addEventListener('click', function() {
                toggleDoor();
            });
        }
        else
        {
            // Remove the HTML element from the DOM
            animationButton.parentNode.removeChild(animationButton);
        }


        /////////////////////////////
        // Generic toggle function //
        /////////////////////////////

        var toggleFunction = function(elem, enable, ifStatement, elseStatement, key)
        {
            //Keep track of the process state;
            var isEnabled = !enable;

            // Generic toggle function
            var toggle = function()
            {
                if (isEnabled)
                {
                    // Custom statement if the process is turned off
                    ifStatement();
                }
                else
                {
                    // Custom statement if the process is turned on
                    elseStatement();
                }
                // Toggle the process state
                if (toggle)
                {
                    isEnabled = !isEnabled;
                }
            };

            // Init process state
            toggle();

            // Handle process on keypress event
            window.addEventListener('keypress', function(k)
            {
                if (k.which === key)
                {
                    toggle();
                }
            });
            // Handle process on button click event
            elem.addEventListener('click', function() {
                toggle();
            });

        };


        /////////////////
        // Blur effect //
        /////////////////

        // Get the HTML element to handle blur effect
        var effectButton = document.getElementById('effectButton');

        // Create or remove the blur effect handling
        if (effect)
        {
            // First, create a pipeline to handle PP effects
            var standardPipeline = new BABYLON.PostProcessRenderPipeline(engine, "standardPipeline");

            // Create the blur PP effect
            var horizontalBlur = new BABYLON.PostProcessRenderEffect(
                engine,                                 // Bind the effect to the Babylon engine
                "horizontalBlurEffect",
                function() {
                    return new BABYLON.BlurPostProcess(
                        "hb",
                        new BABYLON.Vector2(1.0, 0),    // Direction
                        3.0,                            // Blur width
                        1.0,                            // Options
                        null,                           // Camera
                        null,                           // Sampling mode, default is BABYLON.Texture.BILINEAR_SAMPLINGMODE
                        engine,                         // Babylon engine
                        true                            // Reusable, diving into the source code, seems to be useless
                    )
                }
            );

            // Add the PP effect to the pipeline
            standardPipeline.addEffect(horizontalBlur);

            // Add the pipeline to a global pipeline manager
            scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);

            // Bind the default camera to the pipeline
            scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera);


            // Call the generic toggle function with custom attributes
            toggleFunction(
                effectButton,
                false,
                function() {
                    scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
                },
                function() {
                    scene.postProcessRenderPipelineManager.enableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
                },
                101     // 'E' as 'Effect'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            effectButton.parentNode.removeChild(effectButton);
        }


        ///////////////////////////
        // Render target texture //
        ///////////////////////////

        // Get the HTML element to handle render target texture
        var renderTargetButton = document.getElementById('renderTargetButton');

        // Create or remove the render target texture handling
        if (rtt)
        {
            // First, create a render target texture
            var renderTexture = new BABYLON.RenderTargetTexture(
                'renderTexture',
                512,                                    // Size of the texture
                scene,                                  // Bind the texture to the scene
                false,                                  // Set true if you want to generate mipmaps
                true,                                   // Update TransformMatrix every frame when set to false. Default is true. It does shit (deformation of the original scene) when enabled.
                BABYLON.Engine.TEXTURETYPE_UNSIGNED_INT,// Texture type. Default is BABYLON.Engine.TEXTURETYPE_UNSIGNED_INT
                false,                                  // True if it's a cubic texture. Default is false
                BABYLON.Texture.TRILINEAR_SAMPLINGMODE  // Filtering method. Default is BABYLON.Texture.TRILINEAR_SAMPLINGMODE
            );

            // Populate render list
            renderTexture.renderList.push(cupboard);
            renderTexture.renderList.push(cupboardDoor);

            // Create a plane to apply the texture
            var renderTargetPlane = new BABYLON.MeshBuilder.CreatePlane(
                'renderTargetPlane',
                {
                    width: 10.0,
                    height: 5.0
                },
                scene
            );
            renderTargetPlane.position = new BABYLON.Vector3(0, -2.5, -2.5);

            // Create a material to use the texture
            var renderTargetMaterial = new BABYLON.StandardMaterial(
                'renderTargetMaterial',
                scene,                      // Bind the material to the scene
                false                       // If true, add the material to the scene materials array
            );

            // Bind the material to the plane
            renderTargetPlane.material = renderTargetMaterial;
            renderTargetPlane.material.diffuseTexture = renderTexture;

            // Finally add the texture to the scene custom render targets
            scene.customRenderTargets.push(renderTexture);

            // Call the generic toggle function with custom attributes
            toggleFunction(
                renderTargetButton,                     // HTML element
                false,                                  // Turns the process off at application launch
                function() {
                    renderTargetPlane.setEnabled(0);    // Disable render target texture
                },
                function() {
                    renderTargetPlane.setEnabled(1);    // Enable render target texture
                },
                114                                     // 'R' as 'Render Target Texture'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            renderTargetButton.parentNode.removeChild(renderTargetButton);
        }


        //////////////////////
        // Canvas expansion //
        //////////////////////

        // Get the HTML element to handle expansion
        var expandButton = document.getElementById('expandButton');

        // Create or remove the expansion handling
        if (expansion)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                expandButton,
                true,
                function() {
                    canvas.style.width = "50%";     // Contract the canvas element
                    engine.resize();
                    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
                },
                function() {
                    canvas.style.width = "100%";    // Expand the canvas element
                    engine.resize();
                    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
                },
                99                                  // 'C' as 'Canvas expansion'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            expandButton.parentNode.removeChild(expandButton);
        }


        /////////////////
        // Debug layer //
        /////////////////

        // Get the HTML element to handle debug layer display
        var debugButton = document.getElementById('debugButton');

        if (debug)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                debugButton,
                true,
                function() {
                    scene.debugLayer.hide();        // Hide the debug layer
                },
                function() {
                    scene.debugLayer.show();        // Show the debug layer
                },
                100                                 // 'D' as 'Debug'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            debugButton.parentNode.removeChild(debugButton);
        }


        ////////////////////
        // Stop rendering //
        ////////////////////

        // Get the HTML element to handle render loop
        var stopButton = document.getElementById('stopBabylonButton');

        // Create or remove the render loop handling
        if (stop)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                stopButton,
                false,
                function() {
                    engine.stopRenderLoop();            // Stop render loop
                },
                function() {
                    engine.runRenderLoop(function(){    // Start render loop
                        scene.render();
                        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
                        slowPotentialFps();
                    });
                },
                115                                     // 'S' as 'Stop'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            stopButton.parentNode.removeChild(stopButton);
        }


        //////////////////////////
        // End of main function //
        //////////////////////////

        // Return the created scene
        return scene;
    };


    ///////////
    // Utils //
    ///////////

    // Create a variable to slow potential framerate display
    var slowPotentialFps = 0;

    // Display potential framerate
    var displayPotentialFps = function()
    {
        // Compute potential framerate
        var potentialFps = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0);

        // To slow display, display only every 50 incrementations of slowPotentialFps
        if (slowPotentialFps === 0)
        {
            potentialFpsLabel.innerHTML = potentialFps + " fps";
        }
        else
        {
            // Exceptionally, display potential framerate if it's under 100
            if (potentialFps < 100)
            {
                potentialFpsLabel.innerHTML = potentialFps + " fps";
            }
        }

        // Increment the slow variable
        slowPotentialFps++;

        // Reinitialize the slow variable every 50 incrementations
        if (slowPotentialFps > 50)
        {
            slowPotentialFps = 0;
        }
    };


    ///////////////////////////////////////////
    // Finally call main functions to render //
    ///////////////////////////////////////////

    var diamond;
    var diamondMaterial;
    var camera;

    // Call the main function to create scene
    var scene = createScene();

    // Render loop
    engine.runRenderLoop(function()
    {
        // Render scene
        scene.render();

        //diamondMaterial.setVector3("cameraPos", camera.position);

        // Display framerate
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

        // Display potential framerate
        displayPotentialFps();
    });


    ////////////
    // Events //
    ////////////

    // Resize engine on canvas resize
    window.addEventListener('resize', function()
    {
        engine.resize();
        resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
    });
};




















// SSAO

Babylon.run10 = function(animation, effect, rtt, expansion, debug, stop)
{

    ////////////////////////////////////////////////////////
    // Babylon engine and global variables initialization //
    ////////////////////////////////////////////////////////

    // Get the canvas element
    var canvas = document.getElementById('renderCanvas');

    // Antialiasing is useless with post processing effects, turn it off.
    var antialiasing = false;
    // Feel free to fill the options object to modify the context
    var options = {
        antialias: antialiasing,                            // Also in the constructor parameters
        preserveDrawingBuffer: false,                       // Didn't look what it does
        limitDeviceRatio: window.devicePixelRatio || 1.0    // Used to set the device ratio if adaptToDeviceRatio is turned on
    };
    // Adapting to device ratio is energy-intensive, turn it off.
    var adaptToDeviceRatio = false;
    // Bind the canvas element to the Babylon engine.
    var engine = new BABYLON.Engine(canvas, antialiasing, options, adaptToDeviceRatio);

    // Get an HTML element to display framerate
    var fpsLabel = document.getElementById('fpsLabel');
    // Get an HTML element to display potential framerate
    var potentialFpsLabel = document.getElementById('potentialFpsLabel');
    // Get an HTML element to display current device resolution
    var resolutionLabel = document.getElementById('resolutionLabel');
    // Initialize the device resolution
    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();


    ///////////////////
    // Main function //
    ///////////////////

    var createScene = function()
    {

        ////////////////////
        // Scene & Camera //
        ////////////////////

        // Create a basic Babylon Scene object
        var scene = new BABYLON.Scene(engine);

        // Create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera(
            'defaultCamera',
            3*Math.PI/2,                    // Alpha position
            Math.PI/3,                      // Beta position
            15,                             // Distance from the target
            new BABYLON.Vector3(0, 0, 0),   // Target
            scene                           // Bind the camera to the scene
        );
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // Attach the camera to the canvas element
        camera.attachControl(canvas, true);


        ////////////
        // Lights //
        ////////////

        // Create a basic hemispheric light, aiming aiming the sky
        var hemisphericLight = new BABYLON.HemisphericLight(
            'defaultHemisphericLight',
            new BABYLON.Vector3(0, 1, 0),   // Target
            scene                           // Bind the light to the scene
        );
        // Create a basic directional light, aiming the vector direction (0, -1, 1)
        var directionalLight = new BABYLON.DirectionalLight(
            'defaultDirectionalLight',
            new BABYLON.Vector3(0, -1 ,1),  // Target
            scene                           // Bind the light to the scene
        );
        // Decrease the light intensity, default is too bright
        directionalLight.intensity = 0.2;
        // Create a basic point light, positioned at vector position (0, 15, 0)
        var pointLight = new BABYLON.PointLight(
            'defaultPointLight',
            new BABYLON.Vector3(0, 15, 0),  // Position
            scene                           // Bind the light to the scene
        );


        //////////////
        // Geometry //
        //////////////

        // Create the ground, please consider using MeshBuilder class instead of Mesh
        var ground = new BABYLON.MeshBuilder.CreateGround(
            "ground",
            {
                width: 10.0,
                height: 5.0,
                subdivisions: 1,
                updatable: false    // Set to true if you plan to change vertices after the mesh has been rendered
            },
            scene                   // Bind the ground to the scene
        );

        // Create the walls, please consider using MeshBuilder class instead of Mesh
        var wallLeft = new BABYLON.MeshBuilder.CreatePlane(
            "wallLeft",
            {
                size: 5.0,                                  // Size determines width and height in Mesh class. It's just there to maintain backwards compatibility
                width: 5.0,
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,   // FRONT, BACK or DOUBLE
                updatable: false,                           // True if vertices are supposed to change once created
                sourcePlane: null                           // Plane instance. It builds a mesh plane from a Math plane
            },
            scene
        );
        var wallRight = new BABYLON.MeshBuilder.CreatePlane(
            "wallRight",
            {
                size: 5.0,
                width: 5.0,
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                updatable: false,
                sourcePlane: null
            },
            scene
        );
        var wallCenter = new BABYLON.MeshBuilder.CreatePlane(
            "wallCenter",
            {
                size: 5.0,
                width: 10.0,                                 // wallCenter.scaling.x = 2;
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                updatable: false,
                sourcePlane: null
            },
            scene
        );

        // First way to translate a mesh
        wallLeft.position.x = -5;
        wallLeft.position.y = +2.5;
        // Second way to transalte a mesh
        wallLeft.position = new BABYLON.Vector3(-5, 2.5, 0);
        // Third way to translate a mesh
        wallLeft.setPositionWithLocalVector(new BABYLON.Vector3(-5, 2.5, 0));
        // Fourth way to translate a mesh
        wallLeft.locallyTranslate(new BABYLON.Vector3(5, -2.5, 0));
        // Fifth way to translate a mesh
        wallLeft.translate(new BABYLON.Vector3(-5, 2.5, 0), 1, BABYLON.Space.LOCAL);

        // First way to rotate a mesh
        wallLeft.rotation.y = -Math.PI/2;
        // Second way to rotate a mesh
        wallLeft.rotation = new BABYLON.Vector3(0, -2*Math.PI/2, 0);
        // Third way to rotate a mesh
        wallLeft.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);

        // Rotate and translate walls
        wallRight.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
        wallRight.position = new BABYLON.Vector3(5, 2.5, 0);
        wallCenter.position = new BABYLON.Vector3(0, 2.5, 2.5);

        // Merge wall meshes to reduce draw calls
        var wall = new BABYLON.Mesh.MergeMeshes(
            [wallLeft, wallRight, wallCenter],  // Array of meshes to merge, they must be of the same material
            true,                               // Dispose of the source meshes (when false, you get two sets of meshes !)
            true,                               // TOTALLY USELESS after diving into the source code : "When the sum of the vertices > 64k, this must be set to true. Otherwise, it's faster set to false."
            null                                // When set, vertices inserted into this Mesh.  Meshes can then be merged into a Mesh sub-class.
        );

        // Create the cupboard, please consider to use MeshBuilder class instead of Mesh
        var cupboardLeft = new BABYLON.MeshBuilder.CreateBox(
            "cupboardLeft",
            {
                size: 1.0,                                  // When height, width or depth is not defined, size is the default value
                height: 3.0,                                // cupboardLeft.scaling.y = 3;
                width: 2.0,                                 // cupboardLeft.scaling.x = 2;
                depth: 2.0,                                 // cupboardLeft.scaling.z = 2;
                faceColors: null,                           // Array of 6 Color4, one color for each face
                faceUV: null,                               // Array of 6 Vector4, one UV definition for each face
                updatable: false,
                sideOrientation: BABYLON.Mesh.FRONTSIDE
            },
            scene
        );
        var cupboardRightBack = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightBack",
            {
                height: 3.0,                                // cupboardLeft.scaling.y = 3;
                width: 2.0,                                 // cupboardLeft.scaling.x = 2;
                depth: 0.1                                  // cupboardLeft.scaling.z = 0.1;
            },
            scene
        );
        // Clones are new Mesh objects with exactly the same geometry but which can vary on everything else
        var cupboardRightLeft = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightLeft",
            {
                width: 0.1,
                height: 3,
                depth: 1.8
            },
            scene
        );
        var cupboardRightRight = cupboardRightLeft.clone("cupboardRightRight");
        var cupboardRightTop = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightTop",
            {
                width: 1.8,
                height: 0.1,
                depth: 1.8
            },
            scene
        );
        // Instances can only vary on position, rotation, quaternion, pivotMatrix and scaling properties
        // Instances share geometry and material, so they reduce draw calls
        var cupboardRightBottom = cupboardRightTop.createInstance("cupboardRightBottom");
        var cupboardRightCenterTop = cupboardRightTop.createInstance("cupboardRightCenterTop");
        var cupboardRightCenterBottom = cupboardRightTop.createInstance("cupboardRightCenterBottom");

        // Translate cupboard meshes
        cupboardLeft.position = new BABYLON.Vector3(-1, 1.5, 1.5);
        cupboardRightBack.position = new BABYLON.Vector3(1, 1.5, 2.45);
        cupboardRightLeft.position = new BABYLON.Vector3(0.05, 1.5, 1.5);
        cupboardRightRight.position = new BABYLON.Vector3(1.95, 1.5, 1.5);
        cupboardRightTop.position = new BABYLON.Vector3(1.0, 2.95, 1.5);
        // Merging instances messes with mesh position
        // So position is a translation compared to last instance position
        //cupboardRightBottom.position = new BABYLON.Vector3(1, 0.05, 1.5);
        cupboardRightBottom.position = new BABYLON.Vector3(0, -2.9, 0);
        //cupboardRightCenterTop.position = new BABYLON.Vector3(1, 2.05, 1.5);
        cupboardRightCenterTop.position = new BABYLON.Vector3(0, 2, 0);
        //cupboardRightCenterBottom.position = new BABYLON.Vector3(1, 1.95, 1.5);
        cupboardRightCenterBottom.position = new BABYLON.Vector3(0, -0.1, 0);

        // Merge cupboard meshes to reduce draw calls
        // Instances seems to not have any interest when merging them
        var cupboard = BABYLON.Mesh.MergeMeshes(
            [
                cupboardLeft,
                cupboardRightBack,
                cupboardRightLeft,
                cupboardRightRight,
                cupboardRightTop,
                cupboardRightBottom,
                cupboardRightCenterTop,
                cupboardRightCenterBottom
            ],
            true,                               // Dispose of source meshes
            true                                // Useless, but you avoid an useless boucle by setting to true
        );

        // Create the animated door mesh, please consider using MeshBuilder class instead of Mesh
        var cupboardDoor = new BABYLON.MeshBuilder.CreateBox(
            "cupboardDoor",
            {
                width: 2,
                height: 2,
                depth: 0.1
            },
            scene
        );

        // Translate the door
        cupboardDoor.position = new BABYLON.Vector3(1, 1, 0.55);


        /////////////////
        // CUSTOM PART //
        /////////////////




        var normalDepthMaterial = new BABYLON.ShaderMaterial(
            "normalDepthMaterial",
            scene,
            "./shaders/normaldepth1",
            {
                attributes: ["position"],
                uniforms: ["worldViewProjection"],
                needAlphaBlending: false,
                needAlphaTesting: false
            }
        );

        var ssaoMaterial = new BABYLON.ShaderMaterial(
            "ssaoMaterial",
            scene,
            "./shaders/ssao3",
            {
                attributes: ["position", "uv"],
                uniforms: ["worldViewProjection"],
                needAlphaBlending: false,
                needAlphaTesting: false
            }
        );

        var rtt = new BABYLON.RenderTargetTexture(
            "rtt",
            1024,
            scene
        );

        scene.customRenderTargets.push(rtt);

        rtt.renderList.push(cupboard, cupboardDoor, wall, ground);

        var effectPlane = new BABYLON.MeshBuilder.CreatePlane(
            'effectPlane',
            {
                width: 10.0,
                height: 5.0
            },
            scene
        );
        effectPlane.position = new BABYLON.Vector3(0, -2.5, -2.5);

        effectPlane.material = ssaoMaterial;

        rtt.onBeforeRender = function ()
        {
            for (var i = 0; i < rtt.renderList.length; i++)
            {
                rtt.renderList[i]._savedMaterial = rtt.renderList[i].material;
                rtt.renderList[i].material = normalDepthMaterial;
            }
        };

        rtt.onAfterRender = function () {
            // Restoring previoux material
            for (var i = 0; i < rtt.renderList.length; i++) {
                rtt.renderList[i].material = rtt.renderList[i]._savedMaterial;
            }
        };

        //var test = scene.enableDepthRenderer();
        
        ssaoMaterial.setTexture(
            "normalDepthSampler",
            rtt
            //test.getDepthMap()
        );

        var kernelSize = 4;
        var kernel = [];

        for (var i = 0; i < kernelSize; i++)
        {
            var samplePoint = new BABYLON.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random());
            kernel[i] = samplePoint;
            kernel[i].normalize();

            var scale = i / kernelSize;
            scale *= scale;
            scale = 0.1 * (1 - scale) + scale;
            kernel[i].scaleInPlace(scale);
        }

        ssaoMaterial.setVector3(
            "uSampleKernel",
            kernel
        );

        var noiseSize = 4;
        var noise = [];

        for (var i = 0; i < noiseSize; i++)
        {
            noise[i] = [];
            for (var j = 0; j < noiseSize; j++)
            {
                var randomValue = new BABYLON.Vector2(
                    Math.floor(255 * (Math.random() * 2 - 1)),
                    Math.floor(255 * (Math.random() * 2 - 1))
                );
                noise[i][j] = randomValue;
            }
        }

        var noiseTexture = new BABYLON.DynamicTexture("noiseSampler", noiseSize, scene, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
        noiseTexture.wrapU = noiseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
        var context = noiseTexture.getContext();

        for (var i = 0; i < noiseSize; i++)
        {
            for (var j = 0; j < noiseSize; j++)
            {
                context.fillStyle = 'rgb(' + noise[i][j].x + ', ' + noise[i][j].y + ', ' + 0.0 + ')';
                context.fillRect(i, j, 1, 1);
            }
        }

        noiseTexture.update(false);

        ssaoMaterial.setTexture(
            "noiseSampler",
            noiseTexture
        );

        var noiseScale = new BABYLON.Vector2(
            //1.0, 1.0
            //10.0 / noiseSize, 5.0 / noiseSize
            scene.getEngine().getRenderWidth() / noiseSize,
            scene.getEngine().getRenderHeight() / noiseSize
        );

        ssaoMaterial.setVector2(
            "uNoiseScale",
            noiseScale
        );

        var projectionInverse = camera.getProjectionMatrix().invert();

        ssaoMaterial.setMatrix(
            "projectionInverse",
            projectionInverse
        );

        camera.minZ = 0.1;
        camera.maxZ = 100.0;
        var far = 100.0;
        var near = 0.1;

/*
        BABYLON.SceneLoader.ImportMesh("", "resources/models/", "bunny.babylon", scene, function (newMeshes, particleSystems) {
            var bunny = newMeshes[0];
            bunny.scaling = new BABYLON.Vector3(15.0, 15.0, 15.0);
            bunny.position = new BABYLON.Vector3(0.0, 0.0, -2.0);
        });*/

/*

        // ShaderMaterial
        // => Plan   dans un beforerender

        // renderTarget
        // renderList: plan
        // shaderMaterial.setTexture(renderTarget)

        // Recommencer : renderTarget de ce plan avec cette texture

        var normalDepthMaterial = new BABYLON.ShaderMaterial(
            "normalDepthMaterial",
            scene,
            "./shaders/normaldepth",
            {
                attributes: ["position", "normal"],
                uniforms: ["worldViewProjection", "world"]
            }
        );

        var depthMaterial = new BABYLON.ShaderMaterial(
            "depthMaterial",
            scene,
            "./shaders/depth",
            {
                attributes: ["position"],
                uniforms: ["worldViewProjection"]
            }
        );

        var ssaoMaterial = new BABYLON.ShaderMaterial(
            "ssaoMaterial",
            scene,
            "./shaders/ssao2",
            {
                attributes: ["position", "uv"],
                uniforms: ["worldViewProjection", "projection"]
            }
        );

        var rtt = new BABYLON.RenderTargetTexture(
            "rtt",
            1024,
            scene
        );
        var rtt2 = new BABYLON.RenderTargetTexture(
            "rtt2",
            1024,
            scene
        );
        scene.customRenderTargets.push(rtt);
        scene.customRenderTargets.push(rtt2);
        rtt.renderList.push(cupboard, cupboardDoor, wall, ground);
        rtt2.renderList.push(cupboard, cupboardDoor, wall, ground);

        rtt.onBeforeRender = function ()
        {
            for (var i = 0; i < rtt.renderList.length; i++)
            {
                rtt.renderList[i]._savedMaterial = rtt.renderList[i].material;
                rtt.renderList[i].material = normalDepthMaterial;
            }
        };

        rtt.onAfterRender = function () {
            // Restoring previoux material
            for (var i = 0; i < rtt.renderList.length; i++) {
                rtt.renderList[i].material = rtt.renderList[i]._savedMaterial;
            }
        };

        var effectPlane = new BABYLON.MeshBuilder.CreatePlane(
            'effectPlane',
            {
                width: 10.0,
                height: 5.0
            },
            scene
        );
        effectPlane.position = new BABYLON.Vector3(0, -2.5, -2.5);

        effectPlane.material = ssaoMaterial;

        ssaoMaterial.setTexture(
            "normalDepthTexture",
            rtt
        );

        ssaoMaterial.setTexture(
            "sceneTexture",
            rtt2
        );

        ssaoMaterial.setTexture(
            "noiseTexture",
            new BABYLON.Texture(
                "resources/textures/randomTexture.png",
                scene
            )
        );

        var sampleKernelSize = 6;
        var sampleKernel = [];
        for(var i = 0; i < sampleKernelSize; i++)
        {
            sampleKernel[i] = new BABYLON.Vector3(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0, Math.random());
            sampleKernel[i].normalize();

            sampleKernel[i] *= Math.random();
            //return (1-amt)*start+amt*end

            var scale = i / sampleKernelSize;
            scale = (1-scale*scale)*0.1+scale*scale*1;//   0.1, 1.0, scale * scale);
            sampleKernel[i] *= scale;
        }


        ssaoMaterial.setVector3(
            "uSampleKernel",
            sampleKernel
        );

        var radius = 1.5;

        ssaoMaterial.setFloat(
            "uRadius",
            radius
        );

        var power = 2.0;

        ssaoMaterial.setFloat(
            "uPower",
            power
        );


        var projectionInverse = camera.getProjectionMatrix().invert();

        ssaoMaterial.setMatrix(
            "projectionInverse",
            projectionInverse
        );

        //(view * model).invert.transpose

        var viewMatrix = camera.getViewMatrix();
        var modelMatrix = scene.getTransformMatrix();
        var normalMatrix = BABYLON.Matrix.Transpose(viewMatrix.multiply(modelMatrix).invert());
        console.log(normalMatrix);
        //var normalMatrix = viewMatrix * modelMatrix;

        normalDepthMaterial.setMatrix(
            "normalMatrix",
            normalMatrix
        );*/

/*
        var kernel = [4];
        var kernelSize = kernel.length;
        for (var i = 0; i < kernelSize; ++i)
        {
            kernel[i] = vec3(
                random(-1.0, 1.0),
                random(-1.0, 1.0),
                random(0.0, 1.0)
            );
            kernel[i].normalize();
        }*/




/*






        var redMaterial = new BABYLON.ShaderMaterial(
            "redMaterial",
            scene,
            "./shaders/red",
            {
                attribute: ["position"],
                uniform: ["worldViewProjection"]
            }
        );

        var greenMaterial = new BABYLON.ShaderMaterial(
            "greenMaterial",
            scene,
            "./shaders/green",
            {
                attribute: ["position"],
                uniform: ["worldViewProjection"]
            }
        );

        var blueMaterial = new BABYLON.ShaderMaterial(
            "blueMaterial",
            scene,
            "./shaders/blue",
            {
                attribute: ["position"],
                uniform: ["worldViewProjection"]
            }
        );

        var effectPlane = new BABYLON.MeshBuilder.CreatePlane(
            'effectPlane',
            {
                width: 10.0,
                height: 5.0
            },
            scene
        );
        effectPlane.position = new BABYLON.Vector3(0, -2.5, -2.5);


        var firstRTT = new BABYLON.RenderTargetTexture(
            "firstRTT",
            1024,
            scene
        );
        scene.customRenderTargets.push(firstRTT);
        firstRTT.renderList.push(cupboard, cupboardDoor, wall, ground);

        effectPlane.material = depthMaterial;

        depthMaterial.setTexture(
            "originalScene",
            firstRTT
        );



        var secondRTT = new BABYLON.RenderTargetTexture(
            "secondRTT",
            1024,
            scene
        );
        scene.customRenderTargets.push(secondRTT);
        secondRTT.renderList.push(effectPlane);


        var thirdRTT = new BABYLON.RenderTargetTexture(
            "thirdRTT",
            1024,
            scene
        );
        scene.customRenderTargets.push(thirdRTT);
        thirdRTT.renderList.push(effectPlane);


        firstRTT.onBeforeRender = function() {


        };

        firstRTT.onAfterRender = function() {


        };

        secondRTT.onBeforeRender = function() {

            effectPlane.material = redMaterial;

            redMaterial.setTexture(
                "scene",
                firstRTT
            );

        };


        secondRTT.onAfterRender = function() {

            effectPlane.material = greenMaterial;

            greenMaterial.setTexture(
                "resultScene",
                secondRTT
            );

            greenMaterial.setTexture(
                "originalScene",
                firstRTT
            );

        };


        thirdRTT.onBeforeRender = function() {


        };

        thirdRTT.onAfterRender = function() {

            effectPlane.material = blueMaterial;

            blueMaterial.setTexture(
                "resultScene",
                thirdRTT
            );

            blueMaterial.setTexture(
                "originalScene",
                firstRTT
            );

        };
*/

/*
        var material1 = new BABYLON.ShaderMaterial(
            "material1",
            scene,
            "./shaders/ssao1",
            {
                attributes: ["position"],
                uniforms: ["worldViewProjection"]
            }
        );

        var material2 = new BABYLON.ShaderMaterial(
            "material2",
            scene,
            "./shaders/ssao2",
            {
                attributes: ["position", "uv    "],
                uniforms: ["worldViewProjection"]
            }
        );

        var renderTargetTexture = new BABYLON.RenderTargetTexture("renderTargetTexture", 1024, scene);
        scene.customRenderTargets.push(renderTargetTexture);
        renderTargetTexture.renderList.push(cupboard, cupboardDoor, wall, ground);

        // setTexture dans un material pour utiliser depth shader

        // texture sur un mesh

        // Récupérer la texture du mesh

        // setTevture dans un material pour utiliser ssaoShader

        // Texture sur le plane

        var renderer = scene.enableDepthRenderer();

        material2.setTexture(
            "previousTexture",
            renderer.getDepthMap()
        );

        var renderTargetPlane = new BABYLON.MeshBuilder.CreatePlane(
            'renderTargetPlane',
            {
                width: 10.0,
                height: 5.0
            },
            scene
        );
        renderTargetPlane.position = new BABYLON.Vector3(0, -2.5, -2.5);

        renderTargetPlane.material = material2;



*/
/*
        // 1. Render Target Texture
        var renderTargetTexture = new BABYLON.RenderTargetTexture("renderTargetTexture", 1024, scene);
        scene.customRenderTargets.push(renderTargetTexture);
        renderTargetTexture.renderList.push(cupboard, cupboardDoor, wall, ground);
        
        var depthMaterial = new BABYLON.ShaderMaterial(
            "depthMaterial",
            scene,
            "./shaders/depth",
            {
                attributes: ["position", "normal"],
                uniforms: ["worldViewProjection", "world", "view", "projection", "worldView", "viewProjection"]
            }
        );

        var ssaoMaterial = new BABYLON.ShaderMaterial(
            "ssaoMaterial",
            scene,
            "./shaders/ssao1",
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["worldViewProjection", "view", "worldView"]
            }
        );

        ssaoMaterial.setTexture(
            "noiseTexture",
            new BABYLON.Texture(
                "resources/textures/cloudEffectTexture.png",
                scene
            )
        );

        ssaoMaterial.setTexture(
            "amigaTexture",
            renderTargetTexture
        );

        var projectionInverse = camera.getProjectionMatrix(true).invert();

        ssaoMaterial.setMatrix(
            "projectionInverse",
            projectionInverse
        );

        var worldInverse = scene.getTransformMatrix().invert();

        ssaoMaterial.setMatrix(
            "worldInverse",
            worldInverse
        );
        //cupboard.material = ssaoMaterial;

        var renderTargetPlane = new BABYLON.MeshBuilder.CreatePlane(
            'renderTargetPlane',
            {
                width: 10.0,
                height: 5.0
            },
            scene
        );
        renderTargetPlane.position = new BABYLON.Vector3(0, -2.5, -2.5);

        renderTargetPlane.material = ssaoMaterial;
        */
        /*
        
        
        var projection = camera.getProjectionMatrix(true);
        var inv_projection = projection.invert();
        var rotation = scene.getTransformMatrix();
        var inv_rotation = rotation.invert();
        var normaldepth = new BABYLON.RenderTargetTexture(
            "renderTargetTexture",
            1024,
            scene
        );
        scene.customRenderTargets.push(normaldepth);
        var random_field;



        var ssaoMaterial = new BABYLON.ShaderMaterial(
            "ssaoMaterial",
            scene,
            "./shaders/ssao",
            {
                attributes: ["uv", "position", "normal"],
                uniforms: ["worldView", "view", "viewProjection", "projection", inv_projection, inv_rotation, normaldepth, random_field],
                needAlphaBlending: true
            }
        );

        cupboardDoor.material = ssaoMaterial;

*/
        /////////
        // END //
        /////////


        ////////////////////
        // Door animation //
        ////////////////////

        // Get the HTML element to handle door animation
        var animationButton = document.getElementById('animateButton');

        // Create or remove the animation handling
        if (animation)
        {
            // Create door rotation animation
            var doorRotationAnimation = new BABYLON.Animation(
                "doorRotationAnimation",
                "rotation.y",                                   // Property to animate
                60,                                             // Framerate requested, highest FPS possible in the animation
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,          // Type of change
                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,   // Loop mode
                false                                           // Enable or disable blending (not in the docs, it does shit when enabled)
            );
            // Create door translation animation
            var doorTranslationAnimation = new BABYLON.Animation(
                "doorTranslationAnimation",
                "position",
                60,
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
            );
            // Create animation keys
            var rotationKeys = [];
            var translationKeys = [];
            // Create source and target vectors outside the keys to avoid creating new oject each frame
            var rotationTarget = -Math.PI/2;
            var translationSource = new BABYLON.Vector3(1, 1, 0.55);
            var translationTarget = new BABYLON.Vector3(1.95, 1, -0.4);
            // Populate animation keys
            rotationKeys.push({
                frame: 0,
                value: 0
            });
            rotationKeys.push({
                frame: 30,
                value: rotationTarget
            });
            rotationKeys.push({
                frame: 60,
                value: 0
            });
            translationKeys.push({
                frame: 0,
                value: translationSource
            });
            translationKeys.push({
                frame: 30,
                value: translationTarget
            });
            translationKeys.push({
                frame: 60,
                value: translationSource
            });
            // Set animation keys to their respective animation
            doorRotationAnimation.setKeys(rotationKeys);
            doorTranslationAnimation.setKeys(translationKeys);
            // Add animations to the door mesh
            cupboardDoor.animations.push(doorRotationAnimation);
            cupboardDoor.animations.push(doorTranslationAnimation);

            // Keep track of animation
            var doorRotated = false;
            var animationIsRunning = false;

            // Open or close the door
            var toggleDoor = function()
            {
                // Don't do anything if last animation is still running
                if (!animationIsRunning)
                {
                    // Declare that a new animation is running
                    animationIsRunning = true;

                    // Check if door is opened or closed
                    if (doorRotated)
                    {
                        // Close door
                        scene.beginAnimation(
                            cupboardDoor,                   // The mesh to animate
                            30,                             // The starting frame
                            60,                             // The ending frame
                            false,                          // Depends on animation loop mode, enable or disable looping
                            1,                              // Speed ratio of the animation, default is 1
                            function() {                    // Callback on animation end
                                // Declare that the animation is finished
                                animationIsRunning = false;
                            }
                        );
                    }
                    else
                    {
                        // Open door
                        scene.beginAnimation(
                            cupboardDoor,
                            0,
                            30,
                            false,
                            1,
                            function() {
                                // Declare that the animation is finished
                                animationIsRunning = false;
                            }
                        );
                    }

                    // Change the state of the door (closed/opened)
                    doorRotated = !doorRotated;
                }
            };

            // Handle animation on keypress
            window.addEventListener('keypress', function(key)
            {
                if (key.which === 97) // 'A' as 'Animation'
                {
                    toggleDoor();
                }
            });
            // Handle animation on button click
            document.getElementById('animateButton').addEventListener('click', function() {
                toggleDoor();
            });
        }
        else
        {
            // Remove the HTML element from the DOM
            animationButton.parentNode.removeChild(animationButton);
        }


        /////////////////////////////
        // Generic toggle function //
        /////////////////////////////

        var toggleFunction = function(elem, enable, ifStatement, elseStatement, key)
        {
            //Keep track of the process state;
            var isEnabled = !enable;

            // Generic toggle function
            var toggle = function()
            {
                if (isEnabled)
                {
                    // Custom statement if the process is turned off
                    ifStatement();
                }
                else
                {
                    // Custom statement if the process is turned on
                    elseStatement();
                }
                // Toggle the process state
                if (toggle)
                {
                    isEnabled = !isEnabled;
                }
            };

            // Init process state
            toggle();

            // Handle process on keypress event
            window.addEventListener('keypress', function(k)
            {
                if (k.which === key)
                {
                    toggle();
                }
            });
            // Handle process on button click event
            elem.addEventListener('click', function() {
                toggle();
            });

        };


        /////////////////
        // Blur effect //
        /////////////////

        // Get the HTML element to handle blur effect
        var effectButton = document.getElementById('effectButton');

        // Create or remove the blur effect handling
        if (effect)
        {
            // First, create a pipeline to handle PP effects
            var standardPipeline = new BABYLON.PostProcessRenderPipeline(engine, "standardPipeline");

            // Create the blur PP effect
            var horizontalBlur = new BABYLON.PostProcessRenderEffect(
                engine,                                 // Bind the effect to the Babylon engine
                "horizontalBlurEffect",
                function() {
                    return new BABYLON.BlurPostProcess(
                        "hb",
                        new BABYLON.Vector2(1.0, 0),    // Direction
                        3.0,                            // Blur width
                        1.0,                            // Options
                        null,                           // Camera
                        null,                           // Sampling mode, default is BABYLON.Texture.BILINEAR_SAMPLINGMODE
                        engine,                         // Babylon engine
                        true                            // Reusable, diving into the source code, seems to be useless
                    )
                }
            );

            // Add the PP effect to the pipeline
            standardPipeline.addEffect(horizontalBlur);

            // Add the pipeline to a global pipeline manager
            scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);

            // Bind the default camera to the pipeline
            scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera);


            // Call the generic toggle function with custom attributes
            toggleFunction(
                effectButton,
                false,
                function() {
                    scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
                },
                function() {
                    scene.postProcessRenderPipelineManager.enableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
                },
                101     // 'E' as 'Effect'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            effectButton.parentNode.removeChild(effectButton);
        }


        ///////////////////////////
        // Render target texture //
        ///////////////////////////

        // Get the HTML element to handle render target texture
        var renderTargetButton = document.getElementById('renderTargetButton');

        // Create or remove the render target texture handling
        if (rtt)
        {
            // First, create a render target texture
            var renderTexture = new BABYLON.RenderTargetTexture(
                'renderTexture',
                512,                                    // Size of the texture
                scene,                                  // Bind the texture to the scene
                false,                                  // Set true if you want to generate mipmaps
                true,                                   // Update TransformMatrix every frame when set to false. Default is true. It does shit (deformation of the original scene) when enabled.
                BABYLON.Engine.TEXTURETYPE_UNSIGNED_INT,// Texture type. Default is BABYLON.Engine.TEXTURETYPE_UNSIGNED_INT
                false,                                  // True if it's a cubic texture. Default is false
                BABYLON.Texture.TRILINEAR_SAMPLINGMODE  // Filtering method. Default is BABYLON.Texture.TRILINEAR_SAMPLINGMODE
            );

            // Populate render list
            renderTexture.renderList.push(cupboard);
            renderTexture.renderList.push(cupboardDoor);
            renderTexture.renderList.push(wall);
            renderTexture.renderList.push(ground);

            // Create a plane to apply the texture
            var renderTargetPlane = new BABYLON.MeshBuilder.CreatePlane(
                'renderTargetPlane',
                {
                    width: 10.0,
                    height: 5.0
                },
                scene
            );
            renderTargetPlane.position = new BABYLON.Vector3(0, -2.5, -2.5);

            // Create a material to use the texture
            var renderTargetMaterial = new BABYLON.StandardMaterial(
                'renderTargetMaterial',
                scene,                      // Bind the material to the scene
                false                       // If true, add the material to the scene materials array
            );

            // Bind the material to the plane
            renderTargetPlane.material = renderTargetMaterial;
            renderTargetPlane.material.diffuseTexture = renderTexture;

            // Finally add the texture to the scene custom render targets
            scene.customRenderTargets.push(renderTexture);

            // Call the generic toggle function with custom attributes
            toggleFunction(
                renderTargetButton,                     // HTML element
                false,                                  // Turns the process off at application launch
                function() {
                    renderTargetPlane.setEnabled(0);    // Disable render target texture
                },
                function() {
                    renderTargetPlane.setEnabled(1);    // Enable render target texture
                },
                114                                     // 'R' as 'Render Target Texture'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            renderTargetButton.parentNode.removeChild(renderTargetButton);
        }


        //////////////////////
        // Canvas expansion //
        //////////////////////

        // Get the HTML element to handle expansion
        var expandButton = document.getElementById('expandButton');

        // Create or remove the expansion handling
        if (expansion)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                expandButton,
                true,
                function() {
                    canvas.style.width = "50%";     // Contract the canvas element
                    engine.resize();
                    //camera.detachControl(canvas);
                    //camera.attachControl(canvas, true);
                    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
                },
                function() {
                    canvas.style.width = "100%";    // Expand the canvas element
                    engine.resize();
                    //camera.detachControl(canvas);
                    //camera.attachControl(canvas, true);
                    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
                },
                99                                  // 'C' as 'Canvas expansion'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            expandButton.parentNode.removeChild(expandButton);
        }


        /////////////////
        // Debug layer //
        /////////////////

        // Get the HTML element to handle debug layer display
        var debugButton = document.getElementById('debugButton');

        if (debug)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                debugButton,
                true,
                function() {
                    scene.debugLayer.hide();        // Hide the debug layer
                },
                function() {
                    scene.debugLayer.show();        // Show the debug layer
                    document.getElementById('DebugLayer').style.zIndex = 100;
                },
                100                                 // 'D' as 'Debug'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            debugButton.parentNode.removeChild(debugButton);
        }


        ////////////////////
        // Stop rendering //
        ////////////////////

        // Get the HTML element to handle render loop
        var stopButton = document.getElementById('stopBabylonButton');

        // Create or remove the render loop handling
        if (stop)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                stopButton,
                false,
                function() {
                    engine.stopRenderLoop();            // Stop render loop
                },
                function() {
                    engine.runRenderLoop(function(){    // Start render loop
                        scene.render();
                        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
                        slowPotentialFps();
                    });
                },
                115                                     // 'S' as 'Stop'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            stopButton.parentNode.removeChild(stopButton);
        }


        //////////////////////////
        // End of main function //
        //////////////////////////

        // Return the created scene
        return scene;
    };


    ///////////
    // Utils //
    ///////////

    // Create a variable to slow potential framerate display
    var slowPotentialFps = 0;

    // Display potential framerate
    var displayPotentialFps = function()
    {
        // Compute potential framerate
        var potentialFps = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0);

        // To slow display, display only every 50 incrementations of slowPotentialFps
        if (slowPotentialFps === 0)
        {
            potentialFpsLabel.innerHTML = potentialFps + " fps";
        }
        else
        {
            // Exceptionally, display potential framerate if it's under 100
            if (potentialFps < 100)
            {
                potentialFpsLabel.innerHTML = potentialFps + " fps";
            }
        }

        // Increment the slow variable
        slowPotentialFps++;

        // Reinitialize the slow variable every 50 incrementations
        if (slowPotentialFps > 50)
        {
            slowPotentialFps = 0;
        }
    };


    ///////////////////////////////////////////
    // Finally call main functions to render //
    ///////////////////////////////////////////

    // Call the main function to create scene
    var scene = createScene();

    // Render loop
    engine.runRenderLoop(function()
    {
        // Render scene
        scene.render();

        // Display framerate
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

        // Display potential framerate
        displayPotentialFps();
    });


    ////////////
    // Events //
    ////////////

    // Resize engine on canvas resize
    window.addEventListener('resize', function()
    {
        engine.resize();
        resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
    });
};













// PBR ?

Babylon.run11 = function(animation, effect, rtt, expansion, debug, stop)
{

    ////////////////////////////////////////////////////////
    // Babylon engine and global variables initialization //
    ////////////////////////////////////////////////////////

    // Get the canvas element
    var canvas = document.getElementById('renderCanvas');

    // Antialiasing is useless with post processing effects, turn it off.
    var antialiasing = false;
    // Feel free to fill the options object to modify the context
    var options = {
        antialias: antialiasing,                            // Also in the constructor parameters
        preserveDrawingBuffer: false,                       // Didn't look what it does
        limitDeviceRatio: window.devicePixelRatio || 1.0    // Used to set the device ratio if adaptToDeviceRatio is turned on
    };
    // Adapting to device ratio is energy-intensive, turn it off.
    var adaptToDeviceRatio = false;
    // Bind the canvas element to the Babylon engine.
    var engine = new BABYLON.Engine(canvas, antialiasing, options, adaptToDeviceRatio);

    // Get an HTML element to display framerate
    var fpsLabel = document.getElementById('fpsLabel');
    // Get an HTML element to display potential framerate
    var potentialFpsLabel = document.getElementById('potentialFpsLabel');
    // Get an HTML element to display current device resolution
    var resolutionLabel = document.getElementById('resolutionLabel');
    // Initialize the device resolution
    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();


    ///////////////////
    // Main function //
    ///////////////////

    var createScene = function()
    {

        ////////////////////
        // Scene & Camera //
        ////////////////////

        // Create a basic Babylon Scene object
        var scene = new BABYLON.Scene(engine);

        // Create an ArcRotateCamera, and set its position to (a:3PI/2, b:PI/3, r:15)
        var camera = new BABYLON.ArcRotateCamera(
            'defaultCamera',
            3*Math.PI/2,                    // Alpha position
            Math.PI/3,                      // Beta position
            15,                             // Distance from the target
            new BABYLON.Vector3(0, 0, 0),   // Target
            scene                           // Bind the camera to the scene
        );
        // Increase pinch precision, default zoom is too fast
        camera.pinchPrecision = 20;
        // Attach the camera to the canvas element
        camera.attachControl(canvas, true);


        ////////////
        // Lights //
        ////////////

        // Create a basic hemispheric light, aiming aiming the sky
        var hemisphericLight = new BABYLON.HemisphericLight(
            'defaultHemisphericLight',
            new BABYLON.Vector3(0, 1, 0),   // Target
            scene                           // Bind the light to the scene
        );
        // Create a basic directional light, aiming the vector direction (0, -1, 1)
        var directionalLight = new BABYLON.DirectionalLight(
            'defaultDirectionalLight',
            new BABYLON.Vector3(0, -1, 1),  // Target
            scene                           // Bind the light to the scene
        );
        // Decrease the light intensity, default is too bright
        directionalLight.intensity = 0.2;
        // Create a basic point light, positioned at vector position (0, 15, 0)
        var pointLight = new BABYLON.PointLight(
            'defaultPointLight',
            new BABYLON.Vector3(0, 15, 0),  // Position
            scene                           // Bind the light to the scene
        );


        //////////////
        // Geometry //
        //////////////

        // Create the ground, please consider using MeshBuilder class instead of Mesh
        var ground = new BABYLON.MeshBuilder.CreateGround(
            "ground",
            {
                width: 10.0,
                height: 5.0,
                subdivisions: 1,
                updatable: false    // Set to true if you plan to change vertices after the mesh has been rendered
            },
            scene                   // Bind the ground to the scene
        );

        // Create the walls, please consider using MeshBuilder class instead of Mesh
        var wallLeft = new BABYLON.MeshBuilder.CreatePlane(
            "wallLeft",
            {
                size: 5.0,                                  // Size determines width and height in Mesh class. It's just there to maintain backwards compatibility
                width: 5.0,
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,   // FRONT, BACK or DOUBLE
                updatable: false,                           // True if vertices are supposed to change once created
                sourcePlane: null                           // Plane instance. It builds a mesh plane from a Math plane
            },
            scene
        );
        var wallRight = new BABYLON.MeshBuilder.CreatePlane(
            "wallRight",
            {
                size: 5.0,
                width: 5.0,
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                updatable: false,
                sourcePlane: null
            },
            scene
        );
        var wallCenter = new BABYLON.MeshBuilder.CreatePlane(
            "wallCenter",
            {
                size: 5.0,
                width: 10.0,                                 // wallCenter.scaling.x = 2;
                height: 5.0,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                updatable: false,
                sourcePlane: null
            },
            scene
        );

        // First way to translate a mesh
        wallLeft.position.x = -5;
        wallLeft.position.y = +2.5;
        // Second way to transalte a mesh
        wallLeft.position = new BABYLON.Vector3(-5, 2.5, 0);
        // Third way to translate a mesh
        wallLeft.setPositionWithLocalVector(new BABYLON.Vector3(-5, 2.5, 0));
        // Fourth way to translate a mesh
        wallLeft.locallyTranslate(new BABYLON.Vector3(5, -2.5, 0));
        // Fifth way to translate a mesh
        wallLeft.translate(new BABYLON.Vector3(-5, 2.5, 0), 1, BABYLON.Space.LOCAL);

        // First way to rotate a mesh
        wallLeft.rotation.y = -Math.PI/2;
        // Second way to rotate a mesh
        wallLeft.rotation = new BABYLON.Vector3(0, -2*Math.PI/2, 0);
        // Third way to rotate a mesh
        wallLeft.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);

        // Rotate and translate walls
        wallRight.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
        wallRight.position = new BABYLON.Vector3(5, 2.5, 0);
        wallCenter.position = new BABYLON.Vector3(0, 2.5, 2.5);

        // Merge wall meshes to reduce draw calls
        var wall = new BABYLON.Mesh.MergeMeshes(
            [wallLeft, wallRight, wallCenter],  // Array of meshes to merge, they must be of the same material
            true,                               // Dispose of the source meshes (when false, you get two sets of meshes !)
            true,                               // TOTALLY USELESS after diving into the source code : "When the sum of the vertices > 64k, this must be set to true. Otherwise, it's faster set to false."
            null                                // When set, vertices inserted into this Mesh.  Meshes can then be merged into a Mesh sub-class.
        );

        // Create the cupboard, please consider to use MeshBuilder class instead of Mesh
        var cupboardLeft = new BABYLON.MeshBuilder.CreateBox(
            "cupboardLeft",
            {
                size: 1.0,                                  // When height, width or depth is not defined, size is the default value
                height: 3.0,                                // cupboardLeft.scaling.y = 3;
                width: 2.0,                                 // cupboardLeft.scaling.x = 2;
                depth: 2.0,                                 // cupboardLeft.scaling.z = 2;
                faceColors: null,                           // Array of 6 Color4, one color for each face
                faceUV: null,                               // Array of 6 Vector4, one UV definition for each face
                updatable: false,
                sideOrientation: BABYLON.Mesh.FRONTSIDE
            },
            scene
        );
        var cupboardRightBack = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightBack",
            {
                height: 3.0,                                // cupboardLeft.scaling.y = 3;
                width: 2.0,                                 // cupboardLeft.scaling.x = 2;
                depth: 0.1                                  // cupboardLeft.scaling.z = 0.1;
            },
            scene
        );
        // Clones are new Mesh objects with exactly the same geometry but which can vary on everything else
        var cupboardRightLeft = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightLeft",
            {
                width: 0.1,
                height: 3,
                depth: 1.8
            },
            scene
        );
        var cupboardRightRight = cupboardRightLeft.clone("cupboardRightRight");
        var cupboardRightTop = new BABYLON.MeshBuilder.CreateBox(
            "cupboardRightTop",
            {
                width: 1.8,
                height: 0.1,
                depth: 1.8
            },
            scene
        );
        // Instances can only vary on position, rotation, quaternion, pivotMatrix and scaling properties
        // Instances share geometry and material, so they reduce draw calls
        var cupboardRightBottom = cupboardRightTop.createInstance("cupboardRightBottom");
        var cupboardRightCenterTop = cupboardRightTop.createInstance("cupboardRightCenterTop");
        var cupboardRightCenterBottom = cupboardRightTop.createInstance("cupboardRightCenterBottom");

        // Translate cupboard meshes
        cupboardLeft.position = new BABYLON.Vector3(-1, 1.5, 1.5);
        cupboardRightBack.position = new BABYLON.Vector3(1, 1.5, 2.45);
        cupboardRightLeft.position = new BABYLON.Vector3(0.05, 1.5, 1.5);
        cupboardRightRight.position = new BABYLON.Vector3(1.95, 1.5, 1.5);
        cupboardRightTop.position = new BABYLON.Vector3(1.0, 2.95, 1.5);
        // Merging instances messes with mesh position
        // So position is a translation compared to last instance position
        //cupboardRightBottom.position = new BABYLON.Vector3(1, 0.05, 1.5);
        cupboardRightBottom.position = new BABYLON.Vector3(0, -2.9, 0);
        //cupboardRightCenterTop.position = new BABYLON.Vector3(1, 2.05, 1.5);
        cupboardRightCenterTop.position = new BABYLON.Vector3(0, 2, 0);
        //cupboardRightCenterBottom.position = new BABYLON.Vector3(1, 1.95, 1.5);
        cupboardRightCenterBottom.position = new BABYLON.Vector3(0, -0.1, 0);

        // Merge cupboard meshes to reduce draw calls
        // Instances seems to not have any interest when merging them
        var cupboard = BABYLON.Mesh.MergeMeshes(
            [
                cupboardLeft,
                cupboardRightBack,
                cupboardRightLeft,
                cupboardRightRight,
                cupboardRightTop,
                cupboardRightBottom,
                cupboardRightCenterTop,
                cupboardRightCenterBottom
            ],
            true,                               // Dispose of source meshes
            true                                // Useless, but you avoid an useless boucle by setting to true
        );

        // Create the animated door mesh, please consider using MeshBuilder class instead of Mesh
        var cupboardDoor = new BABYLON.MeshBuilder.CreateBox(
            "cupboardDoor",
            {
                width: 2,
                height: 2,
                depth: 0.1
            },
            scene
        );

        // Translate the door
        cupboardDoor.position = new BABYLON.Vector3(1, 1, 0.55);


        /////////////////
        // CUSTOM PART //
        /////////////////


        var testPBRMaterial = new BABYLON.TestMaterial("testPBRMaterial", scene, {});
        testPBRMaterial.albedoTexture = new BABYLON.Texture("resources/textures/amiga.jpg", scene);
        cupboard.material = testPBRMaterial;

        var customPBRMaterial = new BABYLON.CustomPBRMaterial(
            "customPBRMaterial",
            scene,
            {
                albedoColor: new BABYLON.Vector3(0.2, 0.8, 0.2),
                albedoTexture: new BABYLON.Texture("resources/textures/amiga.jpg", scene),
                //specularColor: new BABYLON.Vector3(1.0, 1.0, 1.0)
            }
        );
        cupboard.material = customPBRMaterial;
        //customPBRMaterial.albedoTexture = new BABYLON.Texture("resources/textures/amiga.jpg", scene);


        //test.diffuseTexture = new BABYLON.Texture("./resources/textures/amiga.jpg", scene);
        /*var contreexemple = new BABYLON.ShaderMaterial(
            "contreexemple",
            scene,
            "./shaders/customPBR",
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "viewProjection"]
            }
        );
        contreexemple.setVector3("albedoColor", new BABYLON.Vector3(0.8, 0.2, 0.6));
        contreexemple.setTexture("albedoTexture", new BABYLON.Texture("resources/textures/amiga.jpg", scene));
        cupboard.material = contreexemple;*/

        /*var contreexemple2 = new BABYLON.StandardMaterial("contreexemple2", scene);
        contreexemple2.diffuseTexture = new BABYLON.Texture("resources/textures/amiga.jpg", scene);
        cupboard.material = contreexemple2;*/

        /////////
        // END //
        /////////


        ////////////////////
        // Door animation //
        ////////////////////

        // Get the HTML element to handle door animation
        var animationButton = document.getElementById('animateButton');

        // Create or remove the animation handling
        if (animation)
        {
            // Create door rotation animation
            var doorRotationAnimation = new BABYLON.Animation(
                "doorRotationAnimation",
                "rotation.y",                                   // Property to animate
                60,                                             // Framerate requested, highest FPS possible in the animation
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,          // Type of change
                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,   // Loop mode
                false                                           // Enable or disable blending (not in the docs, it does shit when enabled)
            );
            // Create door translation animation
            var doorTranslationAnimation = new BABYLON.Animation(
                "doorTranslationAnimation",
                "position",
                60,
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
            );
            // Create animation keys
            var rotationKeys = [];
            var translationKeys = [];
            // Create source and target vectors outside the keys to avoid creating new oject each frame
            var rotationTarget = -Math.PI/2;
            var translationSource = new BABYLON.Vector3(1, 1, 0.55);
            var translationTarget = new BABYLON.Vector3(1.95, 1, -0.4);
            // Populate animation keys
            rotationKeys.push({
                frame: 0,
                value: 0
            });
            rotationKeys.push({
                frame: 30,
                value: rotationTarget
            });
            rotationKeys.push({
                frame: 60,
                value: 0
            });
            translationKeys.push({
                frame: 0,
                value: translationSource
            });
            translationKeys.push({
                frame: 30,
                value: translationTarget
            });
            translationKeys.push({
                frame: 60,
                value: translationSource
            });
            // Set animation keys to their respective animation
            doorRotationAnimation.setKeys(rotationKeys);
            doorTranslationAnimation.setKeys(translationKeys);
            // Add animations to the door mesh
            cupboardDoor.animations.push(doorRotationAnimation);
            cupboardDoor.animations.push(doorTranslationAnimation);

            // Keep track of animation
            var doorRotated = false;
            var animationIsRunning = false;

            // Open or close the door
            var toggleDoor = function()
            {
                // Don't do anything if last animation is still running
                if (!animationIsRunning)
                {
                    // Declare that a new animation is running
                    animationIsRunning = true;

                    // Check if door is opened or closed
                    if (doorRotated)
                    {
                        // Close door
                        scene.beginAnimation(
                            cupboardDoor,                   // The mesh to animate
                            30,                             // The starting frame
                            60,                             // The ending frame
                            false,                          // Depends on animation loop mode, enable or disable looping
                            1,                              // Speed ratio of the animation, default is 1
                            function() {                    // Callback on animation end
                                // Declare that the animation is finished
                                animationIsRunning = false;
                            }
                        );
                    }
                    else
                    {
                        // Open door
                        scene.beginAnimation(
                            cupboardDoor,
                            0,
                            30,
                            false,
                            1,
                            function() {
                                // Declare that the animation is finished
                                animationIsRunning = false;
                            }
                        );
                    }

                    // Change the state of the door (closed/opened)
                    doorRotated = !doorRotated;
                }
            };

            // Handle animation on keypress
            window.addEventListener('keypress', function(key)
            {
                if (key.which === 97) // 'A' as 'Animation'
                {
                    toggleDoor();
                }
            });
            // Handle animation on button click
            document.getElementById('animateButton').addEventListener('click', function() {
                toggleDoor();
            });
        }
        else
        {
            // Remove the HTML element from the DOM
            animationButton.parentNode.removeChild(animationButton);
        }


        /////////////////////////////
        // Generic toggle function //
        /////////////////////////////

        var toggleFunction = function(elem, enable, ifStatement, elseStatement, key)
        {
            //Keep track of the process state;
            var isEnabled = !enable;

            // Generic toggle function
            var toggle = function()
            {
                if (isEnabled)
                {
                    // Custom statement if the process is turned off
                    ifStatement();
                }
                else
                {
                    // Custom statement if the process is turned on
                    elseStatement();
                }
                // Toggle the process state
                if (toggle)
                {
                    isEnabled = !isEnabled;
                }
            };

            // Init process state
            toggle();

            // Handle process on keypress event
            window.addEventListener('keypress', function(k)
            {
                if (k.which === key)
                {
                    toggle();
                }
            });
            // Handle process on button click event
            elem.addEventListener('click', function() {
                toggle();
            });

        };


        /////////////////
        // Blur effect //
        /////////////////

        // Get the HTML element to handle blur effect
        var effectButton = document.getElementById('effectButton');

        // Create or remove the blur effect handling
        if (effect)
        {
            // First, create a pipeline to handle PP effects
            var standardPipeline = new BABYLON.PostProcessRenderPipeline(engine, "standardPipeline");

            // Create the blur PP effect
            var horizontalBlur = new BABYLON.PostProcessRenderEffect(
                engine,                                 // Bind the effect to the Babylon engine
                "horizontalBlurEffect",
                function() {
                    return new BABYLON.BlurPostProcess(
                        "hb",
                        new BABYLON.Vector2(1.0, 0),    // Direction
                        3.0,                            // Blur width
                        1.0,                            // Options
                        null,                           // Camera
                        null,                           // Sampling mode, default is BABYLON.Texture.BILINEAR_SAMPLINGMODE
                        engine,                         // Babylon engine
                        true                            // Reusable, diving into the source code, seems to be useless
                    )
                }
            );

            // Add the PP effect to the pipeline
            standardPipeline.addEffect(horizontalBlur);

            // Add the pipeline to a global pipeline manager
            scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);

            // Bind the default camera to the pipeline
            scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera);


            // Call the generic toggle function with custom attributes
            toggleFunction(
                effectButton,
                false,
                function() {
                    scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
                },
                function() {
                    scene.postProcessRenderPipelineManager.enableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera);
                },
                101     // 'E' as 'Effect'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            effectButton.parentNode.removeChild(effectButton);
        }


        ///////////////////////////
        // Render target texture //
        ///////////////////////////

        // Get the HTML element to handle render target texture
        var renderTargetButton = document.getElementById('renderTargetButton');

        // Create or remove the render target texture handling
        if (rtt)
        {
            // First, create a render target texture
            var renderTexture = new BABYLON.RenderTargetTexture(
                'renderTexture',
                512,                                    // Size of the texture
                scene,                                  // Bind the texture to the scene
                false,                                  // Set true if you want to generate mipmaps
                true,                                   // Update TransformMatrix every frame when set to false. Default is true. It does shit (deformation of the original scene) when enabled.
                BABYLON.Engine.TEXTURETYPE_UNSIGNED_INT,// Texture type. Default is BABYLON.Engine.TEXTURETYPE_UNSIGNED_INT
                false,                                  // True if it's a cubic texture. Default is false
                BABYLON.Texture.TRILINEAR_SAMPLINGMODE  // Filtering method. Default is BABYLON.Texture.TRILINEAR_SAMPLINGMODE
            );

            // Populate render list
            renderTexture.renderList.push(cupboard);
            renderTexture.renderList.push(cupboardDoor);

            // Create a plane to apply the texture
            var renderTargetPlane = new BABYLON.MeshBuilder.CreatePlane(
                'renderTargetPlane',
                {
                    width: 10.0,
                    height: 5.0
                },
                scene
            );
            renderTargetPlane.position = new BABYLON.Vector3(0, -2.5, -2.5);

            // Create a material to use the texture
            var renderTargetMaterial = new BABYLON.StandardMaterial(
                'renderTargetMaterial',
                scene,                      // Bind the material to the scene
                false                       // If true, add the material to the scene materials array
            );

            // Bind the material to the plane
            renderTargetPlane.material = renderTargetMaterial;
            renderTargetPlane.material.diffuseTexture = renderTexture;

            // Finally add the texture to the scene custom render targets
            scene.customRenderTargets.push(renderTexture);

            // Call the generic toggle function with custom attributes
            toggleFunction(
                renderTargetButton,                     // HTML element
                false,                                  // Turns the process off at application launch
                function() {
                    renderTargetPlane.setEnabled(0);    // Disable render target texture
                },
                function() {
                    renderTargetPlane.setEnabled(1);    // Enable render target texture
                },
                114                                     // 'R' as 'Render Target Texture'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            renderTargetButton.parentNode.removeChild(renderTargetButton);
        }


        //////////////////////
        // Canvas expansion //
        //////////////////////

        // Get the HTML element to handle expansion
        var expandButton = document.getElementById('expandButton');

        // Create or remove the expansion handling
        if (expansion)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                expandButton,
                true,
                function() {
                    canvas.style.width = "50%";     // Contract the canvas element
                    engine.resize();
                    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
                },
                function() {
                    canvas.style.width = "100%";    // Expand the canvas element
                    engine.resize();
                    resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
                },
                99                                  // 'C' as 'Canvas expansion'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            expandButton.parentNode.removeChild(expandButton);
        }


        /////////////////
        // Debug layer //
        /////////////////

        // Get the HTML element to handle debug layer display
        var debugButton = document.getElementById('debugButton');

        if (debug)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                debugButton,
                true,
                function() {
                    scene.debugLayer.hide();        // Hide the debug layer
                },
                function() {
                    scene.debugLayer.show();        // Show the debug layer
                    document.getElementById('DebugLayer').style.zIndex = 100;
                },
                100                                 // 'D' as 'Debug'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            debugButton.parentNode.removeChild(debugButton);
        }


        ////////////////////
        // Stop rendering //
        ////////////////////

        // Get the HTML element to handle render loop
        var stopButton = document.getElementById('stopBabylonButton');

        // Create or remove the render loop handling
        if (stop)
        {
            // Call the generic toggle function with custom attributes
            toggleFunction(
                stopButton,
                false,
                function() {
                    engine.stopRenderLoop();            // Stop render loop
                },
                function() {
                    engine.runRenderLoop(function(){    // Start render loop
                        scene.render();
                        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
                        slowPotentialFps();
                    });
                },
                115                                     // 'S' as 'Stop'
            );
        }
        else
        {
            // Remove the HTML element from the DOM
            stopButton.parentNode.removeChild(stopButton);
        }


        //////////////////////////
        // End of main function //
        //////////////////////////

        // Return the created scene
        return scene;
    };


    ///////////
    // Utils //
    ///////////

    // Create a variable to slow potential framerate display
    var slowPotentialFps = 0;

    // Display potential framerate
    var displayPotentialFps = function()
    {
        // Compute potential framerate
        var potentialFps = BABYLON.Tools.Format(1000.0 / scene.getLastFrameDuration(), 0);

        // To slow display, display only every 50 incrementations of slowPotentialFps
        if (slowPotentialFps === 0)
        {
            potentialFpsLabel.innerHTML = potentialFps + " fps";
        }
        else
        {
            // Exceptionally, display potential framerate if it's under 100
            if (potentialFps < 100)
            {
                potentialFpsLabel.innerHTML = potentialFps + " fps";
            }
        }

        // Increment the slow variable
        slowPotentialFps++;

        // Reinitialize the slow variable every 50 incrementations
        if (slowPotentialFps > 50)
        {
            slowPotentialFps = 0;
        }
    };


    ///////////////////////////////////////////
    // Finally call main functions to render //
    ///////////////////////////////////////////

    // Call the main function to create scene
    var scene = createScene();

    // Render loop
    engine.runRenderLoop(function()
    {
        // Render scene
        scene.render();

        // Display framerate
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";

        // Display potential framerate
        displayPotentialFps();
    });


    ////////////
    // Events //
    ////////////

    // Resize engine on canvas resize
    window.addEventListener('resize', function()
    {
        engine.resize();
        resolutionLabel.innerHTML = engine.getRenderWidth() + "x" + engine.getRenderHeight();
    });
};