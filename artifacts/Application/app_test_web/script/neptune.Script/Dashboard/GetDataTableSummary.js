function getTableSummary() {
  let employees = [];
  let table_summary = [];

  // Get employee list
  apiTestEmployee()
    .then(function(response) {
      const employeeArray = response || [];
      employees = employeeArray.map(emp => ({
        id: emp.id,
        name: emp.name
      }));
      return apiGetBussinessTrip();
    })

    // Get business trip
    .then(function(response) {
      const bussinessArray = response || [];

      bussinessArray.forEach(business => {
        const match = employees.find(emp => emp.id === business.employee_id);

        table_summary.push({
          name: match ? match.name : "",
          jenis: "Business Trip",
          status: business.status,
          tanggal: business.departure_date
        });
      });

      return apiGetOvertime();
    })

    // Get overtime
    .then(function(response) {
      const overtimeArray = response || [];

      overtimeArray.forEach(overtime => {
        const match = employees.find(emp => emp.id === overtime.employee_id);

        table_summary.push({
          name: match ? match.name : "",
          jenis: "Overtime",
          status: overtime.status,
          tanggal: overtime.date
        });
      });

      return apiTestLeave();
    })

    // Get leave
    .then(function(response) {
      const leaveArray = response || [];

      leaveArray.forEach(leave => {
        const match = employees.find(emp => emp.id === leave.employee_id);

        table_summary.push({
          name: match ? match.name : "",
          jenis: "Leave",
          status: leave.status,
          tanggal: formatDate(leave.start_date)
        });
      });

      // Optional: sort by date (latest first)
      table_summary.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

      // Set to model
      const jsonData = {
       table_summary : table_summary
      };
      modelMultiModel_TableSummary.setData(jsonData);
    //   console.log(modelMultiModel_TableSummary.getData())
    })

    .catch(function(error) {
      console.error("API error:", error);
    });
}
