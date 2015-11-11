require([
    'require/domReady'
  , 'ofp/LiveTestingController'
], function(
  , URLHostedController
) {
    "use strict";
    /*global document:true*/
    function main () {
        var ctrl = new LiveTestingController(document.body);
    }
    domReady(main);
});
