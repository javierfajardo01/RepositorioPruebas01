 
sap.ui.define([
	"aplication/default/controller/BaseController",	
	'aplication/default/assets/formatters/formatter',
	"aplication/default/assets/utiles/utiles",
	"sap/m/MessageBox",
	"sap/ui/model/resource/ResourceModel"
	
	], function(BaseController,Formatter, utiles, MessageBox, ResourceModel) {
		"use strict";

		var utiles=new Object();
		
		/**
		 * Cargamos el i18n en utiles.i18n para hacer referencia desde utiles a los properties
		 */
		utiles.i18n =  new ResourceModel({
	        bundleName: "aplication.default.i18n.i18n"
	    });
		
utiles.mensajes = {
				
				/**
				 * Funcion a la que se le pasa un mensaje, un array de objeto en el que tenemos las posibles funciones, es decir, si el usuario pulsa en OK, intentará hacer lo que 
				 * haya en action.Ok() Siempre se asignan los nombres de las funciones con la primera letra en Mayuscula y lo siguiente en minusculas
				 * @param message Mensaje a mostrar
				 * @param action Funcion que queremos que haga cuando el usuario le de a YES
				 * @param params Acciones (SI,NO,OK,ect.)
				 * @param icono Icono que queremos que salga en el titulo
				 * @param titulo Titulo del popup
				 */
				showConfirmationDialog :function(message,action,params,icono,titulo,oContext){
					
					sap.m.MessageBox.confirm( message, {
									icon: icono,
									title: titulo,
						          actions: params,
						          
						          onClose: function(oAction) {
						        	  switch(oAction){
						        	  
						        	  case "YES":
						        		  if(typeof(action.Yes) != "undefined")
						        			  action.Yes();
						        		  break;
						        	  case "OK":
						        		  if(typeof(action.Ok) != "undefined")
						        			  action.Ok(oContext);
						        		  break;
						        	  case "IMPRIMIR":
						        		 
					        			  if(typeof(action.Imprimir) != "undefined")
						        			  action.Imprimir(oContext);
						        		  break;
						        	  }
						        	  
						          }
						      });
				},
				
				/**
				 * Funcion que saca por pantalla un popup informativo
				 */
				showInformationDialog:function(mensaje, oContext){
					sap.m.MessageBox.information(mensaje,{
						icon: MessageBox.Icon.INFORMATION,
						title: "Aviso informativo",
						onClose : oContext.onCloseDialog(oContext)
					});
				},
				
				/**
				 * Mostramos un mensaje en pantalla
				 * @param oMessage mensaje que se muestra
				 */
				showMessage : function(oMessage){
					
					sap.m.MessageToast.show(oMessage);
				}
		};
		
		utiles.BusyIndicator = function(boolean){
			var mainBusy = "";
			mainBusy = sap.ui.getCore().byId("mainBusy");
			if(boolean == true){
				if(!mainBusy){
					 mainBusy = new sap.m.BusyDialog("mainBusy").addStyleClass("overflowBusyIndicator");		
					 mainBusy.open();
				} else mainBusy.open();
			}else{
				mainBusy.close();
			};
		};
			
	utiles.validaciones = {
			/**
			 * Funcion que comprueba si lo que se ha introducido en el input tiene una longitud minima
			 * Si no tiene dicha longitud, muestra un mensaje por pantalla 
			 * @param element Input
			 * @param label Label
			 * @param longitud Longitud
			 * @param oPanel Panel de errores
			 * @returns {Boolean}
			 */
			checkLengthElement:function(element, textoError,longitud, oPanel){
				
				var mensaje = "";
				
				var correcto = false;
				
					if(element.getValue().length < longitud){
						if(element.getValue().length == 0){
							 mensaje = new sap.m.MessageStrip({
									text: textoError + " " + utiles.i18n.getResourceBundle().getText("noVacio"),
									type:"Error",
									showIcon:true,
									showCloseButton:true
								}).addStyleClass("sapUiSmallMarginBottom");
								 element.setValueState(sap.ui.core.ValueState.Error);
						}else{
							
						
								 mensaje = new sap.m.MessageStrip({
										text:  textoError + " " + utiles.i18n.getResourceBundle().getText("debeSerMayorIgual")+ " " + longitud + " " + utiles.i18n.getResourceBundle().getText("caracteres"),
										type:"Warning",
										showIcon:true,
										showCloseButton:true
									}).addStyleClass("sapUiSmallMarginBottom");
									 element.setValueState(sap.ui.core.ValueState.Warning);
								
						}	 
						
						
					}else{
						if(element.getValue().length >= longitud){
							correcto = true;
							element.setValueState(sap.ui.core.ValueState.None);
						}
					}
						
					oPanel.insertContent(mensaje);
					
					
				return correcto;
				
			},
			
			
			/**
			 * Funcion que comprueba si lo que se ha introducido en el input tiene una longitud minima
			 * Si no tiene dicha longitud, muestra un mensaje por pantalla 
			 * @param element Input
			 * @param label Label
			 * @param longitud Longitud
			 * @param oPanel Panel de errores
			 * @returns {Boolean}
			 */
			checkLengthElementAdicional:function(element,longitud){
				
				
				
				var correcto = false;
				
					if(element.getValue().length >= longitud){
							correcto = true;
							
					}
					
				return correcto;
				
			},
			
			/**
			 * Funcion que comprueba si lo que se ha introducido en el input no es nulo y tiene
			 * maximo X caracteres. si los sobrepasa, da error.
			 * 
			 * @param element Input
			 * @param label Label
			 * @param longitud Longitud
			 * @param oPanel Panel de errores
			 * @returns {Boolean}
			 */
			checkLengthElementStatus:function(element, label,longitud, oPanel, oContext){
				
				var mensaje = "";
				
				var correcto = false;
				
				for(var i = 0; i < element.length;i++){
					if(element[i].getValue().length < longitud){
						if(element[i].getValue().length == 0){
							 mensaje = new sap.m.MessageStrip({
									text: oContext.getView().getModel("i18n").getResourceBundle().getText("msgErrorStatus",[(i+1),label]) + " " + utiles.i18n.getResourceBundle().getText("noVacio"),
									type:"Error",
									showIcon:true,
									showCloseButton:true
								}).addStyleClass("sapUiSmallMarginBottom");
								 element[i].setValueState(sap.ui.core.ValueState.Error);
						}else{
							correcto=true;
							return correcto;
						}	 
						
						
					}else{
						correcto=true;
					}
						
					oPanel.insertContent(mensaje,oPanel.getContent().length);
				}
				return correcto;
				
			},
			/**
			 * Funcion que comprueba que la longitud de una cadena sea menor o igual a un numero determinado de caracteres
			 * Si no tiene dicha longitud, muestra un mensaje por pantalla 
			 * @param element Input
			 * @param label Label
			 * @param longitud Longitud
			 * @param oPanel Panel de errores
			 * @returns {Boolean}
			 */
			checkMaxLengthElement:function(element, textoError,longitud, oPanel){
				
				var mensaje = "";
				
				var correcto = false;
				
				if(element.getValue().length > longitud){
					
					
					
					mensaje = new sap.m.MessageStrip({
						text: textoError + " " + utiles.i18n.getResourceBundle().getText("debeTener") + " " +  longitud + " " + utiles.i18n.getResourceBundle().getText("caracteresMaximo"),
						type:"Warning",
						showIcon:true,
						showCloseButton:true
					}).addStyleClass("sapUiSmallMarginBottom");
					element.setValueState(sap.ui.core.ValueState.Warning);
					
					
				}else{
					correcto = true;
					element.setValueState(sap.ui.core.ValueState.None);
				}
				
				oPanel.insertContent(mensaje);
				
				
				return correcto;
				
			},
			/**
			 * Funcion que comprueba que una cadena cumpla una longitud maxima
			 * Si no tiene dicha longitud, muestra un mensaje por pantalla 
			 * @param element Input
			 * @param label Label
			 * @param longitud Longitud
			 * @param oPanel Panel de errores
			 * @returns {Boolean}
			 */
			checkObligatorioLengthElement:function(element, textoError,longitud, oPanel){
				
				var mensaje = "";
				
				var correcto = false;
				
					if(element.getValue().length != longitud){
					
							
						
								 mensaje = new sap.m.MessageStrip({
										text: textoError + " " + utiles.i18n.getResourceBundle().getText("debeTener") + " " + longitud + " " + utiles.i18n.getResourceBundle().getText("digitos"),
										type:"Warning",
										showIcon:true,
										showCloseButton:true
									}).addStyleClass("sapUiSmallMarginBottom");
									 element.setValueState(sap.ui.core.ValueState.Warning);
								
						 
						
						
					}else{
							correcto = true;
							element.setValueState(sap.ui.core.ValueState.None);
					}
						
					oPanel.insertContent(mensaje);
					
					
				return correcto;
				
			},
			
			/**
			 * Función que comprueba si una cadena tiene una letra en mayuscula en la posición que le pasemos como parametro
			 * @params texto Cadena que se va a comprobar
			 * @params posicion Posicion en la que queremos comprobar
			 * @return 1:0 1 si tiene mayuscula, 0 si no
			 */
			checkLetraMayuscula: function(input,textoError, posicion, panel){
				var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
				
				      if (letras_mayusculas.indexOf(input.getValue().charAt(posicion),0) !=-1){
				    	  input.setValueState(sap.ui.core.ValueState.None);
				         return 1;
				      }else{
				    	  //letraMayuscula
				    	  mensaje = new sap.m.MessageStrip({
								text: textoError + " " + utiles.i18n.getResourceBundle().getText("letraMayuscula"),
								type:"Warning",
								showIcon:true,
								showCloseButton:true
							}).addStyleClass("sapUiSmallMarginBottom");
				    	  input.setValueState(sap.ui.core.ValueState.Warning);
				    	  
				    	  panel.insertContent(mensaje);
				    	  return 0; 
				      }
				   
				  
			},
			
			/**
			 * Función a la que se le pasa el input del email y el panel de errores.
			 * A través de una expresión regular comprueba que sea un email correcto
			 * @param email Input del Email
			 * @param panel Panel de errores
			 * @returns {Boolean}
			 */
			checkEmail: function(email, textoError, panel) {
				var mensaje = "";
			    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    if(!re.test(email.getValue())){
			    	mensaje = new sap.m.MessageStrip({
						text: textoError,
						type:"Warning",
						showIcon:true,
						showCloseButton:true
					}).addStyleClass("sapUiSmallMarginBottom");
			    	email.setValueState(sap.ui.core.ValueState.Warning);
		    	  
		    	  panel.insertContent(mensaje);
			    	
			    	return false;
			    }else{
			    	email.setValueState(sap.ui.core.ValueState.None);
			    	return true;
			    }
			    	
			},
				  
			  /**
				 * Funcion que comprueba que el input contiene unicamente letras
				 * @param input
				 * @returns {Boolean}
				 */
				checkLetraField:  function(input){
					
					var oValue = input;
					var reg = /^([a-z ñáéíóú])$/i;
					for(var i = 0; i < oValue.length; i++){
						if (!reg.test(oValue.charAt(i)))
						      return false;
					}
					
					return true;
					
				},
				
				
				/**
				 * Funcion que comprueba que el String introduce contiene solo numeros
				 * @param input
				 * @returns {Boolean}
				 */
				checkNumberField: function(input, label, panel){
					var mensaje = "";
					if(isNaN(input.getValue())){
						mensaje = new sap.m.MessageStrip({
							text:  utiles.i18n.getResourceBundle().getText("elCampo") + " " +  label + " " + utiles.i18n.getResourceBundle().getText("soloNumeros"),
							type:"Warning",
							showIcon:true,
							showCloseButton:true
						}).addStyleClass("sapUiSmallMarginBottom");
						input.setValueState(sap.ui.core.ValueState.Warning);
			    	  
						panel.insertContent(mensaje);
						return true;
					}else
					
					return false;
					
				},
				
				checkEspacios: function(input, label, panel) {
					var mensaje = "";
					
					if (/\s/.test(input.getValue())) {
						
						mensaje = new sap.m.MessageStrip({
							text: utiles.i18n.getResourceBundle().getText("elCampo") + " " + label + " " + utiles.i18n.getResourceBundle().getText("sinEspacios") ,
							type:"Warning",
							showIcon:true,
							showCloseButton:true
						}).addStyleClass("sapUiSmallMarginBottom");
						
						input.setValueState(sap.ui.core.ValueState.Warning);
						
						panel.insertContent(mensaje);
						return true;
						}else
							return false;
				}
		
		};
		
		return utiles;

	});