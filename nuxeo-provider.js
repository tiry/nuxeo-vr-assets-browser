
function NuxeoProvider() {

    this._documents = [];

    this.documents = function() {
        return this._documents;
    }

    this.aggregates = function() {

    }

    this.fetch = function(params) {

        //https://nightly.nuxeo.com/nuxeo/api/v1/query/default_search
        //https://nightly.nuxeo.com/nuxeo/api/v1/query/advanced_document_content

        this._documents = [];
        for(var i =100; i<255; i++) {
            var doc = {};
            doc.color = "#" + ("0" + i.toString(16)).slice(-2) + ("0" + i.toString(16)).slice(-2) +  ("0" + i.toString(16)).slice(-2);
            if (i%2==0) {
                doc.thumb="#nuxeo-logo";
            } else {
                doc.thumb="#daydream";
            }
            this._documents.push(doc);
        }
    }

}