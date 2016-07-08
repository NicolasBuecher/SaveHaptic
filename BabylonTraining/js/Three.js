/**
 * Created by Nicolas Buecher on 13/06/2016.
 */

var Three = Three || {};

Three.run = function()
{

    // Declare standard global variables
    var camera;
    var controls;
    var scene;
    var renderer;
    var clock;
    var stats;

    // Declare custom global variables


    // Initialize the scene
    init();


    function init()
    {
        // Initialize the clock
        clock = new THREE.Clock();


        // Initialize camera and scene
        camera = new THREE.PerspectiveCamera(45, (window.innerWidth/2) / (window.innerHeight), 0.01, 200);
        camera.position.set(0, 10, 10);
        scene = new THREE.Scene();


        // Create and start the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth/2, window.innerHeight);
        var container = document.getElementById('container');
        container.appendChild(renderer.domElement);


        // Add events
        window.addEventListener('resize', onWindowResize, false);


        // Initialize the controls
        controls = new THREE.TrackballControls(camera, container);

        // Finally add the performance monitor
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0 ';
        stats.domElement.style.zIndex = 100;
        container.appendChild( stats.domElement );
    }

    // Initialize a basic ambient light
    scene.add(new THREE.AmbientLight(0x555555));
    // Initialize a basic directional light
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.x = 0;
    directionalLight.position.y = 10;
    directionalLight.position.z = 10;
    directionalLight.position.normalize();
    scene.add(directionalLight);
    // Initialize a basic hemispheric light
    var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    scene.add(hemisphereLight);


    /////////////////
    // CUSTOM PART //
    /////////////////


    // Create geometry
    var ground = new THREE.PlaneGeometry(10, 5);
    var wallLeft = new THREE.PlaneGeometry(5, 5);
    var wallRight = new THREE.PlaneGeometry(5, 5);
    var wallCenter = new THREE.PlaneGeometry(10, 5);
    var cupboardLeft = new THREE.BoxGeometry(2, 3, 2);
    var cupboardRightBack = new THREE.BoxGeometry(2, 3, 0.1);
    var cupboardRightTop = new THREE.BoxGeometry(1.8, 0.1, 1.8);
    var cupboardRightBottom = new THREE.BoxGeometry(1.8, 0.1, 1.8);
    var cupboardRightLeft = new THREE.BoxGeometry(0.1, 3, 1.8);
    var cupboardRightRight = new THREE.BoxGeometry(0.1, 3, 1.8);
    var cupboardRightCenterTop = new THREE.BoxGeometry(1.8, 0.1, 1.8);
    var cupboardRightCenterBottom = new THREE.BoxGeometry(1.8, 0.1, 1.8);
    var cupboardDrawerLeft = new THREE.BoxGeometry(0.1, 0.8, 1.8);
    var cupboardDrawerRight = new THREE.BoxGeometry(0.1, 0.8, 1.8);
    var cupboardDrawerBottom = new THREE.BoxGeometry(1.6, 0.1, 1.8);
    var cupboardDrawerBack = new THREE.BoxGeometry(1.8, 0.8, 0.1);
    var cupboardDrawerFront = new THREE.BoxGeometry(2, 1, 0.1);
    var cupboardDoor = new THREE.BoxGeometry(2, 2, 0.1);
    // Create basic material
    var material = new THREE.MeshPhongMaterial({color: 0x999999});
    // Create meshes from geometry
    var mesh = new THREE.Mesh(ground, material);
    scene.add(mesh);
    mesh.rotateX(-Math.PI/2);
    mesh = new THREE.Mesh(wallLeft, material);
    scene.add(mesh);
    mesh.rotateY(Math.PI/2);
    mesh.translateZ(-5);
    mesh.translateY(2.5);
    mesh = new THREE.Mesh(wallRight, material);
    scene.add(mesh);
    mesh.rotateY(-Math.PI/2);
    mesh.translateZ(-5);
    mesh.translateY(2.5);
    mesh = new THREE.Mesh(wallCenter, material);
    scene.add(mesh);
    mesh.translateY(2.5);
    mesh.translateZ(-2.5);
    mesh = new THREE.Mesh(cupboardLeft, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(1.5);
    mesh.translateX(-1);
    mesh = new THREE.Mesh(cupboardRightBack, material);
    scene.add(mesh);
    mesh.translateZ(-2.45);
    mesh.translateY(1.5);
    mesh.translateX(1);
    mesh = new THREE.Mesh(cupboardRightTop, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(2.95);
    mesh.translateX(1);
    mesh = new THREE.Mesh(cupboardRightBottom, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(0.05);
    mesh.translateX(1);
    mesh = new THREE.Mesh(cupboardRightLeft, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(1.5);
    mesh.translateX(0.05);
    mesh = new THREE.Mesh(cupboardRightRight, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(1.5);
    mesh.translateX(1.95);
    mesh = new THREE.Mesh(cupboardRightCenterTop, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(2.05);
    mesh.translateX(1);
    mesh = new THREE.Mesh(cupboardRightCenterBottom, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(1.95);
    mesh.translateX(1);
    /*
    mesh = new THREE.Mesh(cupboardDrawerLeft, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(2.5);
    mesh.translateX(0.15);

    mesh = new THREE.Mesh(cupboardDrawerRight, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(2.5);
    mesh.translateX(1.85);

    mesh = new THREE.Mesh(cupboardDrawerBottom, material);
    scene.add(mesh);
    mesh.translateZ(-1.5);
    mesh.translateY(2.15);
    mesh.translateX(1);

    mesh = new THREE.Mesh(cupboardDrawerBack, material);
    scene.add(mesh);
    mesh.translateZ(-2.35);
    mesh.translateY(2.5);
    mesh.translateX(1);

    mesh = new THREE.Mesh(cupboardDrawerFront, material);
    scene.add(mesh);
    mesh.translateZ(-0.55);
    mesh.translateY(2.5);
    mesh.translateX(1);*/
    var door = new THREE.Mesh(cupboardDoor, material);
    scene.add(door);
    door.translateZ(-0.55);
    door.translateY(1);
    door.translateX(1);
    /*var drawer = new THREE.Geometry();
    drawer.merge(cupboardDrawerBack);
    drawer.merge(cupboardDrawerFront);
    drawer.merge(cupboardDrawerBottom);
    drawer.merge(cupboardDrawerLeft);
    drawer.merge(cupboardDrawerRight);*/
    //mesh = new THREE.Mesh(drawer, material);
    //scene.add(mesh);

    // Create door rotation animation
    var doorAnimation1 = new TWEEN.Tween(door.rotation)
        .to({ y: "-" + Math.PI/2 }, 1000)   // relative animation
        .delay(0)                           // no delay
        .onUpdate(function(){})             // nothing special on update
        .onComplete(function() {            // function called at the end of the animation
            // Declare that the animation is finished
            animationIsRunning = false;
        });
    // Create door position animation
    var doorAnimation2 = new TWEEN.Tween(door.position)
        .to({ x: "-" + 0.95, z: "-" + 0.95 }, 1000)
        .onComplete(function() {
            animationIsRunning = false;
        });
    // Create door rotation reverse animation
    var doorAnimation3 = new TWEEN.Tween(door.rotation)
        .to({ y: "+" + Math.PI/2 }, 1000)
        .onComplete(function () {
            animationIsRunning = false;
        });
    // Create door position reverse animation
    var doorAnimation4 = new TWEEN.Tween(door.position)
        .to({ x: "+" + 0.95, z: "+" + 0.95 }, 1000)
        .onComplete(function () {
            animationIsRunning = false;
        });

    // Keep track of animation
    var doorRotated = false;
    var animationIsRunning = false;

    // Open or close the door
    var toggleDoor = function()
    {
        // Don't do anything of last animation is still running
        if (!animationIsRunning)
        {
            // Declare that a new animation is running
            animationIsRunning = true;
            // Check if door is opened or closed
            if (doorRotated)
            {
                // Close door
                doorAnimation1.start();
                doorAnimation2.start();
            }
            else
            {
                // Open door
                doorAnimation3.start();
                doorAnimation4.start();
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
    // Create passes
    var renderPass = new THREE.RenderPass(scene, camera);
    //var effectFilm = new THREE.FilmPass(0.8, 0.325, 256, false);
    //effectFilm.renderToScreen = true;
    var effectBlur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
    effectBlur.renderToScreen = true;
    // Create composer and add passes
    var composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(effectBlur);


    // Enable post processing effect in the render loop
    var effectEnabled = true;
    // Handle effect enabling on keypress
    window.addEventListener('keypress', function(key)
    {
        if (key.which === 101)
        {
            effectEnabled = !effectEnabled;
        }
    });
    // Handle effect enabling on button click
    document.getElementById('effectButton').addEventListener('click', function() {
        effectEnabled = !effectEnabled;
    });


    /////////
    // END //
    /////////


    // Keep track of render state
    var requestId = undefined;
    var isRendering = true;
    // Enable or disable render loop
    var toggleRender = function()
    {
        if (isRendering)
        {
            if (requestId)
            {
                cancelAnimationFrame(requestId);
                requestId = undefined;
            }
        }
        else
        {
            if (!requestId)
            {
                animate();
            }
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
    document.getElementById('stopThreeButton').addEventListener('click', function() {
        toggleRender();
    });


    // Finally animate the scene
    animate();


    // Resize the renderer on window resize
    function onWindowResize(event)
    {
        renderer.setSize(window.innerWidth/2, window.innerHeight);
        camera.aspect = (window.innerWidth/2) / (window.innerHeight);
        camera.updateProjectionMatrix();
    }


    // Function that's called each frame to render
    function animate()
    {
        requestId = requestAnimationFrame(animate);
        render();
        update();
    }


    // Update the controls and anything else you want to update in runtime
    function update()
    {
        // Move
        controls.update();

        // Update fps
        stats.update();

        // Call onUpdate function from animations
        TWEEN.update();
    }


    // Render the current state of the scene through the current camera
    function render()
    {
        // Get time
        var delta = clock.getDelta();

        if (effectEnabled)
        {
            composer.render(delta);
        }
        else
        {
            renderer.render(scene, camera);
        }
    }

};



Three.run2 = function()
{
    // Declare standard global variables
    var camera;
    var controls;
    var scene;
    var bufferScene;
    var renderer;
    var clock;
    var stats;

    // Declare custom global variables


    // Initialize the scene
    init();


    function init()
    {
        // Initialize the clock
        clock = new THREE.Clock();


        // Initialize camera and scene
        camera = new THREE.PerspectiveCamera(45, (window.innerWidth/2) / (window.innerHeight), 0.01, 200);
        camera.position.set(0, 10, 10);
        scene = new THREE.Scene();


        // Create and start the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth/2, window.innerHeight);
        var container = document.getElementById('container');
        container.appendChild(renderer.domElement);


        // Add events
        window.addEventListener('resize', onWindowResize, false);


        // Initialize the controls
        controls = new THREE.TrackballControls(camera, container);

        // Finally add the performance monitor
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0 ';
        stats.domElement.style.zIndex = 100;
        container.appendChild( stats.domElement );
    }

    // Initialize a basic ambient light
    scene.add(new THREE.AmbientLight(0x555555));
    // Initialize a basic directional light
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.x = 0;
    directionalLight.position.y = 10;
    directionalLight.position.z = 10;
    directionalLight.position.normalize();
    scene.add(directionalLight);
    // Initialize a basic hemispheric light
    var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    scene.add(hemisphereLight);


    /////////////////
    // CUSTOM PART //
    /////////////////

    bufferScene = new THREE.Scene();
    bufferScene.add(new THREE.AmbientLight(0x555555));
    bufferScene.add(directionalLight.clone());
    bufferScene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.0));

    var rtTexture = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        {   minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBFormat
        }
    );

    var material = new THREE.MeshBasicMaterial({color: 0xff0000 });
    var jMax = 10;
    var iMax = 10;
    for (var j = 0; j < jMax; j++) {
        for (var i = 0; i < iMax; i++) {
            var box = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            var mesh = new THREE.Mesh(box, material);
            mesh.position.set(-(iMax*0.25/2) + i * 0.25, 3, -(jMax*0.25/2) + j * 0.25);
            bufferScene.add(mesh);
            scene.add(mesh.clone());
        }
    }



    var planeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var plane = new THREE.PlaneGeometry(10.0, 10.0, 1, 1);
    var planeMesh = new THREE.Mesh(plane, planeMaterial);
    scene.add(planeMesh);
    planeMesh.rotateX(-Math.PI/2);
    planeMesh.position.set(0, -2, 0);

    var planeMaterial2 = new THREE.MeshBasicMaterial({map: rtTexture});
    var plane2 = new THREE.PlaneGeometry(9.0, 9.0, 1, 1);
    var planeMesh2 = new THREE.Mesh(plane2, planeMaterial2);
    scene.add(planeMesh2);
    planeMesh2.rotateX(-Math.PI/2);
    planeMesh2.position.set(0, -1, 0);

    //planeMesh.material.map = rtTexture;
    //planeMesh.material.depthWrite = false;;

    /////////
    // END //
    /////////


    // Keep track of render state
    var requestId = undefined;
    var isRendering = true;
    // Enable or disable render loop
    var toggleRender = function()
    {
        if (isRendering)
        {
            if (requestId)
            {
                cancelAnimationFrame(requestId);
                requestId = undefined;
            }
        }
        else
        {
            if (!requestId)
            {
                animate();
            }
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
    document.getElementById('stopThreeButton').addEventListener('click', function() {
        toggleRender();
    });


    // Finally animate the scene
    animate();


    // Resize the renderer on window resize
    function onWindowResize(event)
    {
        renderer.setSize(window.innerWidth/2, window.innerHeight);
        camera.aspect = (window.innerWidth/2) / (window.innerHeight);
        camera.updateProjectionMatrix();
    }


    // Function that's called each frame to render
    function animate()
    {
        requestId = requestAnimationFrame(animate);
        render();
        update();
    }


    // Update the controls and anything else you want to update in runtime
    function update()
    {
        // Move
        controls.update();

        // Update fps
        stats.update();

        // Call onUpdate function from animations
        //TWEEN.update();
    }


    // Render the current state of the scene through the current camera
    function render()
    {
        // Get time
        var delta = clock.getDelta();

        renderer.render( bufferScene, camera, rtTexture );

        renderer.render( scene, camera);
    }
};

