var app = angular.module('MainApp', []);
var urlServidor = 'http://192.168.1.103:3000/';
var application = new Framework7({
	material: true,
	materialRipple: true
});
$$ = Dom7;
app.controller('mainController', function($scope, $http){
	var isSave = true;
	var movimientos = [], posiciones = [];
	var SI, SD, II, ID;

	var color = "";
	var datos = JSON.parse(localStorage.getItem('paciente'));
	$scope.paciente = JSON.parse(localStorage.getItem('paciente'));

	// Creamos JSON con la informacion
	var info = {
		//idPaciente: datos._id,//Este es nuevo
		//posicion: 1,//izquierdo superior
		caries: 0,
		obturacion: 0
	}
	var infoDientesSI = {
		uno: {
			//oclusal: jQuery.extend(true, {}, info),
			ausente: 0,
			restos: 0,
			protesis_fija: 0,
			protesis_movil : 0,
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		dos: {
			ausente: 0,
			restos: 0,
			protesis_fija: 0,
			protesis_movil : 0,
			//oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		tres: {
			ausente: 0,
			restos: 0,
			protesis_fija: 0,
			protesis_movil : 0,
			//oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		cuatro: {
			ausente: 0,
			restos: 0,
			protesis_fija: 0,
			protesis_movil : 0,
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		cinco: {
			ausente: 0,
			restos: 0,
			protesis_fija: 0,
			protesis_movil : 0,
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		seis: {
			ausente: 0,
			restos: 0,
			protesis_fija: 0,
			protesis_movil : 0,
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		siete: {
			ausente: 0,
			restos: 0,
			protesis_fija: 0,
			protesis_movil : 0,
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		},
		ocho: {
			ausente: 0,
			restos: 0,
			protesis_fija: 0,
			protesis_movil : 0,
			oclusal: jQuery.extend(true, {}, info),
			mesial:  jQuery.extend(true, {}, info),
			distal: jQuery.extend(true, {}, info),
			lengual: jQuery.extend(true, {}, info),
			vestibular: jQuery.extend(true, {}, info)
		}
	}
	var infoDientesSD = jQuery.extend(true, {}, infoDientesSI);
	var infoDientesII = jQuery.extend(true, {}, infoDientesSI);
	var infoDientesID = jQuery.extend(true, {}, infoDientesSI);
	
	function createBorder(extension)
	{
		var structure_general = new createjs.Container();
		var rect = new createjs.Shape();
		rect.graphics.beginStroke("teal");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(0, 0, 1, 180 + extension);
		structure_general.addChild(rect);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("teal");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(210, 0, 0.5, 180 + extension);
		structure_general.addChild(rect);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("teal");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		rect.graphics.beginFill("white").drawRect(430, 0, 0.5, 180 + extension);
		structure_general.addChild(rect);

		return structure_general;
	}

	function createDental(name, originx, originy, muelas, datos)
	{

		// Estructura general que contendra un diente
		var structure_general = new createjs.Container();
		structure_general.name = "diente-"+name;

		var color = "white";
		var zon;
		switch(name)
		{
			case "Diente 1": zon = datos.uno;
			break;
			case "Diente 2": zon = datos.dos;
			break;
			case "Colmillo": zon = datos.tres;
			break;
			case "Premolar 1": zon = datos.cuatro;
			break;
			case "Premolar 2": zon = datos.cinco;
			break;
			case "Molar 1": zon = datos.seis;
			break;
			case "Molar 2": zon = datos.siete;
			break;
			case "Molar 3": zon = datos.ocho;
			break;
		}
		
		var text = new createjs.Text(name, "bold 10px Verdana", "teal");
		text.textAlign = "center";
		text.x = 50 + originx;
		text.y = 10 + originy;
		structure_general.addChild(text);
		
		var circle = new createjs.Shape();
		circle.graphics.beginStroke("#111");
		circle.graphics.setStrokeStyle(1);
		circle.snapToPixel = true;
		color = (zon.ausente == 1) ? "black" : color;
		color = (zon.restos == 1) ? "brown" : color;
		color = (zon.protesis_fija == 1) ? "orange" : color;
		color = (zon.protesis_movil == 1) ? "green" : color;
		circle.graphics.beginFill(color).drawCircle(0, 0, 28);
		circle.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
		        {
					text: 'Protesis fija',
					bg: 'orange',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": datos.uno.ausente = 1;datos.uno.protesis_fija = 1;datos.uno.protesis_movil = 0;
							break;
							case "Diente 2": datos.dos.ausente = 1;datos.dos.protesis_fija = 1;datos.dos.protesis_movil = 0;
							break;
							case "Colmillo": datos.tres.ausente = 1;datos.tres.protesis_fija = 1;datos.tres.protesis_movil = 0;
							break;
							case "Premolar 1": datos.cuatro.ausente = 1;datos.cuatro.protesis_fija = 1;datos.cuatro.protesis_movil = 0;
							break;
							case "Premolar 2": datos.cinco.ausente = 1;datos.cinco.protesis_fija = 1;datos.cinco.protesis_movil = 0;
							break;
							case "Molar 1": datos.seis.ausente = 1;datos.seis.protesis_fija = 1;datos.seis.protesis_movil = 0;
							break;
							case "Molar 2": datos.siete.ausente = 1;datos.siete.protesis_fija = 1;datos.siete.protesis_movil = 0;
							break;
							case "Molar 3": datos.ocho.ausente = 1;datos.ocho.protesis_fija = 1;datos.ocho.protesis_movil = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = muelas;
   						target.graphics.clear().beginFill("orange").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Protesis móvil',
					bg: 'green',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": datos.uno.ausente = 1;datos.uno.protesis_movil = 1;datos.uno.protesis_fija = 0;
							break;
							case "Diente 2": datos.dos.ausente = 1;datos.dos.protesis_movil = 1;datos.dos.protesis_fija = 0;
							break;
							case "Colmillo": datos.tres.ausente = 1;datos.tres.protesis_movil = 1;datos.tres.protesis_fija = 0;
							break;
							case "Premolar 1": datos.cuatro.ausente = 1;datos.cuatro.protesis_movil = 1;datos.cuatro.protesis_fija = 0;
							break;
							case "Premolar 2": datos.cinco.ausente = 1;datos.cinco.protesis_movil = 1;datos.cinco.protesis_fija = 0;
							break;
							case "Molar 1": datos.seis.ausente = 1;datos.seis.protesis_movil = 1;datos.seis.protesis_fija = 0;
							break;
							case "Molar 2": datos.siete.ausente = 1;datos.siete.protesis_movil = 1;datos.siete.protesis_fija = 0;
							break;
							case "Molar 3": datos.ocho.ausente = 1;datos.ocho.protesis_movil = 1;datos.ocho.protesis_fija = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = muelas;
   						target.graphics.clear().beginFill("green").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Ausentes',
					bg: 'black',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": datos.uno.ausente = 1;datos.uno.restos = 0;
							break;
							case "Diente 2": datos.dos.ausente = 1;datos.dos.restos = 0;
							break;
							case "Colmillo": datos.tres.ausente = 1;datos.tres.restos = 0;
							break;
							case "Premolar 1": datos.cuatro.ausente = 1;datos.cuatro.restos = 0;
							break;
							case "Premolar 2": datos.cinco.ausente = 1;datos.cinco.restos = 0;
							break;
							case "Molar 1": datos.seis.ausente = 1;datos.seis.restos = 0;
							break;
							case "Molar 2": datos.siete.ausente = 1;datos.siete.restos = 0;
							break;
							case "Molar 3": datos.ocho.ausente = 1;datos.ocho.restos = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = muelas;
   						target.graphics.clear().beginFill("black").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Restos',
					bg: 'brown',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": datos.uno.restos = 1;datos.uno.ausente = 0;
							break;
							case "Diente 2": datos.dos.restos = 1;datos.dos.ausente = 0;
							break;
							case "Colmillo": datos.tres.restos = 1;datos.tres.ausente = 0;
							break;
							case "Premolar 1": datos.cuatro.restos = 1;datos.cuatro.ausente = 0;
							break;
							case "Premolar 2": datos.cinco.restos = 1;datos.cinco.ausente = 0;
							break;
							case "Molar 1": datos.seis.restos = 1;datos.seis.ausente = 0;
							break;
							case "Molar 2": datos.siete.restos = 1;datos.siete.ausente = 0;
							break;
							case "Molar 3": datos.ocho.restos = 1;datos.ocho.ausente = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = muelas;
   						target.graphics.clear().beginFill("brown").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});

		var dragger = new createjs.Container();
		dragger.x = 50 + originx;
		dragger.y = 80 + originy;
		dragger.addChild(circle);
		
		structure_general.addChild(dragger);
		return structure_general;
	}
		
	function init(callback) {

		SI = new createjs.Stage("SI");
		createjs.Touch.enable(SI)
		var structure_general = createDental("Diente 1", 0, 0, SI, infoDientesSI);
		SI.addChild(structure_general);
		var structure_general = createDental("Diente 2", 80, 0, SI, infoDientesSI);
		SI.addChild(structure_general);
		var structure_general = createDental("Colmillo", 160, 0, SI, infoDientesSI);
		SI.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 240, 0, SI, infoDientesSI);
		SI.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 320, 0, SI, infoDientesSI);
		SI.addChild(structure_general);
		var structure_general = createDental("Molar 1", 400, 0, SI, infoDientesSI);
		SI.addChild(structure_general);
		var structure_general = createDental("Molar 2", 480, 0, SI, infoDientesSI);
		SI.addChild(structure_general);
		var structure_general = createDental("Molar 3", 560, 0, SI, infoDientesSI);
		SI.addChild(structure_general);

		SI.update();

		SD = new createjs.Stage("SD");
		createjs.Touch.enable(SD)
		var structure_general = createDental("Diente 1", 0, 0, SD, infoDientesSD);
		SD.addChild(structure_general);
		var structure_general = createDental("Diente 2", 80, 0, SD, infoDientesSD);
		SD.addChild(structure_general);
		var structure_general = createDental("Colmillo", 160, 0, SD, infoDientesSD);
		SD.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 240, 0, SD, infoDientesSD);
		SD.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 320, 0, SD, infoDientesSD);
		SD.addChild(structure_general);
		var structure_general = createDental("Molar 1", 400, 0, SD, infoDientesSD);
		SD.addChild(structure_general);
		var structure_general = createDental("Molar 2", 480, 0, SD, infoDientesSD);
		SD.addChild(structure_general);
		var structure_general = createDental("Molar 3", 560, 0, SD, infoDientesSD);
		SD.addChild(structure_general);

		SD.update();

		II = new createjs.Stage("II");
		createjs.Touch.enable(II)
		var structure_general = createDental("Diente 1", 0, 0, II, infoDientesII);
		II.addChild(structure_general);
		var structure_general = createDental("Diente 2", 80, 0, II, infoDientesII);
		II.addChild(structure_general);
		var structure_general = createDental("Colmillo", 160, 0, II, infoDientesII);
		II.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 240, 0, II, infoDientesII);
		II.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 320, 0, II, infoDientesII);
		II.addChild(structure_general);
		var structure_general = createDental("Molar 1", 400, 0, II, infoDientesII);
		II.addChild(structure_general);
		var structure_general = createDental("Molar 2", 480, 0, II, infoDientesII);
		II.addChild(structure_general);
		var structure_general = createDental("Molar 3", 560, 0, II, infoDientesII);
		II.addChild(structure_general);

		II.update();

		ID = new createjs.Stage("ID");
		createjs.Touch.enable(ID)
		var structure_general = createDental("Diente 1", 0, 0, ID, infoDientesID);
		ID.addChild(structure_general);
		var structure_general = createDental("Diente 2", 80, 0, ID, infoDientesID);
		ID.addChild(structure_general);
		var structure_general = createDental("Colmillo", 160, 0, ID, infoDientesID);
		ID.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 240, 0, ID, infoDientesID);
		ID.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 320, 0, ID, infoDientesID);
		ID.addChild(structure_general);
		var structure_general = createDental("Molar 1", 400, 0, ID, infoDientesID);
		ID.addChild(structure_general);
		var structure_general = createDental("Molar 2", 480, 0, ID, infoDientesID);
		ID.addChild(structure_general);
		var structure_general = createDental("Molar 3", 560, 0, ID, infoDientesID);
		ID.addChild(structure_general);
		ID.update();

		/*menu = new createjs.Stage("menu");
		var structure_general = createMenu();
		menu.addChild(structure_general);

		menu.update();*/
		callback();
		/*dragger.on("pressmove",function(evt) {
			// currentTarget will be the container that the event listener was added to:
			evt.currentTarget.x = evt.stageX;
			evt.currentTarget.y = evt.stageY;
			// make sure to redraw the stage to show the change:
			stage.update();   
		});*/
	}

	function get(callback) {
		/*$http.get(urlServidor+"info/getInformacion/"+$scope.paciente._id+"/"+zona).success(function(response){
			if(response.status){
				if(response.data != null)
					infoDientes = response.data;
				else{
					var sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));
					for(i in sesiones_guardadas) {
						if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == localStorage.getItem("zona")){
							infoDientes = sesiones_guardadas[i];
							//alert(JSON.stringify(infoDientes));
						}
					}
				}
				callback();
			}
		}).error(function(e){
			var sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));
			for(i in sesiones_guardadas) {
				if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == localStorage.getItem("zona")){
					infoDientes = sesiones_guardadas[i];
				}
			}
			callback();
		})*/
		var sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));
		for(i in sesiones_guardadas) {
			if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == 1){
				infoDientesSI = sesiones_guardadas[i];
				break;
			}
		}
		for(i in sesiones_guardadas) {
			if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == 2){
				infoDientesSD = sesiones_guardadas[i];
				break;
			}
		}
		for(i in sesiones_guardadas) {
			if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == 3){
				infoDientesII = sesiones_guardadas[i];
				break;
			}
		}
		for(i in sesiones_guardadas) {
			if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == 4){
				infoDientesID = sesiones_guardadas[i];
				break;
			}
		}
		callback();
	}

	function load() {
		var uno = infoDientes.uno;
		fillPoints(uno, muelas);
		var dos = infoDientes.dos;
		fillPoints(dos, muelas);
		var tres = infoDientes.tres;
		fillPoints(tres, muelas);
		var cuatro = infoDientes.cuatro;
		fillPoints(cuatro, muelas);
		var cinco = infoDientes.cinco;
		fillPoints(cinco, muelas);
		var seis = infoDientes.seis;
		fillPoints(seis, muelas);
		var siete = infoDientes.siete;
		fillPoints(siete, muelas);
		var ocho = infoDientes.uno;
		fillPoints(ocho, muelas);
	}

	$scope.Undo = function() {
		if(movimientos.length == 0)
			return;
		var last = movimientos.pop();
		var muelas = posiciones.pop();
		last.graphics.clear().beginStroke("#111");
		last.graphics.setStrokeStyle(1);
		last.snapToPixel = true;
		last.graphics.beginFill("white").drawCircle(0, 0, 28).endFill();
		muelas.update();
		
	}

	function putPoint(pos, zone) {
		var pp = pos.split("-");
		var x = parseFloat(pp[0]);
		var y = parseFloat(pp[1]);
		var point = new createjs.Shape();
		point.graphics.beginStroke("#fff");
		point.graphics.setStrokeStyle(1);
		point.snapToPixel = true;
		point.graphics.beginFill("white").drawCircle(x, y, 5);
		zone.addChild(point);
		zone.update();
	}

	$scope.go = function(url){
		if(!isSave)
		{
			var r = confirm("¿Guardar los cambios?");
			if (r == true) {
			    $scope.Save();
			    window.location.href = url;
			} else {
			    window.location.href = url;
			}
		}else{
			window.location.href = url;
		}
	}
	$(document).ready(function(){
		
		get(function(){
			init(function(){

			});	
		});
			
	});

	$scope.Save = function()
	{
		var sesiones_guardadas = []
		if (localStorage.getItem("sesiones_guardadas") == null) 
			localStorage.setItem("sesiones_guardadas", JSON.stringify(sesiones_guardadas));

		sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));
		/* Guardamos los datos de la zona superior izquierda */
		var pos = sesiones_guardadas.length;
		for(i in sesiones_guardadas) {
			if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == 1){
				pos = i;
				break;
			}
		}

		infoDientesSI.idPaciente = datos.RCURP;
		infoDientesSI.posicion = 1;
		var canvas = document.getElementById("SI");
		infoDientesSI.urlFile = canvas.toDataURL();
		
		sesiones_guardadas[pos] = infoDientesSI;
		/* Guardamos los datos de la zona superior derecha */
		var pos = sesiones_guardadas.length;
		for(i in sesiones_guardadas) {
			if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == 2){
				pos = i;
				break;
			}
		}

		infoDientesSD.idPaciente = datos.RCURP;
		infoDientesSD.posicion = 2;
		var canvas = document.getElementById("SD");
		infoDientesSD.urlFile = canvas.toDataURL();
		
		sesiones_guardadas[pos] = infoDientesSD;
		/* Guardamos los datos de la zona inferior izquierda */
		var pos = sesiones_guardadas.length;
		for(i in sesiones_guardadas) {
			if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == 3){
				pos = i;
				break;
			}
		}

		infoDientesII.idPaciente = datos.RCURP;
		infoDientesII.posicion = 3;
		var canvas = document.getElementById("II");
		infoDientesII.urlFile = canvas.toDataURL();
		
		sesiones_guardadas[pos] = infoDientesII;
		/* Guardamos los datos de la zona inferior derecha */
		var pos = sesiones_guardadas.length;
		for(i in sesiones_guardadas) {
			if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == 4){
				pos = i;
				break;
			}
		}

		infoDientesID.idPaciente = datos.RCURP;
		infoDientesID.posicion = 4;
		var canvas = document.getElementById("ID");
		infoDientesID.urlFile = canvas.toDataURL();
		
		sesiones_guardadas[pos] = infoDientesID;
			
		localStorage.setItem("sesiones_guardadas", JSON.stringify(sesiones_guardadas));
		application.addNotification({
        		message: 'Información guardada',
		        button: {
		            text: 'Cerrar',
		            color: 'lightgreen'
		        }
    		});
	}
});