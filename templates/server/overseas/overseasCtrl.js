/**
 * Created by thinkpad on 2016/10/16.
 */
angular.module('app.controllers')
    //.constant('activeClass',"red")
    .controller('overseas', function ($scope,$timeout, $ionicLoading, $ionicPopup, $compile) {

        //进入投诉页面
           $scope.complain = function () {
               $ionicLoading.show({template:'loading...'});
               $timeout(function () {
                   //$state.go();
                   $ionicLoading.hide();
                  $scope.showConfirm();


               },200)
           };

        //投诉提示
         $scope.showConfirm = function () {
            $ionicPopup.confirm({
                title:'国际酒店投诉',
                template: '<a href="tel:4006661166" class="callTel">请拨打  4006661166</a>',
                //定制  方案不可行  直接定位一个a标签到相关位置
                buttons:[
                    {
                        text:'Cancel'
                    },
                    {
                        text:'<a href="tel:4006661166" class="confirmCallTel">OK</a>',
                        type:'button-royal'
                    }
                ]


            }).then(function () {

            }, function () {
                
            })
         }

    });