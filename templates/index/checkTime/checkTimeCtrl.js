/**
 * Created by thinkpad on 2016/10/25.
 */
angular.module('app.checkTime',['ui.calendar'])
    .controller('checkTimeCtrl', function ($scope) {
        $scope.uiConfig = {
            calendar:{
                height: 350,
                editable: true,
                start:new Date().getDate(),
                header:{
                    left: '',
                    center: '',
                    right: ''
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,
                dayClick:$scope.dayClick

            }
        };
        $scope.events = [];
        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.isShowCalendar = false;
        $scope.hasCheckIn = false;
        $scope.isConfirmCheck = false;
        // 添加事件
        $scope.dayClick = function (date, jsEvent, view) {
            var date = new Date(date);
            var y = new Date(date).getFullYear();
            var m = new Date(date).getMonth();
            var d = new Date(date).getDate();
            var s = new Date(date).getTime();

            if($scope.isConfirmCheck){
                $scope.isConfirmCheck = false;
                $scope.events.length = 0;
            }

            if($scope.hasCheckIn){
                $scope.events.push({
                    title: '离店',
                    start: new Date(y, m, d),
                    //end: new Date(y, m, d+1),
                    //className: ['openSesame'],
                    stick:true,
                    //editable:true

                });
                $scope.hasCheckIn = false;
                $scope.checkOut = s;
                $scope.planTime = ($scope.checkOut - $scope.checkIn) / 1000 / 3600 / 24; // 入住的时间
                $scope.isConfirmCheck = true;
                $scope.isShowCalendar = !$scope.isShowCalendar;


            }else{
                $scope.events.push({
                    title: '入住',
                    start: new Date(y, m, d),
                    //end: new Date(y, m, d+1),
                    //className: ['openSesame'],
                    stick:true,
                    //editable:true

                });
                $scope.checkIn = s;
                $scope.hasCheckIn = true;

            }


        };

        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
        };
    })