// Ambil context dan ID dari item yang diklik
    const context = oEvent.getSource().getBindingContext("MultiModel_LeaveRequest");
    const value = context.getProperty("id"); // ID leave request

    // Ambil detail leave dari API
    const apiData = await getLeaveRequestByID(value);

    // Set data ke model container untuk binding detail
    modelContainer_LeaveRequest.setData(apiData);

    // Tampilkan detail
    leaveRequestDetail();

    // Cek apakah user adalah approver
    const isApprover = await checkApprover(value);
    console.log(value)

    // Tampilkan tombol sesuai role
    ButtonApproveLeave.setVisible(isApprover);
    ButtonRejectLeave.setVisible(isApprover);

    // Set nilai combobox (untuk readonly atau pengeditan manual)
    ComboBox_LeaveType.setValue(apiData.leave_type_name);
    ComboBox_LeaveType.setSelectedKey(apiData.leave_type_id);
   // ComboBox_employeeLeave.setValue(apiData.employee_name);
    //ComboBox_employeeLeave.setSelectedKey(apiData.employee_id);