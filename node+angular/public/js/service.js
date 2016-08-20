/**
 * Created by xiongfeng on 2016/6/15.
 */
angular.module('myApp.services', [])
    .factory('HitService', function($q, $http) {
        var service = {
            count: function() {
                var d = $q.defer();
                $http.get('/hits')
                    .success(function(data, status) {
                        d.resolve(data.hits);
                    }).error(function(data, status) {
                        d.reject(data);
                    });
                return d.promise;
            },
            registerHit: function() {
                var d = $q.defer();
                $http.post('/hit', {})
                    .success(function(data, status) {
                        d.resolve(data.hits);
                    }).error(function(data, status) {
                        d.reject(data);
                    });
                return d.promise;
            },
            removeHit: function() {
                var d = $q.defer();
                $http.post('/remove', {})
                    .success(function(data, status) {
                        d.resolve(data.hits);
                    }).error(function(data, status) {
                        d.reject(data);
                    });
                return d.promise;
            },/*
            userDataSubmit:function(username,password){
                var q=$q.defer();
                $http
                ({
                    method:'post',
                    url:'/userData',
                    data:{
                        'username':username,
                        'password':password
                    }
                }) .success(function(data, status) {
                    q.resolve(data);
                }).error(function(data, status) {
                    q.reject(data);
                });
                return q.promise;
            },*/
            userDataSubmit:function(imgUrl){
                var q=$q.defer();
                $http
                ({
                    method:'post',
                    url:'/userData',
                    data:{
                        'imgUrl':imgUrl
                    }
                }) .success(function(data, status) {
                    q.resolve(data);
                }).error(function(data, status) {
                    q.reject(data);
                });
                return q.promise;
            }

        }
        return service;
    })
    .factory('injectFac',function(){
        var service={
            hello:function(){
                console.log('hello');
            }
        }
        return service;
    });
