// CREATE BUSSINESS
function createBussinessTrip() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // if (ComboBox_employeeBussiness.getValue() === ""){
    //     sap.m.MessageToast.show("Employee must be filled");
    //     return;
    // }
    
    if (DatePicker_departure.getValue() === ""){
        sap.m.MessageToast.show("Departure must be filled");
        return;
    }
    if (DatePicker_return.getValue() === ""){
        sap.m.MessageToast.show("Return date must be filled");
        return;
    }
    if (Input_destination.getValue() === ""){
        sap.m.MessageToast.show("Destination must be filled");
        return;
    }
     if (Input_purpose.getValue() === ""){
        sap.m.MessageToast.show("Purpose must be filled");
        return;
    }

//  if (ComboBox_approverBussiness.getValue() === ""){
//         sap.m.MessageToast.show("Approver must be filled");
//         return;
//     }

debugger;
   let final_data = {};


   let date_departure = new Date(DatePicker_departure.getValue());
    let date_return =  new Date(DatePicker_return.getValue());

   
    final_data.employee_id = storedUser.employee_id
    final_data.departure_date = date_departure
    final_data.return_date = date_return
    final_data.destination = Input_destination.getValue();
    final_data.purpose = Input_purpose.getValue();
    final_data.status = "Pending"
    final_data.approver_id = ""


    var options = { 
        data: final_data
    };

    apiCreateBussinessTrip(options);
    getBussinessTable()

    App.to(PageBussinessTrip);
}



// EDIT BUSSINESS TRIP
function editBussinessTrip() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    let final_data = {};


   let date_departure = new Date(DatePicker_departure.getValue());
    let date_return =  new Date(DatePicker_return.getValue());

    final_data.id = IdInvisibleBussiness.getText()
    final_data.employee_id = storedUser.employee_id
    final_data.departure_date = date_departure
    final_data.return_date = date_return
    final_data.destination = Input_destination.getValue();
    final_data.purpose = Input_purpose.getValue();
    final_data.status = "Pending"
    final_data.approver_id = ""


    var options = { 
        data: final_data
    };

    apiUpdateBussinessTrip(options);
    getBussinessTable()

    App.to(PageBussinessTrip);
}


// DELETE BUSSINESS TRIP
function deleteBussinessTrip(id) { 
    var options = { parameters: {
        "where": JSON.stringify({id: id})
        }
    };

  apiDeleteBussinessTrip(options)
    .then(() => {
      sap.m.MessageToast.show("Data has been deleted");
    })
    .catch((error) => {
      console.error('Error deleting position:', error);
    });
    
    getBussinessTable()
}

