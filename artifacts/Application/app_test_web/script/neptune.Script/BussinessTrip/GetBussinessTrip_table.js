function getBussinessTable(){

  // Define list employees dan table_employees
  let employees = [];
  let table_bussiness = [];

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

      // Lanjut ke bussiness trip setelah employees tersedia, get api bussiness trip
      return apiGetBussinessTrip();

    })
    .then(function(response) {
      const bussinessArray = response || [];

      bussinessArray.forEach(bussiness => {
        const match = employees.find(emp => emp.id === bussiness.employee_id);
        const match_approver = employees.find(emp => emp.id === bussiness.approver_id);

        table_bussiness.push({
          id: bussiness.id,
          employee_name: match ? match.name : "",
          employee_id: bussiness.employee_id,
          departure_date: bussiness.departure_date,
          status: bussiness.status,
          destination: bussiness.destination,
          approver_name: match_approver ? match_approver.name : "",
        });
      });

    let jsonData = { 
        "bussiness_table": table_bussiness
      };
      modelMultiModel_BussinessTrip.setData(jsonData);
      console.log(modelMultiModel_BussinessTrip.getData());


    })
    .catch(function(error) {
      console.error("API error:", error);
    });

}