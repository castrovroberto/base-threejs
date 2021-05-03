import '../css/main.css'
import { sphereScene } from './sphere-scene.js'


/*
*********************
* LOCOMOTIVE SCROLL *
*********************
*/
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});