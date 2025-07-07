// CREATE LEAVE TYPE
function createLeaveType() {
    if (Input_LeaveTypeName.getValue() === ""){
        sap.m.MessageToast.show("Name must be filled");
        return;
    }
    if (Input_QuotaDays.getValue() === ""){
        sap.m.MessageToast.show("Quota Days must be filled");
        return;
    }


    let final_data = {};

    final_data.name = Input_LeaveTypeName.getValue();
    final_data.quota_days = Input_QuotaDays.getValue();
    final_data.is_active = CheckBox_status.getSelected();


    var options = { 
        data: final_data
    };

    apiCreateLeaveType(options);
    apiGetLeaveType();

    App.to(PageMaster);

}

// EDIT LEAVE TYPE
function editLeaveType() {
    
    
    let final_data = {};

    final_data.id = IdInvisibleLeaveType.getText()
    final_data.name = Input_LeaveTypeName.getValue();
    final_data.quota_days = Input_QuotaDays.getValue();
    final_data.is_active = CheckBox_status.getSelected();


    var options = { 
        data: final_data
    };

    apiUpdateLeaveType(options);
    apiGetLeaveType();

    App.to(PageMaster);
}


// DELETE LEAVE TYPE
function deleteLeaveType(id) { 
    var options = { parameters: {
        "where": JSON.stringify({id: id})
        }
    };

  apiDeleteLeaveType(options)
    .then(() => {
      sap.m.MessageToast.show("Data has been deleted");
    })
    .catch((error) => {
      console.error('Error deleting position:', error);
    });
    
     apiGetLeaveType();
}

