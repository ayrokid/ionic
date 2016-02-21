angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, LoginService, $state, $ionicPopup, $ionicHistory) {

    $scope.changeData = {};

    //refresh current page
    $scope.refresh = function(){
        $state.go($state.current, {}, { reload: true });
    }

    //checking login user
    $scope.isLoggedIn = function() {
        return LoginService.isLoggedIn();
    };

    //logout user
    $scope.logout = function() {
        LoginService.logout();
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $state.go('app.welcome',{}, {reload: true});
    };

    // Create the change password modal that we will use later
    $ionicModal.fromTemplateUrl('templates/change_password.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the change password modal to close it
    $scope.closeChange = function() {
        $scope.modal.hide();
    };

    // Open the change password modal
    $scope.change_password = function() {
        $scope.modal.show();
    };

    // Perform the change action when the user submits the change form
    $scope.doChange = function() {
        var profile = JSON.parse(window.localStorage['profile']);
        $scope.changeData.userid  = profile.userid;
        $scope.changeData.api_key = profile.api_key;
        LoginService.changePassword($scope.changeData).success(function(data) {
            if(data.status == 'true'){
                var alertPopup = $ionicPopup.alert({
                    title: 'Info',
                    template: data.message
                });
                $scope.modal.hide();
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Change Password failed!',
                    template: 'Please check your credentials!'
                });
            }
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Change Password failed!',
                template: 'Please check your credentials!'
            });
        });
    };

})

.controller('welcomeCtrl', function($scope, $ionicHistory, LoginService, $ionicPopup, $state) {

    if(LoginService.isLoggedIn() == true) {
        $ionicHistory.nextViewOptions({
            disableBack: true,
            disableAnimate: true
        });
        $state.go('app.dashboard',{}, {reload: true});
    }

    $scope.loginData = {};

    $scope.doLogin = function() {
        LoginService.loginUser($scope.loginData).success(function(data) {
            //console.log(data.status);
            if(data.status == 'true'){
                window.localStorage.setItem("profile", JSON.stringify(data));
                //window.localStorage.setItem('login', 'true');
                LoginService.setUser();
                //clear form input
                $scope.loginData.email = '';
                $scope.loginData.password = '';

                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.dashboard');
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please correct your email or password',
                });
            }

        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your connection'
            });
        });
    };
})


.controller('dashCtrl', function($scope, $window, $http, LoginService, $state, $ionicHistory) {
    if(LoginService.isLoggedIn() == false) {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $state.go('app.welcome',{}, {reload: true});
    }

    $scope.item = {};
    var profile = JSON.parse(window.localStorage['profile']);

    $http.get("http://pos.gotoko.id/api_v2/android/dashboard",
        {
            params: { "codeid" : profile.codeid, "key": profile.api_key }
        })
        .success(function(data) {
            $scope.item = data;
            window.localStorage.setItem("dash", JSON.stringify(data));
        })
        .finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });

    // load previous data if connection lose
    if(window.localStorage['dash']){
        $scope.item = JSON.parse(window.localStorage['dash']);
    }
})


.controller('salesCtrl', function($scope, $http, LoginService, $state, $ionicHistory) {
    if(LoginService.isLoggedIn() == false) {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $state.go('app.welcome',{}, {reload: true});
    }

    $scope.item = {};
    var profile = JSON.parse(window.localStorage['profile']);

    $http.get("http://pos.gotoko.id/api_v2/android/sales",
        {
            params: { "codeid" : profile.codeid, "key": profile.api_key }
        })
        .success(function(data) {
            $scope.item = data;
            window.localStorage.setItem("sales", JSON.stringify(data));
        })
        .finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });

    if(window.localStorage['sales']){
        $scope.item = JSON.parse(window.localStorage['sales']);
    }
    //generate chart
    $scope.chartPie = {
        options: {
        chart: {
            type: 'column',
            // marginTop: '10px'
        },
        colors: ['#058dc7', '#50b432', '#F4AE11'],
        },
        title: {
            text: 'Monthly Sales'
        },
        subtitle: {
            text: 'Source: gotoko.id'
        },
        xAxis: {
            categories: [
                $scope.item.month
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Sales'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Target',
            data: [Number($scope.item.target)]

        }, {
            name: 'Sales',
            data: [Number($scope.item.sales)]

        }]
    };
})

.controller('budgetCtrl', function($scope, $window, $http, $state) {

    $scope.items = {};
    var profile = JSON.parse(window.localStorage['profile']);

    $http.get("http://pos.gotoko.id/api_v2/android/budget",
        {
            params: { "codeid" : profile.codeid, "key": profile.api_key }
        })
        .success(function(data) {
            $scope.items = data;
            window.localStorage.setItem("budget", JSON.stringify(data));
        })
        .finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });

    if(window.localStorage['budget']){
        $scope.items = JSON.parse(window.localStorage['budget']);
    }

    $scope.edit = function(){
        $state.go("app.edit-budget");
    }
})

.controller('editBudgetCtrl', function($scope, $window, $http, $state, $ionicPopup, $ionicHistory) {

    $scope.items  = {};
    $scope.budget = {};
    $scope.budget.account_operasional  = 500;
    $scope.budget.account_listrik      = 501;
    $scope.budget.account_pdam         = 502;
    $scope.budget.account_telepon      = 503;
    $scope.budget.account_kesehatan    = 504;
    $scope.budget.account_transportasi = 505;
    $scope.budget.account_hiburan      = 506;
    $scope.budget.account_konsumsi     = 507;
    $scope.budget.account_pulsa        = 508;
    $scope.budget.account_lain         = 509;
    var profile   = JSON.parse(window.localStorage['profile']);

    $http.get("http://pos.gotoko.id/api_v2/android/budget",
        {
            params: { "codeid" : profile.codeid, "key": profile.api_key }
        })
        .success(function(response) {
            $scope.items = response;

            $scope.budget.key = profile.api_key;
            $scope.budget.codeid = profile.codeid;
            $scope.budget.year = response.year;
            $scope.budget.field = response.field;

            $scope.budget.saldo_operasional = response.data[0].anggaran;
            $scope.budget.saldo_listrik = response.data[1].anggaran;
            $scope.budget.saldo_pdam = response.data[2].anggaran;
            $scope.budget.saldo_telepon = response.data[3].anggaran;
            $scope.budget.saldo_kesehatan = response.data[4].anggaran;
            $scope.budget.saldo_transportasi = response.data[5].anggaran;
            $scope.budget.saldo_hiburan = response.data[6].anggaran;
            $scope.budget.saldo_konsumsi = response.data[7].anggaran;
            $scope.budget.saldo_pulsa = response.data[8].anggaran;
            $scope.budget.saldo_lain = response.data[9].anggaran;
        })
        .error(function(data) {
            $scope.item = null;
        });

    $scope.save = function() {
        $http.post("http://pos.gotoko.id/api_v2/toko/budget",
        {
            params: $scope.budget
        })
        .success(function(response) {
            if(response.status == 'true'){
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.edit-budget',{},{reload: true});
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Update failed!',
                    template: 'Please correct your data',
                });
            }
        })
        .error(function(data) {
            $scope.item = null;
        });
    };

    $scope.currency = function(data){
        console.log(data);
    }

    function formatDefault(num) {
        num = num+"";
        num = num.toString().replace( /,/g, "" );
        return number_format(num,2,'.',',');
    }

    function currency_idr(val){
        return number_format(val,2,'.',',');
    }

    function number_format(num,dig,dec,sep) {
        x=new Array();
        s=(num<0?"-":"");
        num=Math.abs(num).toFixed(dig).split(".");
        r=num[0].split("").reverse();
        for(var i=1;i<=r.length;i++){x.unshift(r[i-1]);if(i%3==0&&i!=r.length)x.unshift(sep);}
        return s+x.join("")+(num[1]?dec+num[1]:"");
    }

})

.controller('settingCtrl', function($scope, $window, $http, $state, $ionicPopup, $ionicHistory) {

    $scope.items  = {};
    $scope.budget = {};
    $scope.budget.account_operasional  = 500;
    $scope.budget.account_listrik      = 501;
    $scope.budget.account_pdam         = 502;
    $scope.budget.account_telepon      = 503;
    $scope.budget.account_kesehatan    = 504;
    $scope.budget.account_transportasi = 505;
    $scope.budget.account_hiburan      = 506;
    $scope.budget.account_konsumsi     = 507;
    $scope.budget.account_pulsa        = 508;
    $scope.budget.account_lain         = 509;
    var profile   = JSON.parse(window.localStorage['profile']);

    $http.get("http://pos.gotoko.id/api_v2/android/budget",
        {
            params: { "codeid" : profile.codeid, "key": profile.api_key }
        })
        .success(function(response) {
            $scope.items = response;

            $scope.budget.key = profile.api_key;
            $scope.budget.codeid = profile.codeid;
            $scope.budget.year = response.year;
            $scope.budget.field = response.field;

            $scope.budget.saldo_operasional = response.data[0].anggaran;
            $scope.budget.saldo_listrik = response.data[1].anggaran;
            $scope.budget.saldo_pdam = response.data[2].anggaran;
            $scope.budget.saldo_telepon = response.data[3].anggaran;
            $scope.budget.saldo_kesehatan = response.data[4].anggaran;
            $scope.budget.saldo_transportasi = response.data[5].anggaran;
            $scope.budget.saldo_hiburan = response.data[6].anggaran;
            $scope.budget.saldo_konsumsi = response.data[7].anggaran;
            $scope.budget.saldo_pulsa = response.data[8].anggaran;
            $scope.budget.saldo_lain = response.data[9].anggaran;
        })
        .error(function(data) {
            $scope.item = null;
        });

    $scope.save = function() {
        $http.post("http://pos.gotoko.id/api_v2/toko/budget",
        {
            params: $scope.budget
        })
        .success(function(response) {
            if(response.status == 'true'){
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.edit-budget',{},{reload: true});
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Update failed!',
                    template: 'Please correct your data',
                });
            }
        })
        .error(function(data) {
            $scope.item = null;
        });
    };

    $scope.currency = function(data){
        console.log(data);
    }

    function formatDefault(num) {
        num = num+"";
        num = num.toString().replace( /,/g, "" );
        return number_format(num,2,'.',',');
    }

    function currency_idr(val){
        return number_format(val,2,'.',',');
    }

    function number_format(num,dig,dec,sep) {
        x=new Array();
        s=(num<0?"-":"");
        num=Math.abs(num).toFixed(dig).split(".");
        r=num[0].split("").reverse();
        for(var i=1;i<=r.length;i++){x.unshift(r[i-1]);if(i%3==0&&i!=r.length)x.unshift(sep);}
        return s+x.join("")+(num[1]?dec+num[1]:"");
    }

});
