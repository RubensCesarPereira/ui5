sap.ui.controller("sap.ui.comp.sample.valuehelpdialog.example1.ValueHelpDialog", {
	onInit: function() {
		this.theTokenInput = this.getView().byId("multiInput");
		this.theTokenInput1 = this.getView().byId("loginPara");

		this.aKeys = ["user", "name"];

		this.aItems = [{
			user: "rubensc",
			name: "Rubens Cesar"
		}, {
			user: "torso",
			name: "Sergio Torso"
		}];

	},

	onValueHelpRequest: function() {
		var that = this;

		var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
			basicSearchText: this.theTokenInput.getValue(),
			title: "Login",
			supportMultiselect: false,
			supportRanges: false,
			supportRangesOnly: false,
			key: this.aKeys[0],
			descriptionKey: this.aKeys[1],
			stretch: sap.ui.Device.system.phone,

			ok: function(oControlEvent) {
				that.aTokens = oControlEvent.getParameter("tokens");
				that.theTokenInput.setTokens(that.aTokens);

				oValueHelpDialog.close();
			},

			cancel: function(oControlEvent) {

				oValueHelpDialog.close();
			},

			afterClose: function() {
				oValueHelpDialog.destroy();
			}
		});

		var oColModel = new sap.ui.model.json.JSONModel();
		oColModel.setData({
			cols: [{
				label: "Login",
				template: "user"
			}, {
				label: "Nome",
				template: "name"
			}]
		});
		oValueHelpDialog.getTable().setModel(oColModel, "columns");

		var oRowsModel = new sap.ui.model.json.JSONModel();
		oRowsModel.setData(this.aItems);
		oValueHelpDialog.getTable().setModel(oRowsModel);
		if (oValueHelpDialog.getTable().bindRows) {
			oValueHelpDialog.getTable().bindRows("/");
		}

		var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
			
			advancedMode: true,
			filterBarExpanded: false,
			showGoOnFB: sap.ui.Device.system.phone
		});
		var oSearch = new sap.m.SearchField({
				width: "150%",
				search: function(oEvent) {
				var sQuery = oEvent.getParameter("query");
				var oBinding = oValueHelpDialog.getTable().getBinding("rows");
				if (sQuery) {
					var oFilter1 = [new sap.ui.model.Filter("user", "Contains", sQuery), new sap.ui.model.Filter("name", "Contains", sQuery)];
					var allFilters = new sap.ui.model.Filter(oFilter1, false);
					oBinding.filter(allFilters);
				} else {
					var oFilter = new sap.ui.model.Filter("user", sap.ui.model.FilterOperator.Contains, sQuery);
					oBinding.filter(oFilter);
				}
			}
		});
		oFilterBar.setBasicSearch(oSearch);

		oValueHelpDialog.setFilterBar(oFilterBar);

		oValueHelpDialog.open();
	},

	onValueHelpRequest1: function() {
		var that = this;

		var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
			basicSearchText: this.theTokenInput.getValue(),
			title: "Login",
			supportMultiselect: false,
			supportRanges: false,
			supportRangesOnly: false,
			key: this.aKeys[0],
			descriptionKey: this.aKeys[1],
			stretch: sap.ui.Device.system.phone,

			ok: function(oControlEvent) {
				that.aTokens = oControlEvent.getParameter("tokens");
				that.theTokenInput1.setTokens(that.aTokens);

				oValueHelpDialog.close();
			},

			cancel: function(oControlEvent) {

				oValueHelpDialog.close();
			},

			afterClose: function() {
				oValueHelpDialog.destroy();
			}
		});

		var oColModel = new sap.ui.model.json.JSONModel();
		oColModel.setData({
			cols: [{
				label: "Login",
				template: "user"
			}, {
				label: "Nome",
				template: "name"
			}]
		});
		oValueHelpDialog.getTable().setModel(oColModel, "columns");

		var oRowsModel = new sap.ui.model.json.JSONModel();
		oRowsModel.setData(this.aItems);
		oValueHelpDialog.getTable().setModel(oRowsModel);
		if (oValueHelpDialog.getTable().bindRows) {
			oValueHelpDialog.getTable().bindRows("/");
		}

		var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
			advancedMode: true,
			filterBarExpanded: false,
			showGoOnFB: !sap.ui.Device.system.phone
		});

		if (oFilterBar.setBasicSearch) {
			oFilterBar.setBasicSearch(new sap.m.SearchField({
				showSearchButton: sap.ui.Device.system.phone,
				placeholder: "Search",
				search: function(event) {
					oValueHelpDialog.getFilterBar().search();
				}
			}));
		}

		oValueHelpDialog.setFilterBar(oFilterBar);

		oValueHelpDialog.open();
	}
});