
function NuxeoProvider(username,password,url) {

    this._documents = [];

   if(!url) {
      var servername = window.location.hostname;
      url='http://' + servername + ':8080/nuxeo';
   }
   if (!username) {
      username = 'Administrator';
   }
   if (!password) {
      password = 'Administrator';
   }

    this.nuxeo = new Nuxeo({
      baseURL: url,
          auth: {
            method: 'basic',
            username: username,
            password: password
          },
        });

   this.baseURL = url;
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
                 var d = new Date();
                 //d.setTime(d.getTime() + (24*60*60*1000));
                 //var expires = "expires="+ d.toUTCString();
                 //document.cookie = "X-Authentication-Token=" + token + ";" + expires + ";path=/";
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

       this.nuxeo.request("query/vr_search").queryParams({pageSize:100}).get()
        .then(function(res) {
            var docs=[];
            for (var i=0; i < res.entries.length; i++) {
                var doc = {
                    thumbnail: res.entries[i].contextParameters.thumbnail.url + "?token=" + me.token,
                    title: res.entries[i].title,
                    uid: res.entries[i].uid,
                    type: res.entries[i].type,
                    blob: me.baseURL + '/api/v1/id/' + res.entries[i].uid +'/@blob/file:content' + "?token=" + me.token                    
                };
                if (res.entries[i].type=='Picture') {
                  doc.view = me.baseURL + '/api/v1/id/' + res.entries[i].uid +'/@rendition/Medium' + "?token=" + me.token;
                }
                else if (res.entries[i].type=='Video') {
                  doc.view = me.baseURL + '/api/v1/id/' + res.entries[i].uid + '/@rendition/WebM%20480p' + "?token=" + me.token; 
                }
                else if (res.entries[i].type=='ThreeD') {
                  doc.view = me.baseURL + '/api/v1/id/' + res.entries[i].uid + '/@rendition/isometric' + "?token=" + me.token;                   
                } else {
                  doc.view = doc.thumbnail;
                }
                docs.push(doc);
            }
            me._documents = docs;
            me._aggregates = res.aggregations;
            console.log(res);
            if (me.cb) {
                me.cb();
            }})
        .catch(function(error) 
            {console.log(error)});

    }

}