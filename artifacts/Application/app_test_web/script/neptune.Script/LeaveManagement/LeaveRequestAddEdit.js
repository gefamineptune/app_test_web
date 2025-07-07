function createLeaveRequest() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const startDate = DatePicker_start.getDateValue();
  const endDate = DatePicker_end.getDateValue();

  // Validasi input
  if (!ComboBox_LeaveType.getValue()) return sap.m.MessageToast.show("Leave Type must be filled");
  if (!DatePicker_start.getValue()) return sap.m.MessageToast.show("Start Leave must be filled");
  if (!DatePicker_end.getValue()) return sap.m.MessageToast.show("End Leave must be filled");
  if (startDate > endDate) return sap.m.MessageToast.show("Start Date must be less than or equal to End Date");
  if (!Input_reason.getValue()) return sap.m.MessageToast.show("Reason must be filled");

  let latestLeaveId = null;
  let latestTrackingId = null;
  let approvalTypeId = null;

  const totalDays = DiffDays(DatePicker_start.getValue(), DatePicker_end.getValue());
  const leaveData = {
    employee_id: storedUser.employee_id,
    leave_type_id: ComboBox_LeaveType.getSelectedKey(),
    start_date: formatDateTime(startDate),
    end_date: formatDateTime(endDate),
    total_days: totalDays,
    reason: Input_reason.getValue(),
    status: "In Progress",
    created_by: storedUser.username
  };

  // Step 1: Create Leave
  apiCreateLeaveRequest({ data: leaveData })
    // Step 2: Get latest leave_id
    .then(() => {
      const options = {
        parameters: {
          where: JSON.stringify({ created_by: storedUser.username }),
          order: JSON.stringify({ updatedAt: "DESC" }),
          take: "1"
        }
      };
      return apiGetLeave(options);
    })
    .then(response => {
      if (!response || response.length === 0) throw new Error("Gagal mendapatkan leave_id");
      latestLeaveId = response[0].id;

      // Step 3: Get Approval Type ID
      return getApproverTypeID("Leave");
    })
    .then(approvalType => {
      approvalTypeId = approvalType;

      const trackingData = {
        type_id: approvalTypeId,
        approval_id: latestLeaveId,
        submitter_id: storedUser.employee_id,
        level: 1,
        status: "Waiting for Approval",
        timestamp: Date.now(),
        is_active: true,
        created_by: storedUser.username
      };

      return apiCreateApprovalTracking({ data: trackingData });
    })
    // Step 4: Get latest approval_tracking_id
    .then(() => {
      const options = {
        parameters: {
          where: JSON.stringify({ created_by: storedUser.username }),
          order: JSON.stringify({ updatedAt: "DESC" }),
          take: "1"
        }
      };
      return apiGetApprovalTracking(options);
    })
    .then(response => {
      if (!response || response.length === 0) throw new Error("Gagal mendapatkan tracking_id");
      latestTrackingId = response[0].id;

      // Step 5: Get approver list
      return getApproverLeave(storedUser.position_id, storedUser.branch_code, storedUser.department_id, 1);
    })
    .then(approverResult => {
      if (approverResult.status === -1) {
        sap.m.MessageToast.show(approverResult.message);
        return Promise.reject(approverResult.message);
      }

      const approverList = approverResult.data;

      const approverPromises = approverList.map(element => {
        const approverData = {
          approval_tracking_id: latestTrackingId,
          approver_id: element.id,
          approver_name: element.name || "", // pastikan nama tersedia jika ada
          approval_type_id: latestLeaveId,
          is_active: true
        };
        return apiCreateApproverList({ data: approverData });
      });

      return Promise.all(approverPromises);
    })
    // Step 6: Success
    .then(() => {
      sap.m.MessageToast.show("Leave request submitted successfully.");
      getLeaveTable();
      App.to(PageLeaveManagement);
    })
    .catch(err => {
      console.error("Terjadi kesalahan dalam proses:", err);
      sap.m.MessageToast.show("Gagal mengajukan cuti.");
    });
}


















// EDIT LEAVE REQUEST
function editLeaveRequest() {
    
    let final_data = {};

    const date1 = DatePicker_start.getValue();
    const date2 = DatePicker_end.getValue();

     var total_day = DiffDays(DatePicker_start.getValue(), DatePicker_end.getValue());

    final_data.id = IdInvisibleLeaveRequest.getText()
    final_data.employee_id = ComboBox_employeeLeave.getSelectedKey();
    final_data.leave_type_id = ComboBox_LeaveType.getSelectedKey();
    final_data.start_date = date1
    final_data.end_date = date2
    final_data.total_days = total_day
     final_data.reason = Input_reason.getValue();
    final_data.status = "Pending"
    final_data.approver_id = ComboBox_approverLeave.getSelectedKey();


    var options = { 
        data: final_data
    };

    apiUpdateLeaveRequest(options);
    getLeaveTable()

    App.to(PageLeaveManagement);
}


// DELETE LEAVE REQUEST
function deleteLeaveRequest(id) { 
    var options = { parameters: {
        "where": JSON.stringify({id: id})
        }
    };

  apiDeleteLeaveRequest(options)
    .then(() => {
      sap.m.MessageToast.show("Data has been deleted");
    })
    .catch((error) => {
      console.error('Error deleting position:', error);
    });
    
    getLeaveTable()
}

