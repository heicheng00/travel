angular.module('app.controllers')
    .controller('orderCtrl', ['$scope', '$ionicGesture', '$ionicTabsDelegate', '$timeout', '$ionicLoading', '$state', '$stateParams',
        function ($scope, $ionicGesture, $ionicTabsDelegate, $timeout, $ionicLoading, $state, $stateParams) {

            $scope.changePage = function (index) {
                $ionicLoading.show({
                    template: 'loading...'
                });
                $timeout(function () {
                    //$ionicTabsDelegate.select($scope.activeIndex - 1);
                    $scope.activeIndex = index;
                    $ionicLoading.hide();
                }, 800)

            };
            //滑动页面
            $scope.activeIndex = $stateParams.id || 0;
            $scope.onSlideChanged = function (index) {
                $ionicLoading.show({
                    template: 'loading...'
                });
                $timeout(function () {
                    //$ionicTabsDelegate.select($scope.activeIndex - 1);
                    $scope.activeIndex = index;
                    $ionicLoading.hide();
                }, 800)

            };

            $scope.allOrderUrl = "templates/mine/order/allOrder.html";
            $scope.otherUrl = "templates/mine/order/other.html";

            //$scope.selectedIndex = $ionicTabsDelegate.selectedIndex(); //使用原始方式 不生效
            //$scope.selectedIndex = $ionicTabsDelegate.selectedIndex(); //当前选中的tab索引

            $scope.onSwipeRight = function () {
                if ($scope.activeIndex > 0) {
                    $ionicLoading.show({
                        template: 'loading...'
                    });
                    $timeout(function () {
                        //$ionicTabsDelegate.select($scope.activeIndex - 1);
                        $scope.activeIndex--;
                        $ionicLoading.hide();
                    }, 200)

                }

            };
            $scope.onSwipeLeft = function () {
                if ($scope.activeIndex < 4) {
                    $ionicLoading.show({
                        template: 'loading...'
                    });
                    $timeout(function () {
                        //$ionicTabsDelegate.select($scope.selectedIndex + 1);
                        $scope.activeIndex++;
                        $ionicLoading.hide();
                    },200)

                }

            };

            //$scope.onSlideChanged = function(index){
            //    $scope.activeIndex = 0;
            //    $scope.showPage(index);
            //};
            //显示具体的tab页
            //$scope.showPage = function (index) {
            //    switch (index){
            //        case 0 :
            //            $state.go('all.allOrder');
            //            break;
            //        case 1 :
            //            $state.go('all.unpay');
            //            break;
            //        case 2 :
            //            $state.go('all.ungo');
            //            break;
            //        case 3 :
            //            $state.go('all.saleOff');
            //            break;
            //        case 4 :
            //            $state.go('all.cancel');
            //            break;
            //    }
            //}
        }])