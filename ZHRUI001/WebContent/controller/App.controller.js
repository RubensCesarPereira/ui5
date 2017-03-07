sap.ui.define([
	"sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
 
	return Controller.extend("opensap.myapp.controller.App", {
		onInit : function () {
	         // set data model on view
	         var oData = {
	            recipient : {
	               name : "World"
	            }
	         };
	         var oModel = new JSONModel(oData);
	         this.getView().setModel(oModel);
	      },

		onShowHello : function () {
			
			alert("Hello World");
			/* eslint-enable no-alert */
		}
	});
 
});