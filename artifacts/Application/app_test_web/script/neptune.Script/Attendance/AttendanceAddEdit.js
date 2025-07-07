// CREATE EMPLOYEE
function createAttendance() {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // if (ComboBox_employeeAttendance.getValue() === ""){
    //     sap.m.MessageToast.show("Employee must be filled");
    //     return;
    // }
    if (DatePicker_attendance.getValue() === ""){
        sap.m.MessageToast.show("Date must be filled");
        return;
    }
    if (DateTimePicker_checkin.getValue() === ""){
        sap.m.MessageToast.show("Check in time  must be filled");
        return;
    }
    if (DateTimePicker_checkout.getValue() === ""){
        sap.m.MessageToast.show("Check out time must be filled");
        return;
    }
   
     if (ComboBox_attendanceType.getValue() === ""){
        sap.m.MessageToast.show("Attendance Type must be filled");
        return;
    }
   
   debugger;
//    CHECK IN
    let check_in = DateTimePicker_checkin.getValue();
    let fixed = check_in.replace(/(\d{2})\.(\d{2})\.(\d{2})$/, "$1:$2:$3"); // jadi "30 Apr 2025 12:07:08"
    let time1 = new Date(fixed).toISOString(); // hasil: "2025-04-30T05:07:08.000Z"
   
//    CHECK OUT
    let check_out = DateTimePicker_checkout.getValue();
    let fixed1 = check_out.replace(/(\d{2})\.(\d{2})\.(\d{2})$/, "$1:$2:$3"); // jadi "30 Apr 2025 12:07:08"
    let time2 = new Date(fixed1).toISOString(); // hasil: "2025-04-30T05:07:08.000Z"

// DATE
    let date1 = new Date(DatePicker_attendance.getValue());

// WORKING HOURS
    let hours = hitungSelisihJam(check_in, check_out)
    
    
    let final_data = {};
    final_data.employee_id = storedUser.employee_id;
    final_data.date = date1
    final_data.check_in_time = time1
    final_data.check_out_time = time2
    final_data.working_hours = hours
    final_data.attendance_type = ComboBox_attendanceType.getSelectedKey();
    final_data.notes = Input_notes.getValue();


    var options = { 
        data: final_data
    };

    apiCreateAttendance(options);
    getAttendanceTable()

    App.to(PageAttendance);

}

// EDIT ATTENDANCE
function editAttendance(employee_id) {
    
const storedUser = JSON.parse(localStorage.getItem("user"));
    //    CHECK IN
    let check_in = DateTimePicker_checkin.getValue();
    let fixed = check_in.replace(/(\d{2})\.(\d{2})\.(\d{2})$/, "$1:$2:$3"); // jadi "30 Apr 2025 12:07:08"
    let time1 = new Date(fixed).toISOString(); // hasil: "2025-04-30T05:07:08.000Z"
   
//    CHECK OUT
    let check_out = DateTimePicker_checkout.getValue();
    let fixed1 = check_out.replace(/(\d{2})\.(\d{2})\.(\d{2})$/, "$1:$2:$3"); // jadi "30 Apr 2025 12:07:08"
    let time2 = new Date(fixed1).toISOString(); // hasil: "2025-04-30T05:07:08.000Z"

// DATE
    let date1 = new Date(DatePicker_attendance.getValue());

// WORKING HOURS
    let hours = hitungSelisihJam(check_in, check_out)


    let final_data = {};
    final_data.id = IdInvisibleAttendance.getText();
    final_data.employee_id = employee_id
    final_data.date = date1
    final_data.check_in_time = time1
    final_data.check_out_time = time2
    final_data.working_hours = hours
    final_data.attendance_type = ComboBox_attendanceType.getSelectedKey();
    final_data.notes = Input_notes.getValue();

    var options = { 
        data: final_data
    };

    apiUpdateAttendance(options);
    getAttendanceTable()
    apiGetAttendance();

    App.to(PageAttendance);
}


// DELETE ATTENDANCE
function deleteAttendance(id) { 
    var options = { parameters: {
        "where": JSON.stringify({id: id})
        }
    };

  apiDeleteAttendance(options)
    .then(() => {
      sap.m.MessageToast.show("Data has been deleted");
    })
    .catch((error) => {
      console.error('Error deleting position:', error);
    });
    
    getAttendanceTable()
}

