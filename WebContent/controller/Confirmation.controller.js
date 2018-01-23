 
sap.ui.define([
	"aplication/default/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"aplication/default/assets/formatters/formatter",
	"aplication/default/assets/utiles/utiles"
], function(BaseController,JSONModel,MessageBox, Filter, FilterOperator, Formatter, utiles) {
	"use strict";
 
	return BaseController.extend("aplication.default.controller.Confirmation", {
	 
	
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* @memberOf postventa.testing
		*/
		onInit: function() {
			
			// recogemos el modelo i18n y se lo aplicamos a oBundle (como un recurso de la vista).
	        this.oBundle = sap.ui.getCore().getModel("i18n").getResourceBundle(); 
	        
 
		},
		
		/**
		 * Funcion que se ejecuta siempre que carguemos esta pantalla
		 */
		_onRouteMatched : function (oEvent) {			
	 
			// llamamos al metodo dnde cargamos los modelos principales de esta vista
			this.cargarDatosiniciales();
					
		},
		
		onBeforeRendering: function() {
			var oContext = this;
			var confirmModel = sap.ui.getCore().getModel("selectedEmployees");
			var generalModel = sap.ui.getCore().getModel("General");
			
			oContext.getView().setModel(confirmModel, "confirmEmployees");
			oContext.getView().setModel(generalModel, "General");
		},
		
		
		/**
		 * Funcion que se encarga de cargar los datos iniciales de la aplicacion
		 */
		cargarDatosiniciales : function() {
			
			var oContext = this;
			//mainModel.get.cargarTerritorios(oContext);
		},
		
		
		/**
		 * FIN - Funcion que se encarga de cargar los datos iniciales de la aplicacion
		 */
		

		/**
		 * Funcion que actua al usar el buscador
		 */
		handleSearch: function(oEvt){
			
				var oContext = this;
						// add filter for search
					var aFilters = [];
					//capturamos los caracteres escritos
					var sQuery = oEvt.getSource().getValue();
					
					//Si no est� vac�o aplicamos el filtro
					if (sQuery && sQuery.length > 0) {
						var filter = new Filter("TerritoryDescription", FilterOperator.Contains, sQuery);
						aFilters.push(filter);
					}
					
					oEvt.getSource().getBinding("suggestionItems").filter(aFilters);
					oEvt.getSource().suggest();	
		},

		confirmAndSend : function(){
			MessageBox.success("Datos enviados")
		}
		
		
		/**
		* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		* (NOT before the first rendering! onInit() is used for that one!).
		* @memberOf postventa.testing
		*/
		//	onBeforeRendering: function() {
		//
		//	},
		
		/**
		* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		* This hook is the same one that SAPUI5 controls get after being rendered.
		* @memberOf postventa.testing
		*/
//			onAfterRendering: function() {
		

//			},
		
		/**
		* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		* @memberOf postventa.testing
		*/
		//	onExit: function() {
		//
		//	}
		
		
	});
	
		

		
});
 