angular.module('app.services', ['ionic'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])
 .factory('cityType',['$scope','$ionicPopover' , function ($scope, $ionicPopover) {
    return {
        loadUrl: function (url) {
            $ionicPopover.fromTemplateUrl(url,{scope: $scope,backdropClickToClose :false}).then(function (popover) {
                $scope.popover = popover;
            })
        },
        openPopover: function ($event) {
            $scope.popover.show($event);
        },
        closePopover: function () {
            $scope.popover.hide();
        },
        //Cleanup the popover when we're done with it!
        watchDestroy: function () {
            $scope.$on('$destroy', function () {
                $scope.popover.remove();
            })
        },
        watchHide: function () {
            $scope.$on('popover.hidden', function () {

            })
        },
        watchRemove: function () {
            $scope.$on('popover.removed', function () {

            })
        }
    }
}])


