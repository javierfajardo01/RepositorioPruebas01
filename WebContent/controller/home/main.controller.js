 
sap.ui.define([
	"aplication/default/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"aplication/default/assets/formatters/formatter",
	"aplication/default/assets/utiles/utiles",
	"aplication/default/model/home/mainModel",
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller"
], function(BaseController,JSONModel,MessageBox, Filter, FilterOperator, Formatter, utiles, mainModel, MessageToast, Controller) {
	"use strict";
 
	return BaseController.extend("aplication.default.controller.home.main", {
	 
	
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* @memberOf postventa.testing
		*/
		onInit: function() {

			/**Servicios para rellenar la tabla de datos:
			 * http://services.odata.org/ODataAPIExplorer/ODataAPIExplorer.html
			 * http://services.odata.org/V3/Northwind/Northwind.svc/Products
			 */
			
			// recogemos el modelo i18n y se lo aplicamos a oBundle (como un recurso de la vista).
	        this.oBundle = sap.ui.getCore().getModel("i18n").getResourceBundle(); 
	        
			/*inicializamos el router y hacemos un attachMatched para que cada vez que se acceda a esta vista
			se ejecute el metodo _onRouteMatched */
			var oRouter = this.getRouter();
			oRouter.getRoute("appHome").attachMatched(this._onRouteMatched, this);
 
		},
		
		/**
		 * Funcion que se ejecuta siempre que carguemos esta pantalla
		 */
		_onRouteMatched : function (oEvent) {			
	 
			// llamamos al metodo dnde cargamos los modelos principales de esta vista
			this.cargarDatosiniciales();
					
		},
		
		
		/**
		 * Funcion que se encarga de cargar los datos iniciales de la aplicacion
		 */
		cargarDatosiniciales : function() {
			
			var oContext = this;
			
		},
		
		
		/**
		 * FIN - Funcion que se encarga de cargar los datos iniciales de la aplicacion
		 */
		
		
		/**
		 * Metodo que se ejecuta como callback del metodo oDataRead donde se recupera informacion de SAP.
		 * si hay Exito en la llamada, en este metodo cargamos los datos que devuelve SAP.
		 * @param oData (contiene un objeto con la estructura de datos que devuelve SAP)
		 * @param response (contiene el codigo de respuesta de la llamada, y mas informacion relativa a la misma)
		 */
		callBackFunction : function(oData, response, origenLlamada,oContext) { 
			
			switch (origenLlamada) {
			
			case 'listadoProducts' :
				
				
					
				break;
				
			case 'listadoEmpleados' :
				
			
				
				break;
				
			};
		},
		
		onPress2: function(oEvt){
			
			console.log(oEvt);
			
			this.getRouter().navTo("webservices");
		},
		
		onPress: function (oEvt){
			
			
			console.log(oEvt);
			
			
			var data={
				"Materiales": [
				{
				"nombre": "Mesa",
				"id": "345556467"
				},
				{
				"nombre": "Silla",
				"id": "3455855"
				},
				{
				"nombre": "Pantalla",
				"id": "34589467"
				},
				{
				"nombre": "Raton",
				"id": "34125747"
				},
				{
				"nombre": "HDMI",
				"id": "3466667"
				}
				]
				
				/*"campo1": "texto1",
				"campo2": "texto2"*/
			};

			var model = new JSONModel();
			model.setData(data);

			this.getView().setModel(model, "ListaMateriales");
			
			sap.ui.getCore().setModel(model, "ListaMateriales"); 
			
			this.getRouter().navTo("detail");			
						
			MessageToast.show("2ª Página");
			
			/*
						
			var input= this.getView().byId("input_prueba");
			var val = input.getValue();
			
			var oData = {
				   name : val
				
			 };
			 var oModel = new JSONModel(oData);
			 sap.ui.getCore().setModel(oModel, "modeloInput");
			 
			 
			 this.getRouter().navTo("detail");	
			
			*/
			
			
			
		},
		
		/**
		 * Funcion que actua al usar el buscador
		 */
		onFilterCustomers: function (oEvt){

			var oContext= this;

			var aFilters= [];

			var sQuery = oEvt.getSource().getValue();

			var lista = oContext.getView().byId("idCustomersTable1");
			var binding = lista.getBinding("items");

			if(sQuery && sQuery.lenght>0){

				var filterLastName= new Filter("LastName", FilterOperator.Contains, sQuery);
				aFilters.push(filterLastName);
				var filter= new sap.ui.model.Filter({aFilters: aFilters, bAnd: false});

				binding.filter(filterLastName);

				console.log(oEvt);
			} else{

				binding.filter(null);
			}

		},

		
		
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