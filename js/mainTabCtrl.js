/**
 * Created by thinkpad on 2016/10/15.
 */
//所有tab页 的父控制器
angular.module('app.tabs',['app.services'])
    .constant('redBtn','button-assertive')
    .controller('tabController',['$rootScope','$scope','$ionicLoading','$ionicPopover','redBtn','$timeout','$http','$ionicModal','$window',
        function ($rootScope, $scope, $ionicLoading,$ionicPopover,redBtn,$timeout,$http,$ionicModal,$window) {
        //find  tab页父控制器
        $rootScope.isShowTypeTop = true;

        //城市类型
        $scope.typeUrl = 'templates/tabs/citiesType.json';

        //加载城市类型数据
        $scope.loadCityType = function () {

            //$ionicLoading.show({template:'loading...'});
            $timeout(function () {
                $http({method:'GET',url:$scope.typeUrl}).then(function (data) {
                    $scope.typeUrlData = data;
                }, function (err) {

                })
            })

        };
        $scope.isClickBtn = false;
        $scope.tmpUrl = 'templates/tabs/TypeOfCities.html';
        $scope.chooseCityType = function (event, url) {
            $scope.loadCityType();
            //popover版本
            //$ionicPopover.fromTemplateUrl(url,{scope:$scope,backdropClickToClose:false}).then(function (popover) {
            //    $scope.popover = popover;
            //    $scope.popover.show(event);
            //})

            //modal版本
            $ionicModal.fromTemplateUrl(url,{scope:$scope,backdropClickToClose:false}).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            })



        }

        $scope.selectType = null;

        $scope.chooseType = function(type, index){
            $scope.isClickBtn = index;
            $scope.modal.remove();
            if(type == '全部'){
                $scope.selectType = null;
                return;
            }
            $scope.hotelType = $window.localStorage.getItem('HotelType')||[];
            if($scope.hotelType.length){
                angular.forEach(JSON.parse($scope.hotelType), function (item, index) {
                    if(type == item.type){
                        $scope.selectType = item.type;
                        $scope.isFindType =true;
                        return;
                    }
                });
                if(!$scope.isFindType){
                    //提示无该类型  展现全部类型
                    $cordovaToast.showShortCenter('暂未有该类型的酒店，敬请期待...');
                    $scope.selectType = null;
                }
                return;

            }

            //$scope.selectType = type;
        };
            //过滤器
        $scope.categoryFilter = function (item) {
           return ($scope.selectType == null) ? true : ($scope.selectType == item.type);
        }
    }

    ])
