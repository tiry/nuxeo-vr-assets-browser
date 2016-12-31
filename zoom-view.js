function ZoomView() {
    

    this.setup = function(viewPanel, asset) {

        var zoom = document.querySelector('#' + "zoom_" + asset.id);
        if (zoom) {
           console.log("already there ! -- exit");
           return;
        }

        this.asset=asset;

        var zoomTemplate = document.querySelector('#zoomViewTemplate');
        zoom = zoomTemplate.cloneNode(true);

        var aniUp = asset.querySelector('a-animation[begin="moveUp"]')
        var from = aniUp.getAttribute("from");
        var to = aniUp.getAttribute("to");
        zoom.setAttribute("position", from);
        zoom.id = "zoom_" + asset.id;
        zoom.querySelector('a-animation[begin="show"][attribute="position"]').setAttribute("from", from);        
        
        viewPanel.appendChild(zoom);
        zoom.querySelector('a-cylinder').id="close_zoom_" + asset.id;

        zoom.querySelector('a-cylinder').addEventListener("click", function(evt) {
          viewPanel.remove(zoom);
        });
        
        zoom.addEventListener("animationend", function(evt) {
            zoom.querySelector('a-cylinder').setAttribute("material","src:#btnClose; opacity:1");
        });
        zoom.emit("show");
    }

    

}