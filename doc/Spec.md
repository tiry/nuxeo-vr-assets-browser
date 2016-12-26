
## What to show in VR ?

### VR Assets browser --current choice--

Concept: Browse Nuxeo assets via Tag and 3D rendering

What it could look like: 3D VR Content View

   - preload repository with Images and 3D assets
        - tag with google vision
   - left part of the screen display the available tags or aggregates
   - right part previews the current asset in the result list
       - render images on a rectangle
       - 3d rendering for cad objects    
   - navigation control for prev/next

Added value of the VR visualization

   - navigation through tags/facets via head + click or daydream remote
   - 3D visualisation of assets
   - zoom in/out
   - show off

### Plaform Explorer in VR

Concept: explore extension points of the platform like [platform-explorer](http://explorer.nuxeo.com/) but in 3D/VR      

What it could look like:

  - it was already complex in flat web rendering ...

Added value of the VR visualization:

  - close to none ?

### Content Tree navigation

Concept: Browse Nuxeo Hierarchy using a 3D rendering

What it could look like:

   - Folder is a room with meta-data written on the floor
   - sub folders are doors
   - documents are frames on the walls

Added value of the VR visualization

   - get sick and puke on my documents
   - display more than one hierachy at a time ?

## Techno choice

### About Unity

 - Seems to be mainly powered by some C#/Mono scripting
   - JavaScript seems to be supported, but not sure everything is available
 - Unity is more a game engine than a framework
   - I want this to be more about coding than using a software

### Simple VRML ?

  - [d3.js](https://d3js.org/) 
       - can be used to integrate nice 2d in VR
       - can even be used for [some real VR](http://almossawi.com/aframe-d3-visualization/demo/)
  - [p5.js](https://p5js.org)
       - because I started playing with this for kids, but VR support sucks

### WebVR

 - VRML + [three.js](https://threejs.org/) + [A-Frame](https://aframe.io/) 
     - seems cool and works with Cardboard (not sure about Daydream)
 - native support in [Chrome 56 on Android](https://blog.chromium.org/2016/12/introducing-webvr-api-in-chrome-for.html)


A-Frame seems to be a good choice to start with:

 - seems to work at least for simple stuffs (Chrome 56 on Android 7.1.1)
     - do not need a full game engine for now
 - based on Html dom and JS
     - can use nuxeo.js and probably even nuxeo-elements
 - can load collada files
     - Nuxeo can store them and process them


## Resources

 - https://vr.chromeexperiments.com/











  
