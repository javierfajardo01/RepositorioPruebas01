 
sap.ui.define([	
	'aplication/default/assets/formatters/formatter',
	"aplication/default/assets/utiles/utiles"
	
	], function(Formatter, utiles) {
	"use strict";

	
	/**
	 * realiza el envío y la consulta de datos (llamadas a SAP), leer, escribir, editar etc...
	 * @return mensaje o metodo callback existente en el controlador.
	 */
	
	var oDatav2=new Object(); 


	oDatav2.actions = {
			
			/**
			 * Metodo que Lee datos del modelo oData definido en Manifest.json. el modelo oData esta definido con el nombre "datosOdata"
			 * @param parametros (contiene el objeto con la estructura del modelo de datos "parametros")
			 * @param origenLlamada (contiene un identificador de origen de llamada para utilizar en el Callback")
			 * @returns callBackFunction()
			 */
				

			oDataRead : function(oContext, parametros, origenLlamada, params){
		 
				// recogemos el modelo oData (generado en ./Manifest.json)
				var oDatav2Model=oContext.getView().getModel("datosOdata");
				var parametroKeyValue='';
				if(parametros && parametros.params.KeyValues){	
					var arrkeys=Object.keys(parametros.params.KeyValues);
					var len=arrkeys.length;
					var i=0;
					$.each(parametros.params.KeyValues, function(key,value) {					
						
						 if (i == len - 1) {					
							 parametroKeyValue=parametroKeyValue.concat(key+"="+"'"+value+"'");
				          }else{
				        	  parametroKeyValue=parametroKeyValue.concat(key+"="+"'"+value+"',");
				         }
						 i++;
					});
				}	
				// fin establecer parametros en la url entre parentesis 
				
				// establecer expand en la url, con las entidades correspondientes
				var expand="";
				if(parametros && parametros.params.expandEntities && parametros.params.expandEntities.length>0){
					var len=parametros.params.expandEntities.length;
					$.each(parametros.params.expandEntities, function(index,value) {	
						 if (index == len - 1) {					
							expand=expand.concat(value);
				          }else{
				        	  expand=expand.concat(value+",");
				          }
					});
				}
				// fin establecer expand en la url, con las entidades correspondientes
				
				/* construimos la url */		
				var url;
				if (parametroKeyValue){
					url = "/"+parametros.entidades.firstEntity+"("+parametroKeyValue+")";
				}else{
					url = "/"+parametros.entidades.firstEntity;
				}
				
				var urlParams = {};
				
				if(expand !== ""){
				

					urlParams = {
						"$expand": expand
					};
				}
				
				
				if(params && !parametroKeyValue){

					
					for(var d = 0; d<params.length; d++){
						urlParams[params[d].key] = params[d].val;
					}
					

				}
		
				/* fin construimos la url */	
			
				if(parametros.params.filters.filtros.length == 0){
				
					try {
						utiles.BusyIndicator(true);
						oDatav2Model.read(url, {
							/* filters: filterArr1,  
							urlParameters : {
								// IvMsisdn : "2232432432"
							}, */
							urlParameters: urlParams,
							
							
							success: function(oData, response) {
								 oContext.callBackFunction(oData, response, origenLlamada,oContext); 
                                 utiles.BusyIndicator(false);
								
							},  
							error: function(oData, response) {  
	
								if (oData){
									var mensaje = "error "+oData.statusCode+" "+oData.message+" "+oData.statusText+" "+oData.responseText;
								}else{
									var mensaje = utiles.i18n.getResourceBundle().getText("errorInterno");
									
								}
								
								utiles.BusyIndicator(false);
								
								var params = [sap.m.MessageBox.Action.OK]; 
								utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
								utiles.BusyIndicator(false);

							}
						});		
					}catch (error){
	
						var mensaje = "assets/utiles/utiles.js->utiles.oDatav2.oDataRead : "+ error;
						var params = [sap.m.MessageBox.Action.OK]; 
						utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
						utiles.BusyIndicator(false);
					}
				
				}else{
					
					try{
						utiles.BusyIndicator(true);
						oDatav2Model.read(url, {  
	
							filters : [
							            new sap.ui.model.Filter({
							                filters: parametros.params.filters.filtros,
							                and: parametros.params.filters.operator
							            })
									],
									
							urlParameters: urlParams,
							success: function(oData, response) {
	
                                oContext.callBackFunction(oData, response, origenLlamada,oContext); 
                                utiles.BusyIndicator(false);
								
							},  
							error: function(oData, response) {  
							
								if (oData){
									var mensaje = "error "+oData.statusCode+" "+oData.message+" "+oData.statusText+" "+oData.responseText;
								}else{
									var mensaje = utiles.i18n.getResourceBundle().getText("errorInterno");
									
								}
								
								utiles.BusyIndicator(false);
								
								var params = [sap.m.MessageBox.Action.OK]; 
								utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
								utiles.BusyIndicator(false);

							}
						});		
					}catch (error){
	
						var mensaje = "assets/utiles/utiles.js->utiles.oDatav2.oDataRead : "+ error;
						var params = [sap.m.MessageBox.Action.OK]; 
						utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
						utiles.BusyIndicator(false);
					}

					
					
				}
		
			},
			
			
			/**
			 * Metodo que Lee datos del modelo oData definido en Manifest.json. el modelo oData esta definido con el nombre "datosOrdenesOdata"
			 * @param parametros (contiene el objeto con la estructura del modelo de datos "parametros")
			 * @param origenLlamada (contiene un identificador de origen de llamada para utilizar en el Callback")
			 * @returns callBackFunction()
			 */
				
			oDataDelete : function(oContext, parametros, origenLlamada, params){
		 
				// recogemos el modelo oData (generado en ./Manifest.json)
				var oDatav2Model=oContext.getView().getModel("datosOdata");
				var parametroKeyValue='';
				if(parametros && parametros.params.KeyValues){	
					var arrkeys=Object.keys(parametros.params.KeyValues);
					var len=arrkeys.length;
					var i=0;
					$.each(parametros.params.KeyValues, function(key,value) {					
						
						 if (i == len - 1) {					
							 parametroKeyValue=parametroKeyValue.concat(key+"="+"'"+value+"'");
				          }else{
				        	  parametroKeyValue=parametroKeyValue.concat(key+"="+"'"+value+"',");
				         }
						 i++;
					});
				}	
				// fin establecer parametros en la url entre parentesis 
				
				// establecer expand en la url, con las entidades correspondientes
				var expand="";
				if(parametros && parametros.params.expandEntities && parametros.params.expandEntities.length>0){
					var len=parametros.params.expandEntities.length;
					$.each(parametros.params.expandEntities, function(index,value) {	
						 if (index == len - 1) {					
							expand=expand.concat(value);
				          }else{
				        	  expand=expand.concat(value+",");
				          }
					});
				}
				// fin establecer expand en la url, con las entidades correspondientes
				
				/* construimos la url */		
				var url;
				if (parametroKeyValue){
					url = "/"+parametros.entidades.firstEntity+"("+parametroKeyValue+")";
				}else{
					url = "/"+parametros.entidades.firstEntity;
				}
				
				var urlParams = {};
				
				if(expand !== ""){
				
					urlParams["$expand"]= expand;
				
				}
				
				
				if(params && !parametroKeyValue){
					
					for(var d = 0; d<params.length; d++){
						urlParams[params[d].key] = params[d].val;
					}
					
				}
		
				
				try {
					utiles.BusyIndicator(true);
					oDatav2Model.remove(url, {
					
						urlParameters: urlParams,
						
						
						success: function(oData, response) {
							 oContext.callBackFunction(oData, response, origenLlamada,oContext); 
                             utiles.BusyIndicator(false);

							
								if (oData){
									var mensaje = "error "+oData.statusCode+" "+oData.message+" "+oData.statusText+" "+oData.responseText;
								}else{
									var mensaje = utiles.i18n.getResourceBundle().getText("errorInterno");
									
								}
								
								utiles.BusyIndicator(false);
								
								var params = [sap.m.MessageBox.Action.OK]; 
								utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
								utiles.BusyIndicator(false);
							}
						});		
					}catch (error){
	
						var mensaje = "assets/utiles/utiles.js->utiles.oDatav2.oDataRead : "+ error;
						var params = [sap.m.MessageBox.Action.OK]; 
						utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
						utiles.BusyIndicator(false);
					}
					
				},
			
			
			/**
			 * Metodo que envia datos a SAP
			 * @param oContext (cotiene la vista desde la que se está ejecutando el metodo)
			 * @param parametros (contiene el objeto con la estructura del modelo de datos "parametros")
			 * @param origenLlamada (contiene un identificador de origen de llamada para utilizar en el Callback")
			 * @returns callBackFunction()
			 */
				
			oDataCreate : function(oContext, oData, parametros, origenLlamada){
		 
				// recogemos el modelo oData (generado en ./Manifest.json)
				var oDatav2Model=oContext.getView().getModel("datosOdata");
				var parametroKeyValue='';
				if(parametros && parametros.params.KeyValues){	
					var arrkeys=Object.keys(parametros.params.KeyValues);
					var len=arrkeys.length;
					var i=0;
					$.each(parametros.params.KeyValues, function(key,value) {					
						
						 if (i == len - 1) {					
							 parametroKeyValue=parametroKeyValue.concat(key+"="+"'"+value+"'");
				          }else{
				        	  parametroKeyValue=parametroKeyValue.concat(key+"="+"'"+value+"',");
				         }
						 i++;
					});
				}	
				// fin establecer parametros en la url entre parentesis 
				
				// establecer expand en la url, con las entidades correspondientes
				var expand="";
				if(parametros && parametros.params.expandEntities && parametros.params.expandEntities.length>0){
					var len=parametros.params.expandEntities.length;
					$.each(parametros.params.expandEntities, function(index,value) {	
						 if (index == len - 1) {					
							expand=expand.concat(value);
				          }else{
				        	  expand=expand.concat(value+",");
				          }
					});
				}
				// fin establecer expand en la url, con las entidades correspondientes
				
				/* construimos la url */		
				var url;
				if (parametroKeyValue){
					url = "/"+parametros.entidades.firstEntity+"("+parametroKeyValue+")";
				}else{
					url = "/"+parametros.entidades.firstEntity;
				}
		
				/* fin construimos la url */		
				
				
				try {
					
					utiles.BusyIndicator(true);
					oDatav2Model.create(url, oData, { 				
						
						urlParameters: {
							"$expand" : expand 
						},
						success: function(oData, response) { 
							// si tiene exito
							oContext.callBackFunction(oData, response, origenLlamada, oContext); 	
							utiles.BusyIndicator(false);
						},  
						error: function(oData, response) {  

							if (oData){
								var mensaje = "error "+oData.statusCode+" "+oData.message+" "+oData.statusText+" "+oData.responseText;
							}else{
								var mensaje = "error interno, por favor contacte con soporte técnico"
							}
							
							var params = [sap.m.MessageBox.Action.CANCEL]; 
							utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
							utiles.BusyIndicator(false);
						}
					});		
				}catch (error){

					var mensaje = "assets/utiles/utiles.js->utiles.oDatav2.oDataRead : "+ error;
					var params = [sap.m.MessageBox.Action.CANCEL]; 
					utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
					utiles.BusyIndicator(false);
				}
		
			},		
			
			
			
			/**
			 * Metodo que envia datos a SAP
			 * @param oContext (cotiene la vista desde la que se está ejecutando el metodo)
			 * @param parametros (contiene el objeto con la estructura del modelo de datos "parametros")
			 * @param origenLlamada (contiene un identificador de origen de llamada para utilizar en el Callback")
			 * @returns callBackFunction()
			 */
				
			oDataUpdate : function(oContext, oData, parametros, origenLlamada){
		 
				// recogemos el modelo oData (generado en ./Manifest.json)
				var oDatav2Model=oContext.getView().getModel("datosOdata");
				oDatav2Model.sDefaultUpdateMethod = "PUT";
				var parametroKeyValue='';
				if(parametros && parametros.params.KeyValues){	
					var arrkeys=Object.keys(parametros.params.KeyValues);
					var len=arrkeys.length;
					var i=0;
					$.each(parametros.params.KeyValues, function(key,value) {					
						
						 if (i == len - 1) {					
							 parametroKeyValue=parametroKeyValue.concat(key+"="+"'"+value+"'");
				          }else{
				        	  parametroKeyValue=parametroKeyValue.concat(key+"="+"'"+value+"',");
				         }
						 i++;
					});
				}	
				// fin establecer parametros en la url entre parentesis 
				
				// establecer expand en la url, con las entidades correspondientes
				var expand="";
				if(parametros && parametros.params.expandEntities && parametros.params.expandEntities.length>0){
					var len=parametros.params.expandEntities.length;
					$.each(parametros.params.expandEntities, function(index,value) {	
						 if (index == len - 1) {					
							expand=expand.concat(value);
				          }else{
				        	  expand=expand.concat(value+",");
				          }
					});
				}
				// fin establecer expand en la url, con las entidades correspondientes
				
				/* construimos la url */		
				var url;
				if (parametroKeyValue){
					url = "/"+parametros.entidades.firstEntity+"("+parametroKeyValue+")";
				}else{
					url = "/"+parametros.entidades.firstEntity;
				}
		
				/* fin construimos la url */		
				
				
				try {
					
					utiles.BusyIndicator(true);
					oDatav2Model.update(url, oData, { 				
						
						urlParameters: {
							"$expand" : expand 
						},
						success: function(oData, response) { 
							// si tiene exito
							oContext.callBackFunction(oData, response, origenLlamada, oContext); 	
							utiles.BusyIndicator(false);
						},  
						error: function(oData, response) {  

							if (oData){
								var mensaje = "error "+oData.statusCode+" "+oData.message+" "+oData.statusText+" "+oData.responseText;
							}else{
								var mensaje = "error interno, por favor contacte con soporte técnico"
							}
							
							var params = [sap.m.MessageBox.Action.CANCEL]; 
							utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
							utiles.BusyIndicator(false);
						}
					});		
				}catch (error){

					var mensaje = "assets/utiles/utiles.js->utiles.oDatav2.oDataUpdate : "+ error;
					var params = [sap.m.MessageBox.Action.CANCEL]; 
					utiles.mensajes.showConfirmationDialog(mensaje,"",params, sap.m.MessageBox.Icon.ERROR,"ERROR");
					utiles.BusyIndicator(false);
				}
			}
		}
		
		return oDatav2;	
})