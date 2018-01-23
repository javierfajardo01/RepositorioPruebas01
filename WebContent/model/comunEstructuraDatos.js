 
sap.ui.define([	
	'aplication/default/assets/formatters/formatter',
	"aplication/default/assets/utiles/utiles"
	
], function(Formatter, utiles) {
	"use strict";

	
	/**
	 * plantilla de estructura de datos a enviar a SAP para recuperar datos o actualizar/borrar.
	 * @return object (objeto con una estructura de datos) 
	 */
	
	var estructuras=new Object(); 
	
	estructuras.parametros = {
			
			
			estructuraParametros : function () {
				/* creamos un modelo de datos con la estructura para realizar cualquier llamada oData v2 */
				var parametros={};
				parametros.entidades = {
					firstEntity : ''
				},
				parametros.params = {
			        KeyValues : {
						 
			        },
			      
					expandEntities : [						
					]
			        
				};
				
 				return parametros;	
			}
	};
 

	
	return estructuras;

})