function getOvertimeTable(){
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Define list employees dan table_employees
  let employees = [];
  let table_overtime = [];

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
      return apiGetOvertime();

    })
    .then(function(response) {
      const array = response || [];
      // console.log("Response: ",response);

      array.forEach(overtime => {
        const match = employees.find(emp => emp.id === overtime.employee_id);
        
        // let buttonVisible = true;
        // if (match && match.name === storedUser.nama) {
        //   buttonVisible = false;
        // }

        table_overtime.push({
          overtime_id: overtime.id,
          employee_name :  match ? match.name : "",
          date: overtime.date,
          total_hours: overtime.total_hours,
          status: overtime.status
          
          
        });
      });

    let jsonData = { 
        "table_overtime": table_overtime
      };
      modelMultiModel_Overtime.setData(jsonData);
      


    })
    .catch(function(error) {
      console.error("API error:", error);
    });

}