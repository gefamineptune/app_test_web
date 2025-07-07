function getComboboxList_submitter() {
  
  return apiRestAPI_position()
    .then(function(data) {
      const oModel = new sap.ui.model.json.JSONModel({ submitterList: data });
      const comboBox = sap.ui.getCore().byId("ComboBox_Submitter");

      comboBox.setModel(oModel);
      comboBox.bindItems({
        path: "/submitterList",
        template: new sap.ui.core.Item({
          key: "{id}",
          text: "{position_name}"
        })
      });
    })
    .catch(function(error) {
      console.error("API error:", error);
    });
}

function getComboboxList_approver1() {
  return apiRestAPI_position()
    .then(function(data) {
      const oModel = new sap.ui.model.json.JSONModel({ submitterList: data });
      const comboBox = sap.ui.getCore().byId("ComboBox_Approver1");

      comboBox.setModel(oModel);
      comboBox.bindItems({
        path: "/submitterList",
        template: new sap.ui.core.Item({
          key: "{id}",
          text: "{position_name}"
        })
      });
    })
    .catch(function(error) {
      console.error("API error:", error);
    });
}

function getComboboxList_approver2() {
  return apiRestAPI_position()
    .then(function(data) {
      const oModel = new sap.ui.model.json.JSONModel({ submitterList: data });
      const comboBox = sap.ui.getCore().byId("ComboBox_Approver2");

      comboBox.setModel(oModel);
      comboBox.bindItems({
        path: "/submitterList",
        template: new sap.ui.core.Item({
          key: "{id}",
          text: "{position_name}"
        })
      });
    })
    .catch(function(error) {
      console.error("API error:", error);
    });
}

function getComboboxList_approver3() {
  return apiRestAPI_position()
    .then(function(data) {
      const oModel = new sap.ui.model.json.JSONModel({ submitterList: data });
      const comboBox = sap.ui.getCore().byId("ComboBox_Approver3");

      comboBox.setModel(oModel);
      comboBox.bindItems({
        path: "/submitterList",
        template: new sap.ui.core.Item({
          key: "{id}",
          text: "{position_name}"
        })
      });
    })
    .catch(function(error) {
      console.error("API error:", error);
    });
}

function getComboboxList_approver4() {
  return apiRestAPI_position()
    .then(function(data) {
      const oModel = new sap.ui.model.json.JSONModel({ submitterList: data });
      const comboBox = sap.ui.getCore().byId("ComboBox_Approver4");

      comboBox.setModel(oModel);
      comboBox.bindItems({
        path: "/submitterList",
        template: new sap.ui.core.Item({
          key: "{id}",
          text: "{position_name}"
        })
      });
    })
    .catch(function(error) {
      console.error("API error:", error);
    });
}
