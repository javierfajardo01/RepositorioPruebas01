sap.ui.define([
	"aplication/default/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"aplication/default/assets/formatters/formatter",
	"aplication/default/assets/utiles/utiles",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/ui/table/SortOrder"
], function(BaseController,JSONModel,MessageBox, Filter, FilterOperator, Formatter, utiles, MessageToast, History, SortOrder) {
	"use strict";
 
	return BaseController.extend("aplication.default.controller.WebServices", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Master
*/
 	onInit: function() {
 				
		var arrayAux= [];		
		
		var object= {
			
			results: arrayAux
		}
	
		var model= new JSONModel(object);
		sap.ui.getCore().setModel(model, "AuxModel");
		
		this.getView().setModel(model, "AuxModel");
	
		var oContext= this;		
				
		$.ajax({
			  url: "http://services.odata.org/V2/Northwind/Northwind.svc/Products?$select=ProductID,ProductName,SupplierID,QuantityPerUnit,UnitPrice,UnitsInStock",
			  type: 'GET',
			  dataType: 'json',
			  async: true,
			  success: function(data){
			/*	$('<h1/>').text(json.title).appendTo('body');
				$('<div class="content"/>').html(json.html).appendTo('body'); */
				console.log('Success')
				console.log(data.d)
				var model5= new JSONModel(data.d);
				
				oContext.getView().setModel(model5, "Products");
				sap.ui.getCore().setModel(model5, "Products");
				
			  },
			  error: function(xhr, status){
				  alert('Respuesta errónea');
				  console.log("Respuesta errónea");
			  }
			});		
	},
	
	onItemSelected: function(oEvt){ 
		//Sacamos por consola los detalles del elemento del array en el que hemos hecho
		//click en la primera tabla:
		console.log(oEvt.getSource().getBindingContext("Products").getObject());
	
		//Almacenamos el modelo "AuxModel" en una variable "mod":
		var mod= sap.ui.getCore().getModel("AuxModel");
		
		//Almacenamos los datos del modelo en una variable "datos":
		var datos= mod.getData().results;
		
		//Hacemos un push() para guardar el objeto en el que hemos hecho click en "datos":
		datos.push(oEvt.getSource().getBindingContext("Products").getObject());
		
		//Creamos una variable "object" en la que almacenamos los objetos que hemos guardado previamente:
		var object= {
			results: datos
		}
	
		//Pasamos toda esta información al modelo:
		mod.setData(object);
		sap.ui.getCore().setModel(mod, "AuxModel");

		//Pasamos el modelo "AuxModel" a la vista:
		this.getView().setModel(mod, "AuxModel"); 
		
		
	},
	
	
	onFilterCustomers: function (oEvt){
		
			var oContext= this;

			var aFilters= [];

			var sQuery = oEvt.getSource().getValue();

			var lista = oContext.getView().byId("idCustomersTable1");
			var binding = lista.getBinding("items");

			if(sQuery && sQuery.length>0){

				var filterLastName= new Filter("LastName", FilterOperator.Contains, sQuery);
				var filterCity= new Filter("City", FilterOperator.Contains, sQuery);
				aFilters.push(filterLastName, filterCity);
				var filter= new sap.ui.model.Filter({aFilters: aFilters, bAnd: false});

				binding.filter(filter);

				console.log(oEvt);
			} else{

				binding.filter(null);
			}

		},

	onChangeOrder: function(oEvt){

		var oView = this.getView();
		var oDialog = oView.byId("sortMasterDialog");

		if (!oDialog) {

			oDialog = sap.ui.xmlfragment(oView.getId(), "aplication.default.fragments.SortMaster", this);
			oView.addDependent(oDialog);


		}

		oDialog.open();

		/*console.log(oEvt);

		var oContext= this;
		var sorter = new sap.ui.model.Sorter("LastName", true, false);
		this.getView().byId("idCustomersTable1").getBinding("items").sort(sorter); */
		
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
	
	onSortClose: function(){
		
		var oView = this.getView();
		var oDialog = oView.byId("sortMasterDialog");

		if (!oDialog) {

			oDialog = sap.ui.xmlfragment(oView.getId(), "aplication.cofares.fragments.SortMaster", this);
			oView.addDependent(oDialog);


		}

		oDialog.close();

	},

	onSortMaster:function(oEvt){
		
		var oContext = this;
		var vBox = oEvt.getSource().getParent().getContent()[0].getItems()[0].getItems()[0];

		var criteria = vBox.getItems()[1].getSelectedKey();
		var orden = null;
		
		if(vBox.getItems()[3].getSelectedIndex() === 0){
			orden = false;
		}else{
			orden = true;
		}

		oContext.onSortClose();

		var sorter = new sap.ui.model.Sorter(criteria, orden);
		var list = oContext.getView().byId("idCustomersTable1");
		var binding = list.getBinding("items");
		binding.sort(sorter);

	},
		

	onItemPress: function(oEvt){
		
		var msg= oEvt.getSource().getBindingContext("ListaProductos").getObject(); 
		
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