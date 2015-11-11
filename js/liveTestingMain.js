require([
    'require/domReady'
  , 'ofp/LiveTestingController'
], function(
    domReady
  , LiveTestingController
) {
    "use strict";
    /*global document:true*/
    function main () {
        var ctrl = new LiveTestingController(document.body);
    }
    domReady(main);
});
