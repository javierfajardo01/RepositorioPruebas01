sap.ui.define([
	"aplication/default/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"aplication/default/assets/formatters/formatter",
	"aplication/default/assets/utiles/utiles",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History"
], function(BaseController,JSONModel,MessageBox, Filter, FilterOperator, Formatter, utiles, MessageToast, History) {
	"use strict";
 
	return BaseController.extend("aplication.default.controller.Detail", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Master
*/
 	onInit: function() {
 				
		/*var model= sap.ui.getCore().getModel("ListaMateriales");
		
		this.getView().setModel(model, "ListaMateriales");
		
		console.log(model.getData()); */
 		
		var clientes_data={
			
			"Clientes":
			{
				"dni": "2342342",
				"nombre": "dwedwe",
				"apellidos": "gtrgtg"
			}
			
			
		};
	
		var model2 = new JSONModel();
		model2.setData(clientes_data);
		
		sap.ui.getCore().setModel(model2, "Clientes");
		
	},
	
	Aceptar: function(oEvt){
		
		console.log(oEvt);
		
		var model3= sap.ui.getCore().setModel("Clientes_data");
		
		var value1 = "";
		var value2= "";
		var value3= "";
		
		value1= this.getView().byId("input-a").getValue();
		value2= this.getView().byId("input-b").getValue();
		value3= this.getView().byId("input-c").getValue();;
		
		var data_input={
			
			"Clientes_data":
			{
				"dni": value1,
				"nombre":value2,
				"apellidos": value3
			}
		};
		
		var model3 = new JSONModel();
		model3.setData(data_input);
		
		sap.ui.getCore().setModel(model3, "Clientes_data");
		
		
		model3.setData(data_input);
		
		this.getRouter().navTo("datositem");
		
	},
	
	onItemPress: function(oEvt){
		
		var msg= oEvt.getSource().getBindingContext("ListaMateriales").getObject(); 
		
		var model1= new JSONModel();
		model1.setData(msg);
		
		sap.ui.getCore().setModel(model1, "DatosItem");
		
		/*MessageToast.show(msg.nombre + " ID: " + msg.id); */
		
		this.getRouter().navTo("datositem");
		
		//Generamos un nuevo modelo con la variable "msg", que nos permite ver el elemento que clickamos,
		// y accedemos a ella en el controlador de la tercera pantalla.
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Master
*/  
 		onBeforeRendering: function() {
			
		},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Master
*/
//	onAfterRendering: function() {
//
//	},
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
	
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("home", {}, true);
			}
		},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Master
*/
//	onExit: function() {
//
//	}
		handleSearch: function(oEvt){
			
			var oContext = this;
					// add filter for search
				var aFilters = [];
				//capturamos los caracteres escritos
				var sQuery = oEvt.getSource().getValue();
				var list = oContext.byId("empList");
				
				//Si no est� vac�o aplicamos el filtro
				if (sQuery && sQuery.length > 0) {
					var filterName = new Filter("FirstName", FilterOperator.Contains, sQuery);
					var filterLName = new Filter("LastName", FilterOperator.Contains, sQuery);
					var filterTitle = new Filter("Title", FilterOperator.Contains, sQuery);
					aFilters.push(filterName);
					aFilters.push(filterLName);
					aFilters.push(filterTitle);
					var filtro = new sap.ui.model.Filter({aFilters:aFilters, bAnd:false ,_bMultiFilter:true});
				}
				
				var binding = list.getBinding("items");
				binding.filter(filtro);
		},
		
		handleTableSearch: function(oEvt){
			
			var oContext = this;
					// add filter for search
				var aFilters = [];
				//capturamos los caracteres escritos
				var sQuery = oEvt.getSource().getValue();
				var table = oContext.byId("idEmployeesTable");
				
				//Si no est� vac�o aplicamos el filtro
				if (sQuery && sQuery.length > 0) {
					var filterName = new Filter("FirstName", FilterOperator.Contains, sQuery);
					var filterLName = new Filter("LastName", FilterOperator.Contains, sQuery);
					var filterTitle = new Filter("Title", FilterOperator.Contains, sQuery);
					var filterCity = new Filter("City", FilterOperator.Contains, sQuery);
					var filterCountry = new Filter("Country", FilterOperator.Contains, sQuery);
					var filterAddress = new Filter("Address", FilterOperator.Contains, sQuery);
					aFilters.push(filterName);
					aFilters.push(filterLName);
					aFilters.push(filterTitle);
					aFilters.push(filterCity);
					aFilters.push(filterCountry);
					aFilters.push(filterAddress);
					var filtro = new sap.ui.model.Filter({aFilters:aFilters, bAnd:false ,_bMultiFilter:true});
				}
				
				var binding = table.getBinding("items");
				binding.filter(filtro);
		},
		
		onSorting: function(oEvent) {
			var oContext = this;
	        var oList = oContext.byId("empList");
	        var oBinding = oList.getBinding("items");
	        var aSorters = [];

	        var sortKey = "FirstName";
	        var descending = oBinding.aSorters[0].bDescending;
	        
	        if(descending)
	        	aSorters.push(new sap.ui.model.Sorter(sortKey, false, false));
	        else
	        	aSorters.push(new sap.ui.model.Sorter(sortKey, true, false));

	        oBinding.sort(aSorters);
	    },
			
		addEmployeeToList : function(oEvt){
			var oContext = this;
			var list = oEvt.getSource();
			var selectedList = oContext.byId("idEmployeesTable");
			var item = oEvt.getParameters().listItem.getBindingContext("suggestEmployees").getObject();
			var oModel = sap.ui.getCore().getModel("selectedEmployees");
			var notExist = true;
			for(var i=0;i<oModel.getData().results.length;i++){
				if(oModel.getData().results[i].EmployeeID === item.EmployeeID){
					notExist = false;
				}
			}
			if(notExist){
				oModel.getData().results.push(item);
				oContext.getView().setModel(oModel, "selectedEmployees");
				sap.ui.getCore().setModel(oModel, "selectedEmployees");
				oModel.refresh();
			}
			else{
				MessageBox.alert(this.getView().getModel("i18n").getResourceBundle().getText("employeeIsSelected"));
			}
		},
			
		deleteEmployeeFromList : function(oEvt){
			var oContext = this;
			var item = oEvt.getSource().getParent();
			var empId = item.getCells()[0].getText();
			var oModel = sap.ui.getCore().getModel("selectedEmployees");
			var oData = oModel.getData();
			
			for(var i=0;i<oModel.getData().results.length;i++){
				if(oData.results[i].EmployeeID === parseInt(empId)){
					oData.results.splice(i,1);
				    oModel.setData(oData) ;
				    oModel.refresh();
				}
			}
			
			oContext.getView().setModel(oModel, "selectedEmployees");
			sap.ui.getCore().setModel(oModel, "selectedEmployees");
			oModel.refresh();
		},
		
		goToConfirm : function(oEvt){
			var oContext = this;
			var oData = sap.ui.getCore().getModel("selectedEmployees").oData;
			if(oData.results.length != 0){
				console.log(oData);	
			    oContext.getRouter().navTo("confirm");
			}
			else{
				MessageBox.alert(this.getView().getModel("i18n").getResourceBundle().getText("noEmployeesSelected"));
			}
		}

})});