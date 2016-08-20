/**
 * Created by xiongfeng on 2016/7/11.
 */
angular.module('myApp.controllers', [])
    .controller('injectCtrl',['$scope','injectFac',function($scope,injectFac){



    }])
    .controller('promiseCtrl',['$scope','$q',function($scope,$q){
        var a='a'
        var funcA = function(a){
            console.log("funcA");
            return a;
        }
        $q.when(funcA(a))
        .then(function(result){
             console.log(result);
        });

    }]);
    var injector = angular.injector(['myApp.services']); //新建myApp.services模块注入器
        console.log(injector);
    function test(injectFac){
        console.log(injectFac.hello);
    };
    //test.$inject = ['injectFac']; //加这句可以将注入函数test的服务命名为其他名称而不必使用原名
    injector.invoke(test); //将myApp.services中的服务注入到函数test中