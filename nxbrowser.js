

function initBrowser() {

    var provider = new NuxeoProvider();
    provider.fetch();

    var browser = document.querySelector("#nxbrowser");
    var displayPannel = new DisplayPannel(provider);

    displayPannel.build();
    displayPannel.update();

    document.getElementById("btnUp").addEventListener("click", function() {
        displayPannel.moveUp()
    });
    document.getElementById("btnDown").addEventListener("click", function() {
        displayPannel.moveDown()
    });

}