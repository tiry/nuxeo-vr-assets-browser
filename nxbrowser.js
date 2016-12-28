var currentRow = 0;
var data;
var dataOffset = 0;

function mkAnim(node, props) {
    var anim = document.createElement("a-animation");
    for (var prop in props) {
        anim.setAttribute(prop, props[prop]);
    }
    node.appendChild(anim);
}

function fetchData() {
    var _data = [];
    var i = 0;
    for (var x = 1; x < 200; x++) {
        var rnd = 50 + Math.floor(Math.random() * 200);
        for (var grad = 100; grad < 250; grad = grad + 30) {
            var color = "#" + ("0" + rnd.toString(16)).slice(-2) + ("0" + grad.toString(16)).slice(-2) + "00";
            if (x % 2 == 0) {
                var color = "#" + ("0" + rnd.toString(16)).slice(-2) + "00" + ("0" + grad.toString(16)).slice(-2);
            }
            _data.push({
                "color": color
            })
        }
    }
    return _data;
}


function DisplayPannel() {

    this.viewPanel = document.querySelector("#viewPanel");
    this.assetTemplate = document.querySelector("#assetTemplate");

    this.maxX = parseInt(this.viewPanel.attributes.width.value);
    this.maxY = parseInt(this.viewPanel.attributes.height.value);

    this.itemToMove = 0;

    this.build = function() {

        for (var j = this.maxY - 1; j >= 0; j--) {
            for (var i = 0; i < this.maxX; i++) {
                var asset = this.assetTemplate.cloneNode(true);
                var assetClass = "viewBlock";


                if (j == this.maxY - 1) {
                    // top margin
                    // never visible on moveUp
                    // should appear on moveDown
                    // should be hidden at rest
                    assetClass = assetClass + " topMargin";
                    mkAnim(asset,{attribute: "material.opacity",
                                              from: "0",
                                              to: "0",
                                              dur: "500",
                                              fill: "backwards",
                                              begin: "moveUpFade"});
                    mkAnim(asset,{attribute: "material.opacity",
                                              from: "0",
                                              to: "100",
                                              dur: "500",
                                              fill: "backwards",
                                              begin: "moveDownFade"});
                } else if (j == this.maxY - 1) {
                    // top visible row
                    // should hide on moveUp
                    // visible on moveDown
                    // should be visible at rest
                    assetClass = assetClass + " topRow";
                    mkAnim(asset,{attribute: "material.opacity",
                                              from: "100",
                                              to: "0",
                                              dur: "500",
                                              fill: "backwards",
                                              begin: "moveUpFade"});
                    mkAnim(asset,{attribute: "material.opacity",
                                              from: "100",
                                              to: "100",
                                              dur: "500",
                                              fill: "backwards",
                                              begin: "moveDownFade"});
                } else if (j == 1){
                    // last visible row
                    // should hide on moveDown
                    // visible on moveUp
                    // should be visible at rest
                    assetClass = assetClass + " bottomRow";
                    mkAnim(asset,{attribute: "material.opacity",
                                              from: "100",
                                              to: "100",
                                              dur: "500",
                                              fill: "backwards",
                                              begin: "moveUpFade"});
                    mkAnim(asset,{attribute: "material.opacity",
                                              from: "100",
                                              to: "0",
                                              dur: "500",
                                              fill: "backwards",
                                              begin: "moveDownFade"});
                } else if (j == 0) {
                    // bottom margin
                    // hidden on moveDown
                    // should appear on moveUp
                    // hidden at rest
                    assetClass = assetClass + " bottomMargin";
                    mkAnim(asset,{attribute: "material.opacity",
                                              from: "0",
                                              to: "100",
                                              dur: "500",
                                              direction: "normal",
                                              fill: "backwards",
                                              begin: "moveUpFade"});
                    mkAnim(asset,{attribute: "material.opacity",
                                              from: "0",
                                              to: "0",
                                              dur: "500",
                                              fill: "forwards",
                                              begin: "moveDownFade"});
                }

                asset.setAttribute("class", assetClass);
                asset.id = "asset_" + i + "-" + j;

                this.viewPanel.appendChild(asset);
            }
        }
        this.viewPanel.remove(this.assetTemplate);
    }


    this.setupPositionAndAnimation = function() {

        var me = this; // yerk !

        for (var j = this.maxY - 1; j >= 0; j--) {
            for (var i = 0; i < this.maxX; i++) {

                var asset = document.getElementById("asset_" + i + "-" + j);
                var position = (-this.maxX / 2 + i) + " " + (0.4 - this.maxY / 2 + (j)) + " 0";
                asset.setAttribute("position", position);

                var aniUp = asset.querySelector('a-animation[begin="moveUp"]')
                aniUp.setAttribute("from", position);
                aniUp.setAttribute("to", (-this.maxX / 2 + i) + " " + (0.4 - this.maxY / 2 + (j + 1)) + " 0");

                var aniDown = asset.querySelector('a-animation[begin="moveDown"]')
                aniDown.setAttribute("from", position);
                aniDown.setAttribute("to", (-this.maxX / 2 + i) + " " + (0.4 - this.maxY / 2 + (j - 1)) + " 0");

                asset.addEventListener("animationend", function(evt) {
                    me.moveEnded(evt)
                });

                this.viewPanel.appendChild(asset);
            }
        }

    }

    this.bindData = function() {
        var docOffset = dataOffset - 5;
        for (var j = this.maxY - 1; j >= 0; j--) {
            for (var i = 0; i < this.maxX; i++) {
                var asset = document.getElementById("asset_" + i + "-" + j);

                if (docOffset >= 0 && docOffset < data.length) {
                    asset.setAttribute("color", data[docOffset].color);
                } else {
                    // off grid values
                    asset.setAttribute("color", "#FFFFFF");
                }
                if (j==0 || j==this.maxY-1) {
                  asset.setAttribute("material",{"opacity":"0"})  
                } else {
                  // this should not be needed
                  asset.setAttribute("material",{"opacity":"100"})
                }
                docOffset++;
            }
        }
    }

    this.render = function() {
        this.setupPositionAndAnimation();
        this.bindData();
    }

    this.moveUp = function() {
        for (var block of document.querySelectorAll(".viewBlock")) {
            this.itemToMove++;
            block.emit("moveUpFade");
            block.emit("moveUp");
        }
    }

    this.moveDown = function() {
        for (var block of document.querySelectorAll(".viewBlock")) {
            this.itemToMove++;
            block.emit("moveDownFade");
            block.emit("moveDown");
        }
    }

    this.moveEnded = function(evt) {
        if (evt.srcElement.attributes.attribute.value == "position") {
            this.itemToMove--;
            if (this.itemToMove == 0) {
                if (evt.srcElement.attributes.begin.value == "moveUp") {
                    dataOffset = dataOffset + 5;             
                }
                if (evt.srcElement.attributes.begin.value == "moveDown") {
                    dataOffset = dataOffset - 5;             
                }
                this.bindData();
                /*var o3D = document.querySelector('viewPanel').object3D;
                var that = this.
                o3D.onBeforeRender = function() {
                    alert("yo!");
                    that.bindData();
                    o3D.onBeforeRender = function(){};
                }*/
            }
        }
    }
}

function initBrowser() {

    data = fetchData();
    var browser = document.querySelector("#nxbrowser");
    var displayPannel = new DisplayPannel();

    displayPannel.build();
    displayPannel.render();

    document.getElementById("btnUp").addEventListener("click", function() {
        displayPannel.moveUp()
    });
    document.getElementById("btnDown").addEventListener("click", function() {
        displayPannel.moveDown()
    });

}