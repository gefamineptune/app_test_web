function setData1() {
  apiGetLeave({
  onSuccess: function(response) {
    console.log("Respons API diterima:", response);
    
    that.rawLeaveData = response;
    
    console.log("Data dari API setelah disimpan:", that.rawLeaveData);

    const leaveTableData = that.rawLeaveData.map(item => {
      return {
        id: item.id,
        employee_name: "Employee " + item.employee_id,
        start_date: item.start_date,
        status: item.status,
        approver_name: "Approver " + item.approver_id
      };
    });

    const modelMultiModel = new sap.ui.model.json.JSONModel();
    modelMultiModel.setData({ leave_table: leaveTableData });
    that.getView().setModel(modelMultiModel, "MultiModel");

    console.log("Transformed Data:", leaveTableData);
  },
  onError: function(error) {
    console.error("Gagal ambil data API:", error);
  }
});

}
