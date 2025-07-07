function reject(approval_type_id, type) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  let tracking = null;
  let approvalTypeId = null;

  // Step 1: Get current active tracking
  const optionsTracking = {
    parameters: {
      where: JSON.stringify({ approval_id: approval_type_id, is_active: true }),
      order: JSON.stringify({ createdAt: "DESC" }),
      take: "1"
    }
  };

  apiGetApprovalTracking(optionsTracking)
    .then(response => {
      if (!response || response.length === 0) throw new Error("Gagal mendapatkan tracking");
      tracking = response[0];
      return getApproverTypeID(type);
    })
    // Step 2: Update current tracking as rejected
    .then(approvalType => {
      approvalTypeId = approvalType;

      const trackingData = {
        id: tracking.id,
        type_id: approvalTypeId,
        approval_id: approval_type_id, // perbaikan dari leave_id yang belum didefinisikan
        submitter_id: tracking.submitter_id,
        level: tracking.level,
        status: "Rejected",
        timestamp: tracking.timestamp,
        is_active: false,
        created_by: tracking.created_by
      };

      return apiUpdateApprovalTracking({ data: trackingData });
    })
    // Step 3: Nonaktifkan approver list lama
    .then(() => {
      const optionsApprover = {
        parameters: {
          where: JSON.stringify({
            approval_type_id: approval_type_id,
            is_active: true,
            approval_tracking_id: tracking.id
          })
        }
      };
      return apiGetApproverList(optionsApprover);
    })
    .then(approverList => {
      const updateApproverPromises = approverList.map(element => {
        return apiUpdateApproverList({
          data: {
            id: element.id,
            is_active: false
          }
        });
      });
      return Promise.all(updateApproverPromises);
    })
    // Step 4: Update leave status menjadi Rejected
    .then(() => {
      const leaveOptions = {
        parameters: {
          where: JSON.stringify({ id: approval_type_id })
        }
      };

      return apiGetLeave(leaveOptions).then(response => {
        const leave = response[0];
        const leaveData = {
          id: leave.id,
          employee_id: leave.employee_id,
          leave_type_id: leave.leave_type_id,
          start_date: leave.start_date,
          end_date: leave.end_date,
          total_days: leave.total_days,
          reason: leave.reason,
          status: "Rejected",
          created_by: leave.created_by
        };
        return apiUpdateLeaveRequest({ data: leaveData });
      });
    })
    .then(() => {
      sap.m.MessageToast.show("Leave rejected successfully.");
      getLeaveTable();
      App.to(PageLeaveManagement);
    })
    .catch(err => {
      console.error("Terjadi kesalahan dalam proses:", err);
      sap.m.MessageToast.show("Gagal menolak cuti.");
    });
}
