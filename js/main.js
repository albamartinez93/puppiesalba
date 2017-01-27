
var app = angular.module('proyecto', [ 'ngRoute'
]);

/**
 * Configurar las rutas
 */
app.config( function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "controller1"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "controller2"})
	.when("/gestion", {templateUrl: "partials/gestion.html", controller: "controller2"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "controller4"})
    .when("/services", {templateUrl: "partials/services.html", controller: "controller5"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "controller6"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "controller7"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "controller7"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "controller8"});
});


/**
 * Controladores 
 */
app.controller('controller1', function ($scope) {
  $scope.info='';
  $scope.info1='';
  $scope.info2='';

});


app.controller('controller2', function ($scope, $http) {
	$scope.nproduct = {}
	$scope.producto = function() {
		$http.post("/nuevo_producto", $scope.nproduct)
		.success(function(response){
			alert(response)
		})
		.error(function(response){
			
		})
	}
	$http.get('/productos').success(function(response) {
	$scope.productos =response  
  })

  $scope.nproductBorrar = {}
	$scope.borrarProducto = function(producto) {
	
			$http.post("/borrar_producto", producto)
			.success(function(response){
				$scope.productos.splice($scope.productos.indexOf(producto), 1);
				alert(response)
				
			})
			.error(function(response){
				
			});
	}
  $scope.nproductModificar = {}
	$scope.modificarProducto= function() {
		$http.post("/modificar_producto", $scope.nproductModificar)
		.success(function(response){
			alert(response)
		})
		.error(function(response){
		
		})
	}
});



app.controller('controller4', function ($scope, $http ) {
  $http.get('/productos').success(function(response) {
	$scope.productos =response  
  })  

});

app.controller('controller5', function (/* $scope, $location, $http */) {
  console.log("prueba");
});

app.controller('controller6', function (/* $scope, $location, $http */) {
  console.log("prueba");
});

app.controller('controller7', function (/* $scope, $location, $http */) {
  console.log("prueba");
});

app.controller('controller8', function (/* $scope, $location, $http */) {
  console.log("prueba");
});

