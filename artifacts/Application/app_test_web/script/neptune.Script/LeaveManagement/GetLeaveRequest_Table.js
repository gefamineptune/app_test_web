function getLeaveTable(){
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Define list employees dan table_employees
  let employees = [];
  let table_leaveRequest = [];

  // Get data employee
  apiTestEmployee()
    .then(function(response) {
      // simpan response ke dalam variable employeeArray
      const employeeArray = response || [];

      // looping data
      employeeArray.forEach(emp => {
        // append current employee ke dalam list employee variable
        employees.push({
          id: emp.id,
          name: emp.name
        });
      });

      // Lanjut ke leave setelah employees tersedia, get api leave requests
      return apiTestLeave();

    })
    .then(function(response) {
      const leaveArray = response || [];
      // console.log("Response: ",response);

      leaveArray.forEach(leave => {
        const match = employees.find(emp => emp.id === leave.employee_id);
        
        let buttonVisible = true;
        if (match && match.name === storedUser.nama) {
          buttonVisible = false;
        }

        table_leaveRequest.push({
          id: leave.id,
          name: match ? match.name : "",
          start_date: leave.start_date,
          end_date: leave.end_date,
          status: leave.status,
          buttonEditVisible: buttonVisible

        });
      });

    let jsonData = { 
        "leave_table": table_leaveRequest
      };
      modelMultiModel_LeaveRequest.setData(jsonData);
      console.log(modelMultiModel_LeaveRequest.getData());


    })
    .catch(function(error) {
      console.error("API error:", error);
    });

}