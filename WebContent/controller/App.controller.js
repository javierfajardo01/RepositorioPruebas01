sap.ui.define([
	"aplication/default/controller/BaseController",
	"sap/ui/model/resource/ResourceModel"

], function (BaseController, ResourceModel) {
	"use strict";
	return BaseController.extend("aplication.default.controller.App", {
		onInit: function () {
			
		    // set i18n model on view
	         var i18nModel = new ResourceModel({
	            bundleName: "aplication.default.i18n.i18n"
	         });
	         sap.ui.getCore().setModel(i18nModel, "i18n");
	         this.getView().setModel(i18nModel, "i18n");
	         
	         
	       // set device model	         
	         var deviceModel = new sap.ui.model.json.JSONModel({
	        	    isPhone: sap.ui.Device.system.phone 
        	 });
	         sap.ui.getCore().setModel(deviceModel, "device");
	         this.getView().setModel(deviceModel, "device");
		}
	
	
	
	});
});