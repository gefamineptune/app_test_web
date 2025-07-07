function getAttendanceTable(){
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Define list employees dan table_employees
  let employees = [];
  let table_attendance = [];

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
      return apiGetAttendance();

    })
    .then(function(response) {
      const attendanceArray = response || [];
      // console.log("Response: ",response);

      attendanceArray.forEach(attendance => {
        const match = employees.find(emp => emp.id === attendance.employee_id);
        
        // let buttonVisible = true;
        // if (match && match.name === storedUser.nama) {
        //   buttonVisible = false;
        // }

        table_attendance.push({
          attendance_id: attendance.id,
          date: attendance.date,
          working_hours: attendance.working_hours,
          attendance_type: attendance.attendance_type,
          employee_name :  match ? match.name : ""
          
        });
      });

    let jsonData = { 
        "table_attendance": table_attendance
      };
      modelMultiModel_Attendance.setData(jsonData);
      


    })
    .catch(function(error) {
      console.error("API error:", error);
    });

}