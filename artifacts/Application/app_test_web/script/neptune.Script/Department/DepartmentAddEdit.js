// CREATE DEPARTMENT
function createDepartments() {
    if (Input_DepartmentCode.getValue() === ""){
        sap.m.MessageToast.show("Department code must be filled");
        return;
    }
    if (Input_DepartmentName.getValue() === ""){
        sap.m.MessageToast.show("Department Name must be filled");
        return;
    }


// Input_DepartmentCode.setValue("123");

   let final_data = {};

    final_data.department_code = Input_DepartmentCode.getValue();
    final_data.department_name = Input_DepartmentName.getValue();


    var options = { 
        data: final_data
    };

    apiUpdateDepartment(options);
    apiGetDepartmentTable();

    App.to(PageMaster);

}

// EDIT DEPARTMENT
function editDepartment() {


   let final_data = {};

    final_data.id = IdInvisibleDepartment.getText();
    final_data.department_code = Input_DepartmentCode.getValue();
    final_data.department_name = Input_DepartmentName.getValue();
    // final_data.parent_department_id = ComboBox_ParentDepartment.getSelectedKey();
    // final_data.parent_department_id = "0";



    var options = { 
        data: final_data
    };

    apiUpdateDepartment(options);
    apiGetDepartmentTable();

    App.to(PageMaster);
}


// DELETE EMPLOYEE
function deleteDepartment(id) { 
    var options = { parameters: {
        "where": JSON.stringify({id: id})
        }
    };

  apiDeleteDepartment(options)
    .then(() => {
      sap.m.MessageToast.show("Data has been deleted");
    })
    .catch((error) => {
      console.error('Error deleting position:', error);
    });
    
    apiGetDepartmentTable();
}

