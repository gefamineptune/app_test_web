function approveLeave(leave_id) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  let tracking = null;
  let latestTrackingId = null;
  let approvalTypeId = null;

  // Step 1: Get current active tracking
  const optionsTracking = {
    parameters: {
      where: JSON.stringify({ approval_id: leave_id, is_active: true }),
      order: JSON.stringify({ createdAt: "DESC" }),
      take: "1"
    }
  };

  apiGetApprovalTracking(optionsTracking)
    .then(response => {
      if (!response || response.length === 0) throw new Error("Gagal mendapatkan tracking");
      tracking = response[0];
      return getApproverTypeID("Leave");
    })
    // Step 2: Update current tracking as approved
    .then(approvalType => {
      approvalTypeId = approvalType;

      const trackingData = {
        id: tracking.id,
        type_id: approvalTypeId,
        approval_id: leave_id,
        submitter_id: tracking.submitter_id,
        level: tracking.level,
        status: "Approved",
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
            approval_type_id: leave_id,
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
    // Step 4: Cek apakah level = 4, jika ya, update status leave langsung
    .then(() => {
      if (tracking.level === 4) {
        const leaveOptions = {
          parameters: {
            where: JSON.stringify({ id: leave_id })
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
            status: "Approved",
            created_by: leave.created_by
          };
          return apiUpdateLeaveRequest({ data: leaveData });
        });
      } else {
        // Step 5: Kalau belum level 4, cari approver berikutnya
        const empOptions = {
          parameters: {
            where: JSON.stringify({ id: tracking.submitter_id })
          }
        };
        return apiGetEmployees(empOptions).then(response => {
          const employee = response[0];
          return getApproverLeave(employee.position_id, employee.branch_id, employee.department_id, tracking.level + 1)
            .then(data => {
              if (data.status === -1 || data.status === 0) {
                // Tidak ada approver lagi, langsung update status cuti
                const leaveOptions = {
                  parameters: {
                    where: JSON.stringify({ id: leave_id })
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
                    status: "Approved",
                    created_by: leave.created_by
                  };
                  return apiUpdateLeaveRequest({ data: leaveData });
                });
              } else if (data.status === 1) {
                // Masih ada approver, buat tracking baru
                const newTrackingData = {
                  type_id: tracking.type_id,
                  approval_id: leave_id,
                  submitter_id: tracking.submitter_id,
                  level: tracking.level + 1,
                  status: "Waiting for Approval",
                  timestamp: Date.now(),
                  is_active: true,
                  created_by: storedUser.username
                };

                return apiCreateApprovalTracking({ data: newTrackingData })
                  .then(() => {
                    const newTrackingOptions = {
                      parameters: {
                        where: JSON.stringify({ created_by: storedUser.username }),
                        order: JSON.stringify({ updatedAt: "DESC" }),
                        take: "1"
                      }
                    };
                    return apiGetApprovalTracking(newTrackingOptions);
                  })
                  .then(response => {
                    latestTrackingId = response[0].id;
                    const approverList = data.data;

                    const approverPromises = approverList.map(element => {
                      const approverData = {
                        approval_tracking_id: latestTrackingId,
                        approver_id: element.id,
                        approver_name: element.name || "",
                        approval_type_id: leave_id,
                        is_active: true
                      };
                      return apiCreateApproverList({ data: approverData });
                    });

                    return Promise.all(approverPromises);
                  });
              }
            });
        });
      }
    })
    .then(() => {
      sap.m.MessageToast.show("Leave approved successfully.");
      getLeaveTable();
      App.to(PageLeaveManagement);
    })
    .catch(err => {
      console.error("Terjadi kesalahan dalam proses:", err);
      sap.m.MessageToast.show("Gagal menyetujui cuti.");
    });
}
