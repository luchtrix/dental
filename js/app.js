var app = angular.module('MainApp', []);
var application = new Framework7({
    material: true
});
//var socket = io.connect('http://192.168.43.135:3000');
// Controlador de login
//var urlServidor = "http://159.203.128.165:3000/";
//var urlServidor = "http://127.0.0.1:8080/";
var urlServidor = "http://192.168.0.102:8080/";
// Elección de la zona individual a editar
var buttons = [
    {
        text: 'Selecciona la zona a editar',
        label: true
    },
    {
        text: 'Superior Izquierda',
        onClick: function() {
            localStorage.setItem("zona", 1);
            window.location.href = "diagnostico.html";
        }
    },            
    {
        text: 'Superior Derecha',
        onClick: function() {
            localStorage.setItem("zona", 2);
            window.location.href = "diagnostico.html";
        }
    }, 
    {
        text: 'Inferior Izquierda',
        onClick: function() {
            localStorage.setItem("zona", 3);
            window.location.href = "diagnostico.html";
        }
    }, 
    {
        text: 'Inferior Derecha',
        onClick: function() {
            localStorage.setItem("zona", 4);
            window.location.href = "diagnostico.html";
        }
    }, 
];
$(".zonas").click(function(){
    application.actions(this, buttons);
});
app.controller('pacienteController', function($scope, $http){
    $scope.paciente = JSON.parse(localStorage.getItem("paciente"));
    $scope.pacientes = JSON.parse(localStorage.getItem("pacientes_guardados"));
    
    // ------------------ Tomando la foto ----------------------------------------------
    //var URI = "";//va a ser global....es la uri de la foto que se toma con la camara...esta en base_64
    var URI = "img/dientes.jpg";//va a ser global....es la uri de la foto que se toma con la camara...esta en base_64
    var URI_PAN1 = "img/dientes.jpg";
    var URI_PAN2 = "img/dientes.jpg";
    
    $scope.hacerFoto = function(){
    //$scope.hacerFoto = function(action){
        /*if(action == 1){//Perfil
            navigator.camera.getPicture(tomarFoto, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
        }else if(action == 2){//Panoramica 1
            navigator.camera.getPicture(tomarPan1, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
        }else{//Panoramica 2
            navigator.camera.getPicture(tomarPan2, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
        }*/    
        navigator.camera.getPicture(tomarFoto, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
    }
    
    //Son de pruebas estos....... -------------------------
    $scope.panoramica_1 = function(){
        alert("panoramica 1")
        navigator.camera.getPicture(tomarPan1, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
    }

    $scope.panoramica_2 = function(){
        alert("panoramica 2")
        navigator.camera.getPicture(tomarPan2, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
    }
    //Pruebas FIN -----------------------------------------
    
    //Tomar Foto de Perfil
    function tomarFoto(imageURI){//Manda como parametro la foto en base_64....
        var image = document.getElementById('perfil');
        URI = "data:image/png;base64," + imageURI;
        image.src = URI;
    }
    //Tomar foto panoramica 1
    function tomarPan1(imageURI) {
        alert("imageUri en 1 "+imageURI)
        var panoramica = document.getElementById('panoramicaI');
        URI_PAN1 = "data:image/png;base64," + imageURI;
        panoramica.src = URI_PAN1;
    }
    //tomar foto panoramica 2
    function tomarPan2(imageURI) {
        alert("imageUri en 2 "+imageURI)
        var panoramica = document.getElementById('panoramicaII');
        URI_PAN2 = "data:image/png;base64," + imageURI;
        panoramica.src = URI_PAN2;
    }
    function onFail(message) {
        alert('Falló a causa de: ' + message);
    }
    //Guardando Temporalmente las fotos panoramicas, tanto los nombres como los objetos....
    $scope.savePanoramicas = function(){
        alert("verificando en 1: "+URI_PAN1);
        alert("verificando en 2: "+URI_PAN2);
        
        alert("mi curp "+$scope.paciente.RCURP);
        var pacientes_guardados = [];
        if (localStorage.getItem("pacientes_guardados") != null){
            pacientes_guardados = JSON.parse(localStorage.getItem("pacientes_guardados"));
            for(i in pacientes_guardados) {
                if(pacientes_guardados[i].RCURP == $scope.paciente.RCURP){
                    alert("Coincide la curp")
                    pacientes_guardados[i].RPA1TEMP = URI_PAN1;    
                    pacientes_guardados[i].RPA2TEMP = URI_PAN2;
                    pacientes_guardados[i].RPA1 = "panoramica1.png";
                    pacientes_guardados[i].RPA2 = "panoramica2.png";
                }
            }
            localStorage.setItem("pacientes_guardados", JSON.stringify(pacientes_guardados));
            localStorage.setItem("paciente", JSON.stringify($scope.pacienteN));
            alert("tiene sesiones ==> "+pacientes_guardados.length);
            application.addNotification({
                message: 'Información de las panoramicas guardadas',
                button: {
                    text: 'Cerrar',
                    color: 'lightgreen'
                }
            });
        }else{
            application.addNotification({
                message: 'No se pudo guardar la Información de las panoramicas',
                button: {
                    text: 'Cerrar',
                    color: 'red'
                }
            });
        }
        //---------------------------------------
        /*$scope.paciente.RPA1TEMP = URI_PAN1;    
        $scope.paciente.RPA2TEMP = URI_PAN2;
        $scope.paciente.RPA1 = "panoramica1.png";
        $scope.paciente.RPA2 = "panoramica2.png";
        application.addNotification({
                message: 'Información guardada',
                button: {
                    text: 'Cerrar',
                    color: 'lightgreen'
                }
            });*/
    }
    //--------------------- Tomando la foto y guardando fotos local ------------------------------------------------
    
    /* Cambie esta parte para que guarde la información en el telefono sin enviarla al servidor */
    $scope.nuevoPaciente = function(){
        //$scope.pacienteN.RSEX = $("#genero").val();
        /*if($scope.pacienteN.RCURP.length > 18 || $scope.pacienteN.RCURP.length < 18){
            application.addNotification({
                message: 'Es necesario ingresar los 18 caracteres del CURP',
                button: {
                    text: 'Cerrar',
                    color: 'lightgreen'
                }
            });
            return;
        }*/
        var regex = "[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" +
        "(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
        "[HM]{1}" +
        "(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
        "[B-DF-HJ-NP-TV-Z]{3}" +
        "[0-9A-Z]{1}[0-9]{1}$";
        var validCURP = $scope.pacienteN.RCURP.match(regex);
        if(validCURP == null){
            application.addNotification({
                message: 'Ingrese una CURP válida',
                button: {
                    text: 'Cerrar',
                    color: 'lightgreen'
                }
            });
            return;
        }
        
        $scope.pacienteN.RSEX = validCURP[0][10];
        var fecha = ''+validCURP[0][8]+validCURP[0][9]+"/"+validCURP[0][6]+validCURP[0][7]+"/19"+validCURP[0][4]+validCURP[0][5];
        $scope.pacienteN.RFEN = fecha;
        var curp = $scope.pacienteN.RCURP;
        $scope.pacienteN.RCURP = curp.toUpperCase();
        
        $scope.pacienteN.RFEC = get_today();
        //------------------ Foto de Perfil----------------------------------
        //agregando la uri al objeto paciente .... TEMPORAL
        $scope.pacienteN.RLOGTEMP = URI;
        //Foto del perfil del paciente en nulo
        $scope.pacienteN.RLOG = "perfil.png";
        //--------------- FIN Foto del perfil -----------------------------------
        //--------------- Fotos Panoramicas -----------------------------------
        
        //Fotos panoramicas de la boca del paciente 1 y 2***************************** NUEVO ************
        //agregando la uri al objeto de las panoramicas .... TEMPORAL
        $scope.pacienteN.RPA1TEMP = "";
        $scope.pacienteN.RPA2TEMP = "";
        $scope.pacienteN.RPA1 = "";
        $scope.pacienteN.RPA2 = "";
        //--------------- FIN Fotos Panoramicas -----------------------------------
        
        var pacientes_guardados = []
        if (localStorage.getItem("pacientes_guardados") == null) 
            localStorage.setItem("pacientes_guardados", JSON.stringify(pacientes_guardados));
        pacientes_guardados = JSON.parse(localStorage.getItem("pacientes_guardados"));
        //localStorage.removeItem("pacientes_guardados")
        pacientes_guardados[pacientes_guardados.length] = $scope.pacienteN;
            
        localStorage.setItem("pacientes_guardados", JSON.stringify(pacientes_guardados));
        localStorage.setItem("paciente", JSON.stringify($scope.pacienteN));
        window.location.href = "vistas/info.html";
    }
    //listarPacientes();
    function listarPacientes(){
       $http.get(urlServidor+"paciente/listarPacientes").success(function(response) {
            if(response.status) { // Si nos devuelve un OK la API...
                //alert("data "+response.data)
                $scope.pacientes = response.data;
            }
        })
    }
    /* Esta es la función que envia la información al servidor */
    $scope.Save = function(){
      $("#cargando").css("display", "block");
      // Guardar usuarios registrados
      if(localStorage.getItem("pacientes_guardados") != null){
        var pacientes_guardados = JSON.parse(localStorage.getItem("pacientes_guardados"));
        //primero guardamos las fotos del perfil de los paciente************************************
        for(i in pacientes_guardados) {
            $http.post(urlServidor+"guardarPerfil", pacientes_guardados[i]).success(function(respuesta) {
            //$http.post(urlServidor+"paciente/nuevoPaciente", pacientes_guardados[i]).success(function(respuesta) {
                if(respuesta.status){
                    console.log("se guardo la imagen");
                }
            });
        }
        //Fin guardar fotos del perfil del paciente **********************************************
        for(i in pacientes_guardados) {
          $http.post(urlServidor+"paciente/nuevoPaciente", pacientes_guardados[i]).success(function(respuesta) {
            if(respuesta.status){
            }
          });
        }
      }
      if(localStorage.getItem("sesiones_guardadas") != null){
        var sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));
        for(i in sesiones_guardadas) {
          $http.post(urlServidor+"info/nuevaInformacion", sesiones_guardadas[i]).success(function(respuesta) {
            if(respuesta.status){
            }
          }).error(function(e){alert(JSON.stringify(e))})
        }
      }
      localStorage.removeItem("pacientes_guardados");
      localStorage.removeItem("sesiones_guardadas");
      $("#save").css("display", "none");
      $("#cargando").css("display", "none");
      application.addNotification({
                message: 'Información guardada',
                button: {
                    text: 'Cerrar',
                    color: 'lightgreen'
                }
            });
    }
    // Redirigir a alguna pagina
    $scope.go = function(url){
        window.location.href = url;
    }
    // Redirigir a alguna pagina
    /*$scope.editar = function(zona){
        localStorage.setItem("zona", zona);
        window.location.href = "diagnostico.html";
    }*/
    function get_today(){
        // Obtenemos la fecha de hoy con el formato dd/mm/yyyy
        var today = new Date()
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var today = dd+'/'+mm+'/'+yyyy;
        //alert(today);
        return today;
    }
    $scope.verRegistros = function(id){
        alert("ID "+id);
        //Aqui ya puedes jalar los datos del json que se guardo para mostrarlos...y volver a editar....
        // C R E O..
    }
    $scope.change = function(paciente){
        var p = {
            RCURP: paciente.RCURP,
            RNOM: paciente.RNOM,
            RAPP: paciente.RAPP,
            RAPM: paciente.RAPM,
            RFEN: paciente.RFEN,
            RSEX: paciente.RSEX,
            RFEC: paciente.RFEC
        }
        localStorage.setItem("paciente", JSON.stringify(p));
        window.location.href = "vistas/info.html";
    }
});
