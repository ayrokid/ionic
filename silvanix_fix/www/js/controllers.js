angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, LoginService, $ionicPopup, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.refresh = function(){
    $state.go('app.playlists');
  }

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    LoginService.loginUser($scope.loginData.username, $scope.loginData.password).success(function(data) {
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $state.go('app.sales');
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });

  };
})

.controller('welcomeController', function($scope, $window, newsServices) {

})

.controller('ItemCtrl', function($scope, Items) {
  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt("What do you need to buy?");
    if(name) {
      $scope.items.$add({
        "name": name
      });
    }
  };
})

.controller('PlaylistsCtrl', function($scope, $window, newsServices) {

  $scope.showData = function() {
      newsServices.getAll(1).success(function(data) {
            $scope.playlists = data.results;
            $window.localStorage['playlists'] = JSON.stringify(data.results);
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();

    $scope.reload = function (){
        $state.go('app.playlists');
    };

    /*$scope.playlists = [];
    $scope.loadMore = function() {
        newsServices.getAll(2).success(function(items) {
          useItems(items);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.$on('$stateChangeSuccess', function() {
      $scope.loadMore();
    });*/
})

.controller('OkezoneCtrl', function($scope, $window, newsServices) {

  $scope.showData = function() {
      newsServices.getOkezone(1).success(function(data) {
            $scope.playlists = data.results;
            $window.localStorage['playlists'] = JSON.stringify(data.results);
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();

    $scope.reload = function (){
        $state.go('app.playlists');
    };
})

.controller('DetikCtrl', function($scope, $window, newsServices) {

  $scope.showData = function() {
      newsServices.getDetik(1).success(function(data) {
            $scope.playlists = data.results;
            $window.localStorage['playlists'] = JSON.stringify(data.results);
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();

    $scope.reload = function (){
        $state.go('app.playlists');
    };
})

.controller('salesCtrl', function($scope, $window, newsServices) {
  $scope.chartPie = {
        options: {
        chart: {
          type: 'column',
          // marginTop: '10px'
        },
        colors: ['#058dc7', '#50b432', '#F4AE11'],

      },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: [
                'Jan'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
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
            name: 'Tokyo',
            data: [49.9]

        }, {
            name: 'New York',
            data: [83.6]

        }, {
            name: 'London',
            data: [48.9]

        }]
    };
})

.controller('dashCtrl', function($scope) {


    $scope.chartPie = {
      options: {
        chart: {
          type: 'pie',
          // marginTop: '10px'
        },
        colors: ['#058dc7', '#50b432'],

      },
      series: [{
        data: [
          ['Download', 100],
          ['Upload', 500]
        ],
        name: 'InternetUsage MB',
        //data:[50,40],
        dataLabels: {
          rotation: 270,
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} MB'
        }
      }],
      title: {
        text: 'Pie Chart'
      },
       tooltip: {
            valueDecimals: 2,
            valueSuffix: ' USD'
        },

      credits: {
        enabled: false
      },

      loading: false
    }

$scope.chartarea = {
  options: {
          chart: {
            type: 'area',
            inverted: false,
            zoomType: 'xy',

             height: 250,



          },
          plotOptions: {

          series: {
              cursor: 'pointer',
              column :{
               size: '30%',
              },

          }
        },
          colors: ['#058dc7', '#50b432']
        },

        xAxis: {


            categories: ['10 jan','11 jan','12 jan','13 jan','14 jan','15 jan'],
            title: {
                text: ''
            },
            labels: {
                rotation: -90,
                style: {
                    fontSize: '12px',
            }
            }

        },
        yAxis: {
            min: 0,
            title: {
                text: 'Bandthwidth (MB)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' '
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',

            floating: false,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        title: {
               text: 'Internet Usage',
               style: {
                //color: '#FF00FF',
                fontSize: '12px'
            },
        },

        series: [{
            name: 'Download',
            data: [50,60,70,50,60,70],
        }, {
            name: 'Upload',
            data: [40,30,60,50,60,70],
        }, ],
        loading : false

    }



    $scope.chartDonut = {
      options: {
         plotOptions: {

                pie: {

                    dataLabels: {
                        enabled: false,

                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '0px 1px 2px black',

                        }

                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
             colors: ['#058dc7', '#50b432'],

    },

      series: [{
        type: 'pie',
        innerSize: '50%',
        data: [
          ['Download', 100],
          ['Upload', 500]
        ],
        name: 'InternetUsage MB',
        //data:[50,40],
        dataLabels: {
          rotation: 270,
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} MB'

        }
      }],
       title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            y: -60
        },


      credits: {
        enabled: false
      },

      loading: false
    }
})

.controller('PlaylistCtrl', function($scope, $stateParams, $window, newsServices) {

    $scope.detail = null;
    var playlists = JSON.parse($window.localStorage['playlists'] || '{}');
    for (var i = 0; i < playlists.length; i++) {
        if (playlists[i].id === $stateParams.newsId) {
          $scope.detail = playlists[i];
        }
    }

});
