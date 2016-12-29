
function NuxeoProvider() {

    this._documents = [];

   var servername = window.location.hostname;

    this.nuxeo = new Nuxeo({
      baseURL: 'http://' + servername + ':8080/nuxeo',
          auth: {
            method: 'basic',
            username: 'Administrator',
            password: 'Administrator'
          },
        });

   this.nuxeo.schemas("*");
   this.nuxeo.enricher("document", "preview");
   this.nuxeo.enricher("document", "thumbnail");
    
   this.init = function (continueCB) {
       var me = this;
       this.nuxeo.login().then(function(user) 
       {
            console.log("You are logged in!");
            var uniqueDeviceId = 'id' + (new Date()).getTime();
            me.nuxeo.requestAuthenticationToken('nuxeo-vr', uniqueDeviceId, 'Browse Assets in VR', 'r')
             .then(function(token) {
                me.token=token;
                continueCB();
            });
       }).catch(function(error) {
            console.log("You either supplied a wrong login / password,");
            console.log("a wrong URL to connect to,");
            console.log("Or you need to review your CORS configuration");
            console.log("See https://doc.nuxeo.com/x/vIvZ for the latter");
            alert("Authentication failed, check the console log for further details.");
            throw error;
        });        
    }    

    this.documents = function() {

        return this._documents;
    }

    this.aggregates = function() {

    }

    this.setCB = function(cb) {
        this.cb=cb;
    }

    this.fetch = function(params) {

       this._documents = [];
       var me = this;

       this.nuxeo.request("query/default_search").queryParams({pageSize:100}).get()
        .then(function(res) {
            var docs=[];
            for (var i=0; i < res.entries.length; i++) {
                docs.push({
                    thumbnail: res.entries[i].contextParameters.thumbnail.url + "?token=" + me.token,
                    title: res.entries[i].title,
                    uuid: res.entries[i].uuid
                })
            }
            me._documents = docs;
            me._aggregates = res.aggregates;
            console.log("data received! : " + me._documents.length);
            if (me.cb) {
                me.cb();
            }})
        .catch(function(error) 
            {console.log(error)});

    }

}