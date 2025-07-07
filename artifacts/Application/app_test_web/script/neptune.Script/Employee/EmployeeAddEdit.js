// CREATE EMPLOYEE
function createEmployee() {
    if (Input_nik.getValue() === ""){
        sap.m.MessageToast.show("NIK must be filled");
        return;
    }
    if (Input_name.getValue() === ""){
        sap.m.MessageToast.show("Name must be filled");
        return;
    }
    if (Input_email.getValue() === ""){
        sap.m.MessageToast.show("Email must be filled");
        return;
    }
    if (ComboBox_status.getValue() === ""){
        sap.m.MessageToast.show("Status must be filled");
        return;
    }
    if (ComboBox_position.getValue() === ""){
        sap.m.MessageToast.show("Position must be filled");
        return;
    }
    if (ComboBox_department.getValue() === ""){
        sap.m.MessageToast.show("Department must be filled");
        return;
    }
    if (ComboBox_branch.getValue() === ""){
        sap.m.MessageToast.show("Branch must be filled");
        return;
    }

    let final_data_employee = {};

    final_data_employee.employee_code = Input_nik.getValue();
    final_data_employee.name = Input_name.getValue();
    final_data_employee.email = Input_email.getValue();
    final_data_employee.join_date = DatePicker_join.getValue();
    final_data_employee.status = ComboBox_status.getSelectedKey();
    final_data_employee.position_id = ComboBox_position.getSelectedKey();
    final_data_employee.department_id = ComboBox_department.getSelectedKey();
    final_data_employee.username = Input_username.getValue();
    final_data_employee.password = Input_password.getValue();
    final_data_employee.branch_id = ComboBox_branch.getSelectedKey();

    var options = { 
        data: final_data_employee
    };

    apiCreateEmployee(options);
    apiGetEmployees();

    App.to("PageEmployee");

}

// EDIT EMPLOYEE
function editEmployee() {
    
    let final_data_employee = {};

   
    final_data_employee.id = IdInvisibleEmployee.getText();
    final_data_employee.employee_code = Input_nik.getValue();
    final_data_employee.name = Input_name.getValue();
    final_data_employee.email = Input_email.getValue();
    final_data_employee.join_date = DatePicker_join.getValue();
    final_data_employee.status = ComboBox_status.getSelectedKey();
    final_data_employee.position_id = ComboBox_position.getSelectedKey();
    final_data_employee.department_id = ComboBox_department.getSelectedKey();
    final_data_employee.username = Input_username.getValue();
    final_data_employee.password = Input_password.getValue();
    final_data_employee.branch_id = ComboBox_branch.getSelectedKey();


    var options = { 
        data: final_data_employee
    };

    apiUpdateEmployee(options);
    apiGetEmployees();

    App.to("PageEmployee");
}


// DELETE EMPLOYEE
function deleteEmployee(id) { 
    var options = { parameters: {
        "where": JSON.stringify({id: id})
        }
    };

  apiDeleteEmployee(options)
    .then(() => {
      sap.m.MessageToast.show("Data has been deleted");
    })
    .catch((error) => {
      console.error('Error deleting position:', error);
    });
    
     apiGetEmployees();
}

