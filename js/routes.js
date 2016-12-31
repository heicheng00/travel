angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('tabs', {
        url: '/tabs',
        abstract:true,
        templateUrl: 'templates/tabs.html',
        controller:'tabController'

      })

      .state('tabs.index', {
    url: '/index',
    views:{"tab-index":{ templateUrl: 'templates/index.html', controller: 'indexCtrl'}}


  })
      .state('inlandHotel', {
        url: '/inlandHotel',
          templateUrl: 'templates/inlandHotel.html',
          controller: 'inlandHotelCtrl'

      })
      .state('checkTime',{
          url:'/checkTime',
          templateUrl:'templates/index/checkTime/checkTime.html',
          controller:'checkTimeCtrl'

      })
      .state('hourlyRoom', {
          url: '/hourlyRoom',
          templateUrl: 'templates/hourlyRoom.html',
          controller: 'hourlyRoomCtrl'

      })

  .state('tabs.find', {
    url: '/find',
    views:{"tab-find":{ templateUrl: 'templates/find.html', controller: 'findCtrl'}}

  })

  .state('tabs.mine', {
    url: '/mine',
    views:{"tab-mine":{ templateUrl: 'templates/mine.html', controller: 'mineCtrl'}}

  })
      .state('all',{
          url:'/all/{id}',
          //abstract:true,
          templateUrl:'templates/mine/order/all.html',
          controller:'orderCtrl'

      })
      .state('all.allOrder',{
          url:'/allOrder',
          views:{
              "all-allOrder":{
                  templateUrl:'templates/mine/order/allOrder.html',
                  controller:'orderCtrl'
              }
          }
      })
      .state('all.unpay',{
          url:'/unpay',
          views:{
              "other-order":{
                  templateUrl:'templates/mine/order/other.html',
                  controller:'orderCtrl'
              }
          }
      })
      .state('all.ungo',{
          url:'/ungo',
          views:{
              "other-order":{
                  templateUrl:'templates/mine/order/other.html',
                  controller:'orderCtrl'
              }
          }
      })
      .state('all.saleOff',{
          url:'/saleOff',
          views:{
              "other-order":{
                  templateUrl:'templates/mine/order/other.html',
                  controller:'orderCtrl'
              }
          }
      })
      .state('all.cancel',{
          url:'/cancel',
          views:{
              "other-order":{
                  templateUrl:'templates/mine/order/other.html',
                  controller:'orderCtrl'
              }
          }
      })

  .state('tabs.server', {
    url: '/server',
    views:{"tab-server":{ templateUrl: 'templates/server.html', controller: 'serverCtrl'}}
  })

//三级嵌套的路由如何配置????
  .state('overseas',{
          url:'/overseas',
          templateUrl:'templates/server/overseas/overseas.html',
          controller:'overseas'
      })

  .state('enter', {
    url: '/enter',
    templateUrl: 'templates/enter.html',
    controller:'enterCtrl'

  });

$urlRouterProvider.otherwise('/enter');


});