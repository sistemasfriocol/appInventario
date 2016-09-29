angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

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
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('InventarioCtrl', function ($scope, Cadena, $http, $timeout) {
    $scope.Paso = "dsfsf";
    $scope.ListaBodegas = CargarBodegas();
    $scope.ColorCantidad = "";
    $scope.MostrarError = false;

    $scope.MostrarDatos = false;

    function CargarBodegas() {

        var direccion = Cadena.getCadena().Cadena + 'api/Bodegas';

        $http({
            method: 'GET',
            url: direccion
        }).then(function successCallback(response) {
            $scope.ListaBodegas = response.data;
        }, function errorCallback(response) {

            //alert("Error");

            $scope.AlertaTitulo = "Error al Buscar la Bodega";
            $scope.AlertaMensaje = "Mo se Pudieron cargar las Bodegas";

            $scope.showAlert();

        });

        return '';
    };

    $scope.CliGuardarConteo = function () {

        var Cantidad = this.Cantidad;
        var Usuario = Cadena.getCadena().Empleado;
        var Bodega
        var ProEst = this.ProductosBuscaInventario;

        var direccion = Cadena.getCadena().Cadena + 'api/ProductosBuscarInventario?cantidad=' + Cantidad + '&Usuario=' + Usuario;

        $http({
            method: 'PUT',
            url: direccion,
            data: ProEst
        }).then(function successCallback(response) {
            $scope.MostrarDatos = true;
            //getAllClientes();
            if (response.data == true) {
                $scope.MostarDatos = false;
                $scope.MostrarError = true;
                $scope.Error = "Datos Guardados Correctamente";

                $timeout(function () {
                    $scope.MostrarError = false;
                }, 2000);

            } else {

                $scope.ColorBorde = "BordeRojo";
                $scope.MostrarError = true;
                $scope.Error = "Cantidades No Valida";
                $timeout(function () {
                    $scope.MostrarError = false;
                }, 2000);
            }
        }, function errorCallback(response) {

            $scope.MostrarError = true;
            $scope.Error = "Error al Guardar";

            $timeout(function () {
                $scope.MostrarError = false;
            }, 2000);
        });
    }

    $scope.CLicCambiarEstante = function () {


        var Bodega = this.BodegaSeleccionada;
        var Cod = this.Cod;
        var Estante = $scope.ObjRecibido.Estante;



        var direccion = Cadena.getCadena().Cadena + 'api/ProductosBuscarInventario?CodProd=' + Cod + '&IdBodega=' + Bodega + '&Estante=' + Estante;

        $http({
            method: 'PUT',
            url: direccion
        }).then(function successCallback(response) {

            $scope.MostrarError = true;
            if (response.data == true) {
                $scope.Error = "Guardado Satisfactoriamente";
                $timeout(function () {
                    $scope.MostrarError = false;
                }, 2000);

            } else {
                $scope.Error = "Error al Guardar";
                $timeout(function () {
                    $scope.MostrarError = false;
                }, 2000);
            }

        }, function errorCallback(response) {
            $scope.MostrarError = true;
            $scope.Paso = "Error Al Guardar";
            $timeout(function () {

                $scope.MostrarError = false;
            }, 2000);
        });


    }

    $scope.ClicBuscarDatos = function () {

        //  $scope.Paso="Paso";
        var Cantidad = this.Cantidad;
        var Bodega = this.BodegaSeleccionada;
        var Cod = this.Cod;
        var Usuario = "-1";
        var ObjRecibido;

        var ObjetoEnviar = { 'IdConsecutivo': 1, 'COD_PROD': Cod, 'IdBodega': Bodega, 'Estante': 0 };

        var direccion = Cadena.getCadena().Cadena + 'api/ProductosBuscarInventario?cantidad=' + Cantidad + '&Usuario=' + Usuario;

        $http({
            method: 'PUT',
            url: direccion,
            data: ObjetoEnviar
        }).then(function successCallback(response) {
            $scope.MostarDatos = true;
            $scope.MostrarDatos = true;
            if (response.data.Encontrado == true) {
                $scope.ObjRecibido = response.data;
                $scope.ColorCantidad = "";
            } else {
                $scope.Paso = "No coincide";
                $scope.ObjRecibido = response.data;
                $scope.ColorCantidad = "Rojo";
                $scope.MostrarError = true;
                $scope.Error = "Cantidad No Valida";

                $timeout(function () {
                    $scope.MostrarError = false;
                }, 1000);
            }


        }, function errorCallback(response) {
            $scope.Paso = "Error";
        });





    }


})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});
