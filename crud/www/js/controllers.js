angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope,$state){
        
})

.controller('temanDetailCtrl', function($scope,$stateParams,$ionicPopup,$ionicModal,$state,temanService){
        
    $scope.showDataId = function() {
      temanService.getId($stateParams.temanId).success(function(datateman) {
            $scope.datateman = datateman;
        });
        
    };
    $scope.showDataId();
    
    $scope.back = function (){
        $state.go('tab.teman');
    };
    
    $ionicModal.fromTemplateUrl('edit.html', function(modal){
        $scope.taskModal = modal;
	}, {
            scope : $scope,
            animation : 'slide-in-up'	
	});
        
        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-positive'
            });
          };
	
	$scope.editModal = function(){
            $scope.taskModal.show();
	};
	
	$scope.batal = function(){
            $scope.taskModal.hide();
            $scope.showDataId();
	};
        
	$scope.edit = function(id,nama,alamat,spesialis,fb,icon){
            if (!id){
                $scope.showAlert({
                    title: "Information",
                    message: "Id Mohon Diisi"
                });
            }else if (!nama){
                $scope.showAlert({
                    title: "Information",
                    message: "Nama Mohon Diisi"
                });
            }else if(!alamat){
                $scope.showAlert({
                    title: "Information",
                    message: "Alamat Mohon Diisi"
                });
            }else if(!spesialis){
                $scope.showAlert({
                    title: "Information",
                    message: "Spesialis Mohon Diisi"
                });
            }else if(!fb){
                $scope.showAlert({
                    title: "Information",
                    message: "Fb Mohon Diisi"
                });
            }else if(!icon){
                $scope.showAlert({
                    title: "Information",
                    message: "Icon Mohon Diisi"
                });
            }else{
                $scope.id = id;
                $scope.nama = nama;
                $scope.alamat = alamat;
                $scope.spesialis = spesialis;
                $scope.fb = fb;
                $scope.icon = icon;
                temanService.update({
                    'id' : id,
                    'nama': nama,
                    'alamat': alamat,
                    'spesialis': spesialis,
                    'fb': fb,
                    'icon': icon
                }).then(function(resp) {
                  console.log('Success', resp);
                  $scope.showAlert({
                        title: "Information",
                        message: "Data Telah Diupdate"
                    });
                },function(err) {
                  console.error('Error', err);
                }); 
            }
	};
	
})

.controller('tabCtrl', function($scope){
})

.controller('dataTemanCtrl', function($scope,$state, temanService){
    $scope.showData = function() {
      temanService.getAll().success(function(data) {
            $scope.datatemans = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();
    
    $scope.reload = function (){
        $state.go('tab.teman');
    };
    
    $scope.delete = function (datateman){
        temanService.delete(datateman.id);
        $scope.datatemans.splice($scope.datatemans.indexOf(datateman),1);
    };
})

.controller('tambahTemanCtrl', function($scope,$ionicPopup,temanService){
    $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-positive'
      });
    };
    
    $scope.datateman={};
    $scope.simpan = function (){
        if (!$scope.datateman.nama){
            $scope.showAlert({
                title: "Information",
                message: "nama mohon diisi"
            });
        }else if (!$scope.datateman.alamat){
            $scope.showAlert({
                title: "Information",
                message: "alamat mohon diisi"
            });
        }else if (!$scope.datateman.spesialis){
            $scope.showAlert({
                title: "Information",
                message: "spesialis mohon diisi"
            });
        }else if (!$scope.datateman.fb){
            $scope.showAlert({
                title: "Information",
                message: "facebook mohon diisi"
            });
        }else if (!$scope.datateman.icon){
            $scope.showAlert({
                title: "Information",
                message: "icon mohon diisi"
            });
        }else{
            temanService.create({
                nama: $scope.datateman.nama,
                alamat: $scope.datateman.alamat,
                spesialis: $scope.datateman.spesialis,
                fb: $scope.datateman.fb,
                icon: $scope.datateman.icon
            }).success(function(data){
                $scope.showAlert({
                    title: "Information",
                    message: "Data Telah Tersimpan"
                });
            });
        }
        
    };
       
});
