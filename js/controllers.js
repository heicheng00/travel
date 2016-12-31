angular.module('app.controllers',['ngCordova'])
  
.controller('indexCtrl', function($scope, $cordovaBarcodeScanner, $cordovaToast) {
      $scope.activeIndex = 0;//保存当前活动幻灯片的索引

    //当发生幻灯片切换事件时
    $scope.onSlideChanged = function (index) {
        $scope.activeIndex = index;
    };

      //单击分页器小圆点时，执行
     $scope.pagerClick = function (index) {
         $scope.activeIndex = index;
     };

    //扫二维码  //手机设置没有设置权限   调用不了
     $scope.BarcodeScanner = function(){
        $cordovaBarcodeScanner.scan().then(function (barcodeData) {
            $cordovaToast.show('扫码完成','long','center');
        }, function (error) {
            $cordovaToast.showLongCenter('扫码失败');
        })
    }


})
    .controller('inlandHotelCtrl', function ($scope) {

    })
    .controller('hourlyRoomCtrl', function ($scope,$http) {
        $scope.activeIndex = 0;//保存当前活动幻灯片的索引

        //当发生幻灯片切换事件时
        $scope.onSlideChanged = function (index) {
            $scope.activeIndex = index;
        };


        //单击分页器小圆点时，执行
        $scope.pagerClick = function (index) {
            $scope.activeIndex = index;
        };

        $http.get("indexZdf.json").success(function (response) {
            $scope.cities = response.cities;
           })
            .error(function (err,status) {
                console.log(status);
            })
    })
   
.controller('findCtrl', function($rootScope,$scope, $http, $ionicScrollDelegate, $timeout, $window) {
    $scope.page = 0;//当前城市序号
    $scope.total = 1;//总城市个数
    $scope.cities = [ ];//存储所有旅游目的地的信息
    var url = "find.json";
    $scope.getCities = function () {
         $scope.page ++ ;//当前城市序号加1

        //ajax请求
        $http.get(url)
            .success(function (response) {
                //遍历返回的数据，找出每个旅游地的信息 添加到数组中
                angular.forEach(response.cities, function (city) {
                    $scope.cities.push(city);
                });

                //把酒店类型存储起来 在父控制器中使用
                if($scope.cities.length){
                    $scope.HotelType = [];
                    angular.forEach($scope.cities, function (item) {
                        $scope.HotelType.push({type:item.type});
                    });
                    $window.localStorage.setItem('HotelType',JSON.stringify($scope.HotelType));
                }

                //更新页面总数
                $scope.total = response.totalCities;//获得总城市数
                //广播事件，告诉无限滚动事件，everything is done
                $scope.$broadcast("scroll.infiniteScrollComplete");

            })
            .error(function (err) {
                $scope.$broadcast("scroll.infiniteScrollComplete");
                console.log(err);
            });
    };

    $scope.getCities();//加载时，从api加载第一个城市


    //下拉刷新
    $scope.loadMore = function(){
        $http.get(url)
            .success(function (response) {
            //重新加载城市数据
                $scope.cities = response.cities;
        }).finally(function () {
            $scope.$broadcast("scroll.refreshComplete");
        })
    }

//    新增功能
    $scope.checkScroll = function () {
        //防止抖动 用 $timeout
        $timeout(function () {
            //console.log($ionicScrollDelegate.$getByHandle('mainContent').getScrollPosition().top);
            $scope.scrollVal = {
                top:$ionicScrollDelegate.$getByHandle('mainContent').getScrollPosition().top
            };
            // $scope.isShowTypeTop 是父控制器里的
            $rootScope.isShowTypeTop = ($scope.scrollVal.top > 0) ? false : true;
        });

    }


    //angular 的监控在ionic中不行??
    //$scope.$watch('$scope.scrollVal.top', function (newValue) {
    //    if(!newValue){
    //        return;
    //    }
    //    $scope.isShowTypeTop = newValue > 0 ? false : true;
    //
    //})



})
   
.controller('mineCtrl', function($scope, $state) {
   $scope.onTap = function (e) {
       angular.element(this).addClass('master').siblings().removeClass('master');
   }

    $scope.goOrderPage = function (index) {
        $state.go('all',{id:index});
    }
})
   
.controller('serverCtrl', function($scope) {

})

.controller('enterCtrl', function ($scope,$ionicSlideBoxDelegate) {
   $scope.isShow = false;
    //幻灯片事件响应函数
    $scope.onSlideChanged = function () {
        if($ionicSlideBoxDelegate.currentIndex() == $ionicSlideBoxDelegate.slidesCount()-1){
            //当前索引是最后一张幻灯片
            $scope.isShow = true;
        }
    }

});
 