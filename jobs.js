(function(){
    var app = angular.module('store-directives', []);

    app.directive("jobProfile", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/job-profile.html"
      };
    });

    // app.directive("productTabs", function() {
    //   return {
    //     restrict: "E",
    //     templateUrl: "partials/product-tabs.html",
    //     controller: function() {
    //       this.tab = 1;

    //       this.isSet = function(checkTab) {
    //         return this.tab === checkTab;
    //       };

    //       this.setTab = function(activeTab) {
    //         this.tab = activeTab;
    //       };
    //     },
    //     controllerAs: "tab"
    //   };
    // });

    // app.directive("productGallery", function() {
    //   return {
    //     restrict: "E",
    //     templateUrl: "partials/product-gallery.html",
    //     controller: function() {
    //       this.current = 0;
    //       this.setCurrent = function(imageNumber){
    //         this.current = imageNumber || 0;
    //       };
    //     },
    //     controllerAs: "gallery"
    //   };
    // });
  })();
