// CREATE OVERTIME
function createOvertime() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // if (ComboBox_employeeOvertime.getValue() === ""){
    //     sap.m.MessageToast.show("Employee must be filled");
    //     return;
    // }
    
    if (DatePicker_overtime.getValue() === ""){
        sap.m.MessageToast.show("Date must be filled");
        return;
    }
    if (Input_totalHours.getValue() === ""){
        sap.m.MessageToast.show("Total Hours date must be filled");
        return;
    }
    if (Input_reasonOvertime.getValue() === ""){
        sap.m.MessageToast.show("Reason must be filled");
        return;
    }

    // if (ComboBox_approverOvertime.getValue() === ""){
    //         sap.m.MessageToast.show("Approver must be filled");
    //         return;
    // }


    let final_data = {};

    final_data.employee_id = storedUser.employee_id
    final_data.date = DatePicker_overtime.getValue();
    final_data.total_hours = Input_totalHours.getValue();
    final_data.reason = Input_reasonOvertime.getValue();
    final_data.status = "Pending"
    final_data.approver_id = ""


    var options = { 
        data: final_data
    };

    apiCreateOvertime(options);
    getOvertimeTable();

    App.to(PageOvertime);
}



// EDIT OVERTIME
function editOvertime() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    let final_data = {};

    final_data.id = IdInvisibleOvertime.getText()
    final_data.employee_id = storedUser.employee_id
    final_data.date = DatePicker_overtime.getValue();
    final_data.total_hours = Input_totalHours.getValue();
    final_data.reason = Input_reasonOvertime.getValue();
    final_data.status = "Pending"
    final_data.approver_id = ""


    var options = { 
        data: final_data
    };

    apiUpdateOvertime(options);
   getOvertimeTable();

    App.to(PageOvertime);
}


// DELETE OVERTIME
function deleteOvertime(id) { 
    var options = { parameters: {
        "where": JSON.stringify({id: id})
        }
    };

  apiDeleteOvertime(options)
    .then(() => {
      sap.m.MessageToast.show("Data has been deleted");
    })
    .catch((error) => {
      console.error('Error deleting position:', error);
    });
    
   getOvertimeTable();
}

