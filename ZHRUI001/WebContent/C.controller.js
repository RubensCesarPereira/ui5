sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel'
], function(jQuery, Fragment, Controller, Filter, JSONModel) {
	"use strict";

	var CController = Controller.extend("sap.m.sample.InputStates.C", {
		inputId: '',
		valueHelpRequest: function(oController) {
			this.inputId = oController.oSource.sId;
			var sServiceUrl = "http://cbmphordsup01.cbmp.corp:8012/sap/opu/odata/sap/ZGW_TRANSF_APPROVAL_SRV_02";
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "rubensc", "Cielo1234");

			var oJsonModel = new sap.ui.model.json.JSONModel();

			oModel.read("/zget_nameset?", null, null, true, function(oData, response) {
				oJsonModel.setData(oData);

			});
			sap.ui.getCore().setModel(oJsonModel);

			// Handling of both confirm and cancel; clear the filter
			var that = this;
			var handleClose = function(oEvent) {

				var oSelectedItem = oEvent.getParameter("selectedItem");
				if (oSelectedItem) {
					that.byId(that.inputId).setValue(oSelectedItem.getTitle());
				}
				oEvent.getSource().getBinding("items").filter([]);
			};

			// Create a SelectDialog and display it; bind to the same
			// model as for the suggested items
			if (!this._valueHelpSelectDialog) {
				this._valueHelpSelectDialog = new sap.m.SelectDialog("valueHelpSelectDialog", {
					title: "Categories",
					items: {
						path: "/results",
						template: new sap.m.StandardListItem({
							title: "{name} ({login})",
							active: true
						})
					},
					search: function(oEvent) {
						var sValue = oEvent.getParameter("value");
						var oFilter = new sap.ui.model.Filter(
							"name",
							sap.ui.model.FilterOperator.Contains, sValue
						);
						oEvent.getSource().getBinding("items").filter([oFilter]);
					},
					confirm: handleClose,
					cancel: handleClose
				});

				this._valueHelpSelectDialog.setModel(oJsonModel);

			} else {
				this._valueHelpSelectDialog.setModel(oJsonModel);
			}
			this._valueHelpSelectDialog.open();

		}
	});

	return CController;

});
