/**
 * Created by xiongfeng on 2016/6/15.
 */
var myApp=angular.module('myApp', [
    'myApp.services','myApp.controllers','ui.router'
])  .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .config(function($httpProvider,$stateProvider){
       $httpProvider.defaults.headers.post['Content-Type'] = 'multipart/form-data;boundary=ABCD';
        //$httpProvider.defaults.headers.post['Content-Type'] ="application/x-www-form-urlencoded";
            $httpProvider.interceptors.push('myInterceptor');

        $stateProvider
            .state('index', {
                url: '/123',
                template:"<div><div style='background-color:red;height:100px;width:100px;'></div></div>",
                controller:function($scope,$stateParams){

                }

            })
            .state('form', {
                url: '',
                template:"<div><div>xxxxx</div></div>",
                controller:function($scope,$stateParams){

                }

            })

    })

    .run(function(){

    })
    .factory('myInterceptor',function($rootScope,AUTH_EVENTS){
        var interceptor={
            /*'request':function(config){
                console.log(config);
                return config;
            },*/
            'response':function(response){
                //console.log(response);
                $rootScope.$broadcast({
                    200: AUTH_EVENTS.loginSuccess,
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status],response);
                return response;
            },
        }
        return interceptor;
    })
    .controller('parent',function($scope,AUTH_EVENTS){
        /*$scope.parent=function(){
            $scope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout
            }['401']);
        }*/
    })
    .controller('child',function($scope){

        $scope.$on('auth-login-success',function(evt,data){
            //console.log(data);
        })
    })
    .controller('HomeController', function($scope, HitService,$http,$q) {
        /*$scope.hits='23';
        setTimeout(function(){
            console.log($scope.hits);
        },1000);*/

        HitService.count()
            .then(function(data) {
                $scope.hits = data;
            });
        $scope.registerHit = function() {
            HitService.registerHit()
                .then(function(data) {
                    $scope.hits = data;
                });
        }
        $scope.removeHit = function() {
            HitService.removeHit()
                .then(function(data) {
                    $scope.hits = data;
                });
        }

        $scope.formSubmit = function(){
            console.log((angular.identity)('asd'));//angualr.identiy本身就是一个函数，最后返回他
                                                   //代指的那个函数的第一个参数也就是传入的'asd'
            //HitService.userDataSubmit($scope.username,$scope.password)
            //    .then(function(data){
            //        console.log(data);
            //    })
            /*HitService.userDataSubmit($scope.imgUrl)
                .then(function(data){
                    console.log(data);
                   // $scope.imgSrc='images/'+data.imgUrl;
                })*/
            var postData = {

                fileName: $scope.imgUrl

            };
             postMultipart('/userData', postData).then(function(data){
                $scope.imgSrc=data.imgUrl;
            })
            function postMultipart(url, data) {
                console.log(data);
                var q=$q.defer();
                /*实现multipart/form-data的content-Type的post*/



                var fd = new FormData();
                //var blob=new Blob([data['fileName']],{type:'text/plain'});
                /*angular.forEach(data, function(val, key) {

                    fd.append(key, val);

                });*/
                //fd.append('imageFile', blob);

                var args = {
                    method: 'POST',
                    url: url,
                    data: fd,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity //返回transformRequest的第一个参数data
                        /*function(data,header){ //transformRequest的本来面貌
                            console.log(data);   //可以获取修改$http的data和header
                        }*/
                };
                 $http(args).success(function(data, status) {
                     q.resolve(data);
                 }).error(function(data, status) {
                     q.reject(data);
                 });
                return  q.promise;
            }

        }

        $scope.upFile =function(evt){
            var postData = {};
            var evt = evt || window.event;
            if (!window.FileReader) return;
            var files = evt.target.files;
            for (var i = 0, f; f = files[i]; i++) {
                if (!f.type.match('image*')) {
                    continue;
                }
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {

                        $scope.imgUrl=e.target.result;

                       };
                })(f);
                reader.readAsDataURL(f);

            }
        }
    })
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, ngModel) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function(event){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                    //附件预览
                    scope.file = (event.srcElement || event.target).files[0];
                    scope.getFile();
                });
            }
        };
    }])
    .controller('UploaderController', function($scope, fileReader,$http){
        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        };
        $scope.formSubmit=function(){
            var postData = {

                fileName: $scope.imageSrc

            };
            var promise = postMultipart('/userData', postData);
            function postMultipart(url, data) {
                var fd = new FormData();
                angular.forEach(data, function(val, key) {
                    fd.append(key, val);
                });
                var args = {
                    method: 'POST',
                    url: url,
                    data: fd,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                };
                return $http(args);
            }
        }
    })
    .factory('fileReader', ["$q", "$log", function($q, $log){
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        };
        return {
            readAsDataUrl: readAsDataURL
        };
    }])
    .service('Util', function($q) {
        var dataURItoBlob = function(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {
                type: mimeString
            });
        };

        var resizeFile = function(file) {
            var deferred = $q.defer();

            var img = document.createElement("img");

                for (var i = 0, f; f = file[i]; i++) {
                    if (!f.type.match('image*')) {
                        continue;
                    }
                    var reader = new FileReader();
                    reader.onload = (function(f){
                        return function (e) {
                            img.src = e.target.result;

                            //resize the image using canvas
                            var canvas = document.createElement("canvas");
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0);
                            var MAX_WIDTH = 800;
                            var MAX_HEIGHT = 800;
                            var width = img.width;
                            var height = img.height;
                            if (width > height) {
                                if (width > MAX_WIDTH) {
                                    height *= MAX_WIDTH / width;
                                    width = MAX_WIDTH;
                                }
                            } else {
                                if (height > MAX_HEIGHT) {
                                    width *= MAX_HEIGHT / height;
                                    height = MAX_HEIGHT;
                                }
                            }
                            canvas.width = width;
                            canvas.height = height;
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, width, height);

                            //change the dataUrl to blob data for uploading to server
                            var dataURL = canvas.toDataURL('image/jpeg');
                            var blob = dataURItoBlob(dataURL);

                            deferred.resolve(blob);
                        }
                    })(f);
                    reader.readAsDataURL(f);
                }


            return deferred.promise;

        };
        return {
            resizeFile: resizeFile
        };

    })
    .controller('CompanyCtrl', function($scope,$http, Util) {
        $scope.upFile =function(evt) {

            var evt = evt || window.event;
            if (!window.FileReader) return;
            $scope.files = evt.target.files;
        }
        $scope.formSubmit=function(){

            Util.resizeFile($scope.files).then(function(blob_data) {
                var fd = new FormData();

                fd.append("imageFile", blob_data);
                console.log(JSON.stringify(fd))
                $http.post('/userData', fd, {
                        headers: {'Content-Type': undefined },
                        transformRequest: angular.identity
                    })
                    .success(function(data) {

                    })
                    .error(function() {
                        console.log("uploaded error...")
                    });
            }, function(err_reason) {
                console.log(err_reason);
            });
        }
    })


