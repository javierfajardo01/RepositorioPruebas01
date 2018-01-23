sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	return Controller.extend("aplication.default.controller.BaseController", {
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		
		// navegar atras o en su defecto, a la home, si no hay History o si no existe la ruta
		onNavBack: function (oEvent) { 
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("creaOrdenDatosInicialAbonado", {}, true /*no history*/);
			}
		},
		
		onNavMaster: function (oEvent) {
			this.getSplitAppObj().toMaster(this.createId("master"))
		},
		

		// navegar a home
		goToInicio : function () {
			this.getRouter().navTo("appHome", {}, true /*no history*/);
		},	
 		
		
		// meodo que confirma si existe un Split App para poder hacer las navegaciones
		getSplitAppObj : function() {
			var result = this.byId("SplitApp");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		}
	});
});