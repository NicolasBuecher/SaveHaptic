/**
 * Created by Nicolas Buecher on 13/06/2016.
 */

window.addEventListener('DOMContentLoaded', function() {
    
    var animation = true;
    var effect = false;
    var renderTarget = false;
    var expansion = true;
    var debug = true;
    var stop = false;

    //Three.run();
    //Babylon.run();
    //Three.run2();
    //Babylon.run2();
    //Babylon.run3();
    //Babylon.run4();
    //Babylon.run5();
    //Babylon.run6();
    //Babylon.run7();

    var stopThree = document.getElementById('stopThreeButton');
    stopThree.parentNode.removeChild(stopThree);

    //Babylon.run8(animation, effect, renderTarget, expansion, debug, stop);
    //Babylon.run9(animation, effect, renderTarget, expansion, debug, stop);
    //Babylon.run10(animation, effect, renderTarget, expansion, debug, stop);
    Babylon.run11(animation, effect, renderTarget, expansion, debug, stop);
});