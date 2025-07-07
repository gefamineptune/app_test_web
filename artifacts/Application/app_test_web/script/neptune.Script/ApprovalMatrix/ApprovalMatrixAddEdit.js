// CREATE APPROVAL MATRIX
function createApprovalSetup() {
    if (Input_ApprovalName.getValue() === ""){
        sap.m.MessageToast.show("Approval Setup Name must be filled");
        return;
    }
    if (ComboBox_Submitter.getValue() === ""){
        sap.m.MessageToast.show("Submitter must be filled");
        return;
    }
    if (ComboBox_Approver1.getValue() === ""){
        sap.m.MessageToast.show("Approver 1 must be filled");
        return;
    }
    if (ComboBox_Approver2.getValue() === ""){
        sap.m.MessageToast.show("Approver 2 must be filled");
        return;
    }
    if (ComboBox_Approver3.getValue() === ""){
        sap.m.MessageToast.show("Approver 3 must be filled");
        return;
    }
    if (ComboBox_Approver4.getValue() === ""){
        sap.m.MessageToast.show("Approver 4 must be filled");
        return;
    }
    if (ComboBox_Type.getValue() === ""){
        sap.m.MessageToast.show("Type must be filled");
        return;
    }



   let final_data = {};

    final_data.approval_setup_name = Input_ApprovalName.getValue();
    final_data.submitter_position_id = ComboBox_Submitter.getSelectedKey();
    final_data.approver1 = ComboBox_Approver1.getSelectedKey();
    final_data.approver2 = ComboBox_Approver2.getSelectedKey();
    final_data.approver3 = ComboBox_Approver3.getSelectedKey();
    final_data.approver4 = ComboBox_Approver4.getSelectedKey();
    final_data.type_id = ComboBox_Type.getSelectedKey();


    var options = { 
        data: final_data
    };

    apiCreateApprovalMatrix(options);
    getApprovalSetupTable();

    App.to(PageApprovalMatrix);

    sap.m.MessageToast.show("Data has been created");

}

// EDIT APPROVAL MATRIX
function editApprovalSetup() {


   let final_data = {};

    final_data.id = IdInvisibleApproval.getText()
    final_data.approval_setup_name = Input_ApprovalName.getValue();
    final_data.submitter_position_id = ComboBox_Submitter.getSelectedKey();
    final_data.approver1 = ComboBox_Approver1.getSelectedKey();
    final_data.approver2 = ComboBox_Approver2.getSelectedKey();
    final_data.approver3 = ComboBox_Approver3.getSelectedKey();
    final_data.approver4 = ComboBox_Approver4.getSelectedKey();
    final_data.type_id = ComboBox_Type.getSelectedKey();


    var options = { 
        data: final_data
    };

    apiUpdateApprovalMatrix(options);
     getApprovalSetupTable();

    App.to(PageApprovalMatrix);
}


// DELETE APPROVAL MATRIX
function deleteApprovalSetup(id) { 
    var options = { parameters: {
        "where": JSON.stringify({id: id})
        }
    };

  apiDeleteApprovalMatrix(options)
    .then(() => {
      sap.m.MessageToast.show("Data has been deleted");
    })
    .catch((error) => {
      console.error('Error deleting position:', error);
    });
    
     getApprovalSetupTable();
}

