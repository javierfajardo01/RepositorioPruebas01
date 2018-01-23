 
sap.ui.define([	
	'aplication/default/assets/formatters/formatter',
	"aplication/default/assets/utiles/utiles",
	"aplication/default/model/comunEstructuraDatos",
	"aplication/default/model/comunOdataV2"
	
], function(Formatter, utiles, comunEstructuraDatos, comunOdataV2) {
	"use strict";

	var model = new Object();
	
	model.get = {	
			cargarTerritorios: function(oContext) {
				// cargamos la plantilla de la estructura de los datos
				var parametros= comunEstructuraDatos.parametros.estructuraParametros();
		
				parametros.entidades= {
						firstEntity :  "Territories"
				},	
				parametros.params = {
				        KeyValues : {
				        },
				        filters:{
				        	filtros : [
				        	],
				        	operator: ""
				        },
						expandEntities : [
						]		        
					};			
				comunOdataV2.actions.oDataRead(oContext, parametros, 'listadoTerritorios');
			},
			
			empleadosPorTerritorio: function(oContext, territoryFilter) {
				// cargamos la plantilla de la estructura de los datos
				var parametros= comunEstructuraDatos.parametros.estructuraParametros();
		
				parametros.entidades= {
						firstEntity :  "Employees"
				},	
				parametros.params = {
				        KeyValues : {
				        },
				        filters:{
				        	filtros : [
								territoryFilter
				        	],
				        	operator: ""
				        },
						expandEntities : [
						]		        
					};			
				comunOdataV2.actions.oDataRead(oContext, parametros, 'listadoEmpleados');
			}
	};
	return model;
});