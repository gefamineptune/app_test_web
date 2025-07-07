// BUTTON ADD POSITION
function populateForNewData() {
    App.to(PagePositionDetail);
    Input_position.setValue("");
    Input_description.setValue("");
    IdInvisible.setText("");
    ButtonUpdate.setVisible(false);
    ButtonSave.setVisible(true);
    Add.setVisible(true);
    Edit.setVisible(false);
  
}

// BUTTON DETAIL POSITION
function populateDetailsPage() {
    App.to(PagePositionDetail)
    // Input_position.setValue(data.Position_name);
    // Input_description.setValue(data.Description);
    // IdInvisible.setText(data.id);
    IdInvisible.setVisible(false)
    ButtonUpdate.setVisible(true)
    ButtonSave.setVisible(false)
    Edit.setVisible(true);
    Add.setVisible(false);
}

// BUTTON DETAIL EMPLOYEE
function employeeDetail() {
    App.to(PageEmployeeDetail)
    // Input_position.setValue(data.Position_name);
    // Input_description.setValue(data.Description);
    // IdInvisible.setText(data.id);
    IdInvisibleEmployee.setVisible(false)
    ButtonUpdateEmployee.setVisible(true)
    ButtonSaveEmployee.setVisible(false)
    EditData.setVisible(true);
    AddNew.setVisible(false);
}

// BUTTON ADD EMPLOYEE
function employeeAddNew() {
    App.to(PageEmployeeDetail)
    Input_nik.setValue("")
    Input_name.setValue("")
    Input_email.setValue("")
    DatePicker_join.setValue("")
    ComboBox_position.setValue("")
    ComboBox_status.setValue("")
    ComboBox_department.setValue("")
    ComboBox_branch.setValue("")
    Input_username.setValue("")
    Input_password.setValue("")
    IdInvisibleEmployee.setText("")
    IdInvisibleEmployee.setVisible(false)
    ButtonUpdateEmployee.setVisible(false)
    ButtonSaveEmployee.setVisible(true)
    EditData.setVisible(false);
    AddNew.setVisible(true);
}

// BUTTON ADD DEPARTMENT
function departmentAddNew() {
    App.to(PageDepartmentDetail)
    Input_DepartmentCode.setValue("")
    Input_DepartmentName.setValue("")
    // ComboBox_ParentDepartment.setValue("")
    IdInvisibleDepartment.setVisible(false)
    ButtonUpdateDepartment.setVisible(false)
    ButtonSaveDepartment.setVisible(true)
    Edit_Department.setVisible(false);
    Add_Department.setVisible(true);
}

// BUTTON DETAIL DEPARTMENT
function departmentDetail() {
    App.to(PageDepartmentDetail)
    // Input_position.setValue(data.Position_name);
    // Input_description.setValue(data.Description);
    // IdInvisible.setText(data.id);
    IdInvisibleDepartment.setVisible(false)
    ButtonUpdateDepartment.setVisible(true)
    ButtonSaveDepartment.setVisible(false)
    Edit_Department.setVisible(true);
    Add_Department.setVisible(false);
}


// BUTTON ADD LEAVE TYPE
function leaveTypeAddNew() {
    App.to(PageLeaveTypeDetail)
    Input_LeaveTypeName.setValue("")
    Input_QuotaDays.setValue("")
    CheckBox_status.setSelected(true)
    IdInvisibleLeaveType.setVisible(false)
    ButtonUpdateLeaveType.setVisible(false)
    ButtonSaveLeaveType.setVisible(true)
    Edit_LeaveType.setVisible(false);
    Add_LeaveType.setVisible(true);
}

// BUTTON DETAIL LEAVE TYPE
function leaveTypeDetail() {
    App.to(PageLeaveTypeDetail)
    // Input_position.setValue(data.Position_name);
    // Input_description.setValue(data.Description);
    // IdInvisible.setText(data.id);
    IdInvisibleLeaveType.setVisible(false)
    ButtonUpdateLeaveType.setVisible(true)
    ButtonSaveLeaveType.setVisible(false)
    Edit_LeaveType.setVisible(true);
    Add_LeaveType.setVisible(false);
}

// BUTTON ADD LEAVE MANAGEMENT
function leaveRequestAddNew() {
    App.to(PageLeaveManagementDetail)
    // ComboBox_employeeLeave.setValue("")
    ComboBox_LeaveType.setValue("")
    DatePicker_start.setValue("")
    DatePicker_end.setValue("")
    
    Input_reason.setValue("")
    // ComboBox_approverLeave.setValue("")
    ButtonApproveLeave.setVisible(false)
    ButtonRejectLeave.setVisible(false)
    IdInvisibleLeaveRequest.setVisible(false)
    ButtonUpdateLeaveRequest.setVisible(false)
    ButtonSaveLeaveRequest.setVisible(true)
    Edit_LeaveRequest.setVisible(false);
    Add_LeaveRequest.setVisible(true);
}

// BUTTON DETAIL LEAVE MANAGEMENT
function leaveRequestDetail() {
    App.to(PageLeaveManagementDetail)
    //  DatePicker_start.setValue(data.start_date);
    // DatePicker_end.setValue(data.end_date);
    // IdInvisibleLeaveRequest.setText(data.id);
    IdInvisibleLeaveRequest.setVisible(false)
    // ButtonUpdateLeaveRequest.setVisible(true)
    ButtonSaveLeaveRequest.setVisible(false)
    Edit_LeaveRequest.setVisible(true);
    Add_LeaveRequest.setVisible(false);
}

// BUTTON ADD ATTENDANCE
function attendanceAddNew() {
    App.to(PageAttendanceDetail)
    // ComboBox_employeeAttendance.setValue("")
    DatePicker_attendance.setValue("")
    DateTimePicker_checkin.setValue("")
    DateTimePicker_checkout.setValue("")
    // Input_workingHours.setValue("")
    ComboBox_attendanceType.setValue("")
    Input_notes.setValue("")
    IdInvisibleAttendance.setVisible(false)
    ButtonUpdateAttendance.setVisible(false)
    ButtonSaveAttendance.setVisible(true)
    Edit_attendance.setVisible(false);
    Add_attendance.setVisible(true);
}

// BUTTON DETAIL ATTENDANCE
function attendanceDetail() {
    App.to(PageAttendanceDetail)
   
    IdInvisibleAttendance.setVisible(false)
    ButtonUpdateAttendance.setVisible(true)
    ButtonSaveAttendance.setVisible(false)
    Edit_attendance.setVisible(true);
    Add_attendance.setVisible(false);
}

// BUTTON ADD BUSSINESS TRIP
function bussinesAddNew() {
    App.to(PageBussinessTripDetail)
    // ComboBox_employeeBussiness.setValue("")
    DatePicker_departure.setValue("")
    DatePicker_return.setValue("")
    Input_destination.setValue("")
    Input_purpose.setValue("")
    // ComboBox_approverBussiness.setValue("")
   
    IdInvisibleBussiness.setVisible(false)
    ButtonUpdateBussiness.setVisible(false)
    ButtonSaveBussiness.setVisible(true)
    Edit_bussiness.setVisible(false);
    Add_bussiness.setVisible(true);
}

// BUTTON DETAIL BUSSINESS TRIP
function bussinessDetail() {
    App.to(PageBussinessTripDetail)
    // Input_position.setValue(data.Position_name);
    // Input_description.setValue(data.Description);
    // IdInvisible.setText(data.id);
    IdInvisibleBussiness.setVisible(false)
    ButtonUpdateBussiness.setVisible(true)
    ButtonSaveBussiness.setVisible(false)
    Edit_bussiness.setVisible(true);
    Add_bussiness.setVisible(false);
}


// BUTTON ADD OVERTIME
function overtimeAddNew() {
    App.to(PageOvertimeDetail)
    // ComboBox_employeeOvertime.setValue("")
    DatePicker_overtime.setValue("")
    Input_reasonOvertime.setValue("")
    Input_totalHours.setValue("")
    // ComboBox_approverOvertime.setValue("")
   
    IdInvisibleOvertime.setVisible(false)
    ButtonUpdateOvertime.setVisible(false)
    ButtonSaveOvertime.setVisible(true)
    Edit_overtime.setVisible(false);
    Add_overtime.setVisible(true);
}

// BUTTON DETAIL OVERTIME
function overtimeDetail() {
    App.to(PageOvertimeDetail)
    // Input_position.setValue(data.Position_name);
    // Input_description.setValue(data.Description);
    // IdInvisible.setText(data.id);
    IdInvisibleOvertime.setVisible(false)
    ButtonUpdateOvertime.setVisible(true)
    ButtonSaveOvertime.setVisible(false)
    Edit_overtime.setVisible(true);
    Add_overtime.setVisible(false);
}

// BUTTON ADD APPROVAL MATRIX
function approvalAddNew() {
    App.to(PageApprovalMatrixDetail)
    ComboBox_Submitter.setValue("")
    Input_ApprovalName.setValue("")
    ComboBox_Approver1.setValue("")
    ComboBox_Approver2.setValue("")
    ComboBox_Approver3.setValue("")
    ComboBox_Approver4.setValue("")
    ComboBox_Type.setValue("")
    IdInvisibleApproval.setVisible(false)
    ButtonUpdateApproval.setVisible(false)
    ButtonSaveApproval.setVisible(true)
    Edit_approval.setVisible(false);
    Add_approval.setVisible(true);
}

// BUTTON DETAIL APPROVAL MATRIX
function approvalDetail() {
    App.to(PageApprovalMatrixDetail)
    IdInvisibleApproval.setVisible(false)
    ButtonUpdateApproval.setVisible(true)
    ButtonSaveApproval.setVisible(false)
    Edit_approval.setVisible(true);
    Add_approval.setVisible(false);
}