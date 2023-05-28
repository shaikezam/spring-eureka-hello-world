angular.module('myApp', [])
  .controller('ProductController', function ($scope, $http) {
      $http.get('/webapi/products')
              .then(function (response) {
              $scope.products = response.data;
                // Handle success response
                console.log('Data sent to the backend successfully.');
              })
              .catch(function (error) {
                // Handle error response
                console.error('Error sending data to the backend:', error);
              });

    $scope.totalPrice = 0;

    $scope.toggleCollapse = function (productId) {
      var product = $scope.products.find(function (p) {
        return p.id === productId;
      });
      if (product) {
        product.collapsed = !product.collapsed;
      }
    };

    $scope.calculateTotalPrice = function () {
      $scope.totalPrice = $scope.products.reduce(function (total, product) {
        return total + (product.price * (product.quantity || 0));
      }, 0);
    };

    $scope.sendToBackend = function () {
      var data = {
        products: $scope.products.map(function (product) {
          return {
            id: product.id,
            quantity: product.quantity
          };
        })
      };

      $http.post('http://localhost:8000/lol', data)
        .then(function (response) {
          // Handle success response
          console.log('Data sent to the backend successfully.');
        })
        .catch(function (error) {
          // Handle error response
          console.error('Error sending data to the backend:', error);
        });
    };
  });
