var app = angular.module('BBS', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/announcements')
        .success(function (data) {
            $scope.announcements = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    
    $http.get('/api/users/current')
        .success(function (data) {
            $scope.currentUser = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.createAnnouncement = function () {
        if (angular.equals($scope.formData, {}))
            return;

        $http.post('/api/announcements', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                $scope.announcements = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteAnnouncement = function (id) {
        $http.delete('/api/announcements/' + id)
            .success(function (data) {
                $scope.announcements = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}