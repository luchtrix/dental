var app = angular.module('MainApp', []);
var urlServidor = 'http://159.203.128.165:3000/';
var application = new Framework7({
	material: true,
	materialRipple: true
});
$$ = Dom7;
app.controller('mainController', function($scope, $http){
	var isSave = true;
	var movimientos = [], posiciones = [];
	var dientes, colmillos, muelas, extras, menu, output;
	var color = "";
	var datos = JSON.parse(localStorage.getItem('paciente'));
	$scope.paciente = JSON.parse(localStorage.getItem('paciente'));

	var zona = parseInt(localStorage.getItem("zona"));
	$scope.zona_revision = '';
	switch(zona){
		case 1: $scope.zona_revision = "ZONA SUPERIOR IZQUIERDA";
		break;
		case 2: $scope.zona_revision = "ZONA SUPERIOR DERECHA";
		break;
		case 3: $scope.zona_revision = "ZONA INFERIOR IZQUIERDA";
		break;
		case 4: $scope.zona_revision = "ZONA INFERIOR DERECHA";
		break;
	}
	// Creamos JSON con la informacion
	var info = {
		//idPaciente: datos._id,//Este es nuevo
		//posicion: 1,//izquierdo superior
		caries: 0,
		obturacion: 0
	}
	var infoDientes = {
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
	function createDental(name, originx, originy, withOclusal)
	{
		// Estructura general que contendra un diente
		var structure_general = new createjs.Container();
		structure_general.name = "diente-"+name;
		var zon;
		var color = "white";
		var isZone = false;
		if(infoDientes.posicion !== null){
			if(infoDientes.posicion == zona){
				isZone = true;
			}
		}
		switch(name)
		{
			case "Diente 1": zon = infoDientes.uno;
			break;
			case "Diente 2": zon = infoDientes.dos;
			break;
			case "Colmillo": zon = infoDientes.tres;
			break;
			case "Premolar 1": zon = infoDientes.cuatro;
			break;
			case "Premolar 2": zon = infoDientes.cinco;
			break;
			case "Molar 1": zon = infoDientes.seis;
			break;
			case "Molar 2": zon = infoDientes.siete;
			break;
			case "Molar 3": zon = infoDientes.ocho;
			break;
		}
		
		var text = new createjs.Text(name, "bold 14px Verdana", "teal");
		text.textAlign = "center";
		text.x = 100 + originx;
		text.y = 10 + originy;
		structure_general.addChild(text);

		if(zon.protesis_movil == 1) {
			var circle = new createjs.Shape();
			circle.graphics.beginStroke("#111");
			circle.graphics.setStrokeStyle(1);
			circle.snapToPixel = true;
			circle.graphics.beginFill("green").drawCircle(0, 0, 60);
			var label = new createjs.Text("Prótesis móvil", "bold 14px Arial", "#FFF");
			label.textAlign = "center";
			label.y = 0;
			label.x = 00;

			var dragger = new createjs.Container();
			dragger.x = 100 + originx;
			dragger.y = 100 + originy;
			dragger.addChild(circle, label);
			
			structure_general.addChild(dragger);
			return structure_general;
		}

		if(zon.protesis_fija == 1) {
			var circle = new createjs.Shape();
			circle.graphics.beginStroke("#111");
			circle.graphics.setStrokeStyle(1);
			circle.snapToPixel = true;
			circle.graphics.beginFill("orange").drawCircle(0, 0, 60);
			var label = new createjs.Text("Prótesis fija", "bold 14px Arial", "#FFF");
			label.textAlign = "center";
			label.y = 0;
			label.x = 00;

			var dragger = new createjs.Container();
			dragger.x = 100 + originx;
			dragger.y = 100 + originy;
			dragger.addChild(circle, label);
			
			structure_general.addChild(dragger);
			return structure_general;
		}
		if(zon.ausente == 1) {
			var circle = new createjs.Shape();
			circle.graphics.beginStroke("#111");
			circle.graphics.setStrokeStyle(1);
			circle.snapToPixel = true;
			circle.graphics.beginFill("black").drawCircle(0, 0, 60);
			var label = new createjs.Text("Ausente", "bold 14px Arial", "#FFF");
			label.textAlign = "center";
			label.y = 0;
			label.x = 00;

			var dragger = new createjs.Container();
			dragger.x = 100 + originx;
			dragger.y = 100 + originy;
			dragger.addChild(circle, label);
			
			structure_general.addChild(dragger);
			return structure_general;
		}

		if(zon.restos == 1) {
			var circle = new createjs.Shape();
			circle.graphics.beginStroke("#111");
			circle.graphics.setStrokeStyle(1);
			circle.snapToPixel = true;
			circle.graphics.beginFill("brown").drawCircle(0, 0, 60);
			var label = new createjs.Text("Restos", "bold 14px Arial", "#FFF");
			label.textAlign = "center";
			label.y = 0;
			label.x = 00;

			var dragger = new createjs.Container();
			dragger.x = 100 + originx;
			dragger.y = 100 + originy;
			dragger.addChild(circle, label);
			
			structure_general.addChild(dragger);
			return structure_general;
		}

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("#111");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		/*color = (zon.mesial.caries == 1) ? "red" : color;
		color = (zon.mesial.obturacion == 1) ? "blue" : color;
		color = (isZone) ? color : "white";*/
		rect.graphics.beginFill(color).drawRect(0, 0, 60, 90);
		rect.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.mesial.caries = 1;infoDientes.uno.mesial.obturacion = 0;
							break;
							case "Diente 2": infoDientes.dos.mesial.caries = 1;infoDientes.dos.mesial.obturacion = 0;
							break;
							case "Colmillo": infoDientes.tres.mesial.caries = 1;infoDientes.tres.mesial.obturacion = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.mesial.caries = 1;infoDientes.cuatro.mesial.obturacion = 0;
							break;
							case "Premolar 2": infoDientes.cinco.mesial.caries = 1;infoDientes.cinco.mesial.obturacion = 0;
							break;
							case "Molar 1": infoDientes.seis.mesial.caries = 1;infoDientes.seis.mesial.obturacion = 0;
							break;
							case "Molar 2": infoDientes.siete.mesial.caries = 1;infoDientes.siete.mesial.obturacion = 0;
							break;
							case "Molar 3": infoDientes.ocho.mesial.caries = 1;infoDientes.ocho.mesial.obturacion = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("red").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.mesial.obturacion = 1;infoDientes.uno.mesial.caries = 0;
							break;
							case "Diente 2": infoDientes.dos.mesial.obturacion = 1;infoDientes.dos.mesial.caries = 0;
							break;
							case "Colmillo": infoDientes.tres.mesial.obturacion = 1;infoDientes.tres.mesial.caries = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.mesial.obturacion = 1;infoDientes.cuatro.mesial.caries = 0;
							break;
							case "Premolar 2": infoDientes.cinco.mesial.obturacion = 1;infoDientes.cinco.mesial.caries = 0;
							break;
							case "Molar 1": infoDientes.seis.mesial.obturacion = 1;infoDientes.seis.mesial.caries = 0;
							break;
							case "Molar 2": infoDientes.siete.mesial.obturacion = 1;infoDientes.siete.mesial.caries = 0;
							break;
							case "Molar 3": infoDientes.ocho.mesial.obturacion = 1;infoDientes.ocho.mesial.caries = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 1;
   						target.graphics.clear().beginFill("blue").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});
		
		var label = new createjs.Text("Mesial", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = 45;
		label.x = 20;

		var dragger = new createjs.Container();
		dragger.x = 25 + originx;
		dragger.y = 45 + originy;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("#111");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		color = "white";
		/*color = (zon.distal.caries == 1) ? "red" : color;
		color = (zon.distal.obturacion == 1) ? "blue" : color;
		color = (isZone) ? color : "white";*/
		
		rect.graphics.beginFill(color).drawRect(0, 0, 60, 90);
		rect.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.distal.caries = 1;infoDientes.uno.distal.obturacion = 0;
							break;
							case "Diente 2": infoDientes.dos.distal.caries = 1;infoDientes.dos.distal.obturacion = 0;
							break;
							case "Colmillo": infoDientes.tres.distal.caries = 1;infoDientes.tres.distal.obturacion = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.distal.caries = 1;infoDientes.cuatro.distal.obturacion = 0;
							break;
							case "Premolar 2": infoDientes.cinco.distal.caries = 1;infoDientes.cinco.distal.obturacion = 0;
							break;
							case "Molar 1": infoDientes.seis.distal.caries = 1;infoDientes.seis.distal.obturacion = 0;
							break;
							case "Molar 2": infoDientes.siete.distal.caries = 1;infoDientes.siete.distal.obturacion = 0;
							break;
							case "Molar 3": infoDientes.ocho.distal.caries = 1;infoDientes.ocho.distal.obturacion = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 2;
   						target.graphics.clear().beginFill("red").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.distal.obturacion = 1;infoDientes.uno.distal.caries = 0;
							break;
							case "Diente 2": infoDientes.dos.distal.obturacion = 1;infoDientes.dos.distal.caries = 0;
							break;
							case "Colmillo": infoDientes.tres.distal.obturacion = 1;infoDientes.tres.distal.caries = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.distal.obturacion = 1;infoDientes.cuatro.distal.caries = 0;
							break;
							case "Premolar 2": infoDientes.cinco.distal.obturacion = 1;infoDientes.cinco.distal.caries = 0;
							break;
							case "Molar 1": infoDientes.seis.distal.obturacion = 1;infoDientes.seis.distal.caries = 0;
							break;
							case "Molar 2": infoDientes.siete.distal.obturacion = 1;infoDientes.siete.distal.caries = 0;
							break;
							case "Molar 3": infoDientes.ocho.distal.obturacion = 1;infoDientes.ocho.distal.caries = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 2;
   						target.graphics.clear().beginFill("blue").drawRect(0, 0, 60, 90).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});
		
		var label = new createjs.Text("Distal", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = 45;
		label.x = 40;

		var dragger = new createjs.Container();
		dragger.x = 115 + originx;
		dragger.y = 45 + originy;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("#111");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		/*color = "white";
		
		color = (zon.lengual.caries == 1) ? "red" : color;
		color = (zon.lengual.obturacion == 1) ? "blue" : color;
		color = (isZone) ? color : "white";*/
		
		rect.graphics.beginFill(color).drawRect(0, 0, 90, 50);
		rect.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.lengual.caries = 1;infoDientes.uno.lengual.obturacion = 0;
							break;
							case "Diente 2": infoDientes.dos.lengual.caries = 1;infoDientes.dos.lengual.obturacion = 0;
							break;
							case "Colmillo": infoDientes.tres.lengual.caries = 1;infoDientes.tres.lengual.obturacion = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.lengual.caries = 1;infoDientes.cuatro.lengual.obturacion = 0;
							break;
							case "Premolar 2": infoDientes.cinco.lengual.caries = 1;infoDientes.cinco.lengual.obturacion = 0;
							break;
							case "Molar 1": infoDientes.seis.lengual.caries = 1;infoDientes.seis.lengual.obturacion = 0;
							break;
							case "Molar 2": infoDientes.siete.lengual.caries = 1;infoDientes.siete.lengual.obturacion = 0;
							break;
							case "Molar 3": infoDientes.ocho.lengual.caries = 1;infoDientes.ocho.lengual.obturacion = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 3;
   						target.graphics.clear().beginFill("red").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.lengual.obturacion = 1;infoDientes.uno.lengual.caries = 0;
							break;
							case "Diente 2": infoDientes.dos.lengual.obturacion = 1;infoDientes.dos.lengual.caries = 0;
							break;
							case "Colmillo": infoDientes.tres.lengual.obturacion = 1;infoDientes.tres.lengual.caries = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.lengual.obturacion = 1;infoDientes.cuatro.lengual.caries = 0;
							break;
							case "Premolar 2": infoDientes.cinco.lengual.obturacion = 1;infoDientes.cinco.lengual.caries = 0;
							break;
							case "Molar 1": infoDientes.seis.lengual.obturacion = 1;infoDientes.seis.lengual.caries = 0;
							break;
							case "Molar 2": infoDientes.siete.lengual.obturacion = 1;infoDientes.siete.lengual.caries = 0;
							break;
							case "Molar 3": infoDientes.ocho.lengual.obturacion = 1;infoDientes.ocho.lengual.caries = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 3;
   						target.graphics.clear().beginFill("blue").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});
		
		var label = new createjs.Text("Lengual", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = 20;
		label.x = 42.5;

		var dragger = new createjs.Container();
		dragger.x = 55 + originx;
		dragger.y = 30 + originy;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);

		var rect = new createjs.Shape();
		rect.graphics.beginStroke("#111");
		rect.graphics.setStrokeStyle(1);
		rect.snapToPixel = true;
		/*color = "white";
		color = (zon.vestibular.caries == 1) ? "red" : color;
		color = (zon.vestibular.obturacion == 1) ? "blue" : color;
		color = (isZone) ? color : "white";*/
		
		rect.graphics.beginFill(color).drawRect(0, 0, 90, 50);
		rect.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.vestibular.caries = 1;infoDientes.uno.vestibular.obturacion = 0;
							break;
							case "Diente 2": infoDientes.dos.vestibular.caries = 1;infoDientes.dos.vestibular.obturacion = 0;
							break;
							case "Colmillo": infoDientes.tres.vestibular.caries = 1;infoDientes.tres.vestibular.obturacion = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.vestibular.caries = 1;infoDientes.cuatro.vestibular.obturacion = 0;
							break;
							case "Premolar 2": infoDientes.cinco.vestibular.caries = 1;infoDientes.cinco.vestibular.obturacion = 0;
							break;
							case "Molar 1": infoDientes.seis.vestibular.caries = 1;infoDientes.seis.vestibular.obturacion = 0;
							break;
							case "Molar 2": infoDientes.siete.vestibular.caries = 1;infoDientes.siete.vestibular.obturacion = 0;
							break;
							case "Molar 3": infoDientes.ocho.vestibular.caries = 1;infoDientes.ocho.vestibular.obturacion = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 4;
   						target.graphics.clear().beginFill("red").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.vestibular.obturacion = 1;infoDientes.uno.vestibular.caries = 0;
							break;
							case "Diente 2": infoDientes.dos.vestibular.obturacion = 1;infoDientes.dos.vestibular.caries = 0;
							break;
							case "Colmillo": infoDientes.tres.vestibular.obturacion = 1;infoDientes.tres.vestibular.caries = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.vestibular.obturacion = 1;infoDientes.cuatro.vestibular.caries = 0;
							break;
							case "Premolar 2": infoDientes.cinco.vestibular.obturacion = 1;infoDientes.cinco.vestibular.caries = 0;
							break;
							case "Molar 1": infoDientes.seis.vestibular.obturacion = 1;infoDientes.seis.vestibular.caries = 0;
							break;
							case "Molar 2": infoDientes.siete.vestibular.obturacion = 1;infoDientes.siete.vestibular.caries = 0;
							break;
							case "Molar 3": infoDientes.ocho.vestibular.obturacion = 1;infoDientes.ocho.vestibular.caries = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 4;
   						target.graphics.clear().beginFill("blue").drawRect(0, 0, 90, 50).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});
		
		var label = new createjs.Text("Vestibular", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = 20;
		label.x = 42.5;

		var dragger = new createjs.Container();
		dragger.x = 55 + originx;
		dragger.y = 120 + originy;
		dragger.addChild(rect, label);
		structure_general.addChild(dragger);
		
		var circle = new createjs.Shape();
		circle.graphics.beginStroke("#111");
		circle.graphics.setStrokeStyle(1);
		circle.snapToPixel = true;
		/*color = "white";
		if(zon.oclusal != null){
			color = (zon.oclusal.caries == 1) ? "red" : color;
			color = (zon.oclusal.obturacion == 1) ? "blue" : color;
			color = (isZone) ? color : "white";
		}	*/
		circle.graphics.beginFill(color).drawCircle(0, 0, 33);
		circle.addEventListener("click", function(event) { 
			var buttons = [
				{
		            text: 'Selecciona el problema',
		            label: true
		        },
				{
					text: 'Caries',
					bg: 'red',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.oclusal.caries = 1;infoDientes.uno.oclusal.obturacion = 0;
							break;
							case "Diente 2": infoDientes.dos.oclusal.caries = 1;infoDientes.dos.oclusal.obturacion = 0;
							break;
							case "Colmillo": infoDientes.tres.oclusal.caries = 1;infoDientes.tres.oclusal.obturacion = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.oclusal.caries = 1;infoDientes.cuatro.oclusal.obturacion = 0;
							break;
							case "Premolar 2": infoDientes.cinco.oclusal.caries = 1;infoDientes.cinco.oclusal.obturacion = 0;
							break;
							case "Molar 1": infoDientes.seis.oclusal.caries = 1;infoDientes.seis.oclusal.obturacion = 0;
							break;
							case "Molar 2": infoDientes.siete.oclusal.caries = 1;infoDientes.siete.oclusal.obturacion = 0;
							break;
							case "Molar 3": infoDientes.ocho.oclusal.caries = 1;infoDientes.ocho.oclusal.obturacion = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 5;
   						target.graphics.clear().beginFill("red").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
				{
					text: 'Obturación',
					bg: 'blue',
					color: 'white',
					onClick: function () {
						switch(name)
						{
							case "Diente 1": infoDientes.uno.oclusal.obturacion = 1;infoDientes.uno.oclusal.caries = 0;
							break;
							case "Diente 2": infoDientes.dos.oclusal.obturacion = 1;infoDientes.dos.oclusal.caries = 0;
							break;
							case "Colmillo": infoDientes.tres.oclusal.obturacion = 1;infoDientes.tres.oclusal.caries = 0;
							break;
							case "Premolar 1": infoDientes.cuatro.oclusal.obturacion = 1;infoDientes.cuatro.oclusal.caries = 0;
							break;
							case "Premolar 2": infoDientes.cinco.oclusal.obturacion = 1;infoDientes.cinco.oclusal.caries = 0;
							break;
							case "Molar 1": infoDientes.seis.oclusal.obturacion = 1;infoDientes.seis.oclusal.caries = 0;
							break;
							case "Molar 2": infoDientes.siete.oclusal.obturacion = 1;infoDientes.siete.oclusal.caries = 0;
							break;
							case "Molar 3": infoDientes.ocho.oclusal.obturacion = 1;infoDientes.ocho.oclusal.caries = 0;
							break;
						}
						var target = event.target;
						movimientos[movimientos.length] = target;
						posiciones[posiciones.length] = 5;
   						target.graphics.clear().beginFill("blue").drawCircle(0, 0, 33).endFill();
   						muelas.update();
					}
				},
			];
		    application.actions(buttons);
		});
	
		if(!withOclusal)
			return structure_general;

		var label = new createjs.Text("Oclusal", "bold 10px Arial", "#CD0000");
		label.textAlign = "center";
		label.y = -5;

		var dragger = new createjs.Container();
		dragger.x = 100 + originx;
		dragger.y = 100 + originy;
		dragger.addChild(circle, label);
		structure_general.addChild(dragger);

		return structure_general;
	}
		
	function init(callback) {
		muelas = new createjs.Stage("muelas");
		createjs.Touch.enable(muelas)
		var structure_general = createDental("Diente 1", 0, 0, false);
		muelas.addChild(structure_general);
		var structure_general = createDental("Diente 2", 180, 0, false);
		muelas.addChild(structure_general);
		var structure_general = createDental("Colmillo", 360, 0, false);
		muelas.addChild(structure_general);
		var structure_general = createDental("Premolar 1", 540, 0, true);
		muelas.addChild(structure_general);
		var structure_general = createDental("Premolar 2", 720, 0, true);
		muelas.addChild(structure_general);
		var structure_general = createDental("Molar 1", 900, 0, true);
		muelas.addChild(structure_general);
		var structure_general = createDental("Molar 2", 1080, 0, true);
		muelas.addChild(structure_general);
		var structure_general = createDental("Molar 3", 1260, 0, true);
		muelas.addChild(structure_general);
		//var structure_general = createBorder(180);
		//muelas.addChild(structure_general);

		muelas.update();

		callback();
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
							break;
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
					break;
				}
			}
			callback();
		})*/
		var sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));
			for(i in sesiones_guardadas) {
				if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == localStorage.getItem("zona")){
					infoDientes = sesiones_guardadas[i];
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

	function fillPoints(diente, position)
	{
		var posicion;
		for(i in diente) {
			/*for(j in diente[i]) {
				if(diente[i][j] != "0") {
					posicion = diente[i][j].split("-");
					var point = new createjs.Shape();
					var color = '';
					switch(j){
						case "caries": color = 'red';
						break;
						case "ausentes": color = '#000';
						break;
						case "restos": color = '#795548';
						break;
						case "protesis_fija": color = 'green';
						break;
						case "protesis_movil": color = '#ff5722';
						break;
						case "obturacion": color = 'blue';
						break;
					}
					point.graphics.beginFill(color).drawCircle(parseFloat(posicion[0]), parseFloat(posicion[1]), 5);
					position.addChild(point);
					position.update();
				}
			}*/
		}
	}

	$scope.Undo = function() {
		if(movimientos.length == 0)
			return;
		var last = movimientos.pop();
		var pos = posiciones.pop();
		last.graphics.clear().beginStroke("#111");
		last.graphics.setStrokeStyle(1);
		last.snapToPixel = true;
		switch(pos){
			case 1:
				last.graphics.beginFill("white").drawRect(0, 0, 60, 90).endFill();
			break;
			case 2:
				last.graphics.beginFill("white").drawRect(0, 0, 60, 90).endFill();
			break;
			case 3:
				last.graphics.beginFill("white").drawRect(0, 0, 90, 50).endFill();
			break;
			case 4:
				last.graphics.beginFill("white").drawRect(0, 0, 90, 50).endFill();
			break;
			case 5:
				last.graphics.beginFill("white").drawCircle(0, 0, 33).endFill();
			break;
		}
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

			})
		})
	});

	$scope.Save = function()
	{
		infoDientes.idPaciente = datos.RCURP;
		infoDientes.posicion = localStorage.getItem("zona");
		var canvas = document.getElementById("muelas");
		infoDientes.urlFile = canvas.toDataURL();
		var sesiones_guardadas = []
		if (localStorage.getItem("sesiones_guardadas") == null) 
			localStorage.setItem("sesiones_guardadas", JSON.stringify(sesiones_guardadas));

		sesiones_guardadas = JSON.parse(localStorage.getItem("sesiones_guardadas"));
		
		var pos = sesiones_guardadas.length;
		for(i in sesiones_guardadas) {
			if(sesiones_guardadas[i].idPaciente == datos.RCURP && sesiones_guardadas[i].posicion == localStorage.getItem("zona")){
				pos = i;
				break;
			}
		}

		sesiones_guardadas[pos] = infoDientes;
			
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