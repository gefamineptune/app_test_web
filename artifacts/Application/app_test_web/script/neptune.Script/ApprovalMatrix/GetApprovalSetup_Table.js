function getApprovalSetupTable(){

  //Define list table_employees
  let table_Approval = [];

  //Get data approval setup
  apiGetApprovalMatrix_table()
    .then(function(response) {
      
      //simpan response ke dalam variable approvalArray
      const approvalArray = response || [];

      //  looping approvalArray List
      approvalArray.forEach(data => {
        // append current data ke dalam list table_approval
        table_Approval.push({
          approval_id: data.id,
          approval_name: data.approval_setup_name
        });
      });

      // list table_approval disimpan ke dalam json
       let jsonData = { 
        "approval_setup_table": table_Approval
      };

      // Set data json ke dalam multi model
      modelMultiModel_ApprovalSetup.setData(jsonData);
      // console.log(modelMultiModel_ApprovalSetup.getData());


    })
    .catch(function(error) {
      console.error("API error:", error);
    });

}