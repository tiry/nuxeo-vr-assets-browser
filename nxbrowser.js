

var provider;

function initBrowser() {

    var browser = document.querySelector("#nxbrowser");
    
    //provider = new NuxeoProvider("Administrator", "Nuxeo2015","http://dam-vr.cloud.nuxeo.com/nuxeo/");
    provider = new NuxeoProvider("Administrator", "Administrator","http://127.0.0.1:8080/nuxeo");
    
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