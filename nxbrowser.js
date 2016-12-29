

var provider;

function initBrowser() {

    var browser = document.querySelector("#nxbrowser");
    
    provider = new NuxeoProvider();
    
    var displayPannel = new DisplayPannel(provider);
    displayPannel.build();
    provider.setCB(function(){displayPannel.update();});

    provider.init(function() {
        provider.fetch();
        displayPannel.update();        
    })

    document.getElementById("upArrow").addEventListener("click", function() {
        displayPannel.moveUp()
    });
    document.getElementById("downArrow").addEventListener("click", function() {
        displayPannel.moveDown()
    });

}