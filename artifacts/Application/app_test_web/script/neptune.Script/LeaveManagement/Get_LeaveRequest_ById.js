function getLeaveRequestByID(leave_id) {
  const whereClause = { id: leave_id };
  const options = {
    parameters: {
      where: JSON.stringify(whereClause)
    }
  };

  // Step 1: Ambil data leave
  return apiTestLeave(options)
    .then(function(response) {
      const leaveArray = response || [];
      const leaveData = leaveArray[0] || {};

      // Jika tidak ada data leave atau employee_id/leave_type_id, return langsung
      if (!leaveData || !leaveData.employee_id || !leaveData.leave_type_id) {
        return leaveData;
      }

      // Step 2: Ambil data employee
      const empOptions = {
        parameters: {
          where: JSON.stringify({ id: leaveData.employee_id })
        }
      };

      return apiTestEmployee(empOptions).then(function(empResponse) {
        const empArray = empResponse || [];
        const empData = empArray[0] || {};

        // Step 3: Ambil data leave type
        const leaveTypeOptions = {
          parameters: {
            where: JSON.stringify({ id: leaveData.leave_type_id })
          }
        };

        return apiTestLeaveType(leaveTypeOptions).then(function(leaveTypeResponse) {
          const leaveTypeArray = leaveTypeResponse || [];
          const leaveTypeData = leaveTypeArray[0] || {};

          // Gabungkan semua data
          const merged = {
            ...leaveData,
            employee_name: empData.name || "",
            employee_email: empData.email || "",
            leave_type_name: leaveTypeData.name || ""
          };

          return merged;
        });
      });
    })
    .catch(function(error) {
      console.error("API error:", error);
      return {}; // fallback jika ada error
    });
}
