// Ambil context dari event
const context = oEvent.oSource.getBindingContext();

// Ambil seluruh data model dari context
const data = context.getObject();

// Isi model container dengan data detail
modelContainerEmployeeDetail.setData(data);

// Panggil fungsi employeeDetail() jika perlu
await employeeDetail(); // Hapus 'await' jika fungsi ini bukan async

// Ambil field individual
const Status = context.getProperty("status");
const position = context.getProperty("position_id");
const department = context.getProperty("department_id");
const branch = context.getProperty("branch_id");

// Set ComboBox Status
if (Status === true) {
  ComboBox_status.setValue("Active");
  ComboBox_status.setSelectedKey(true);
} else {
  ComboBox_status.setValue("Inactive");
  ComboBox_status.setSelectedKey(false);
}

// Siapkan parameter query
const optionsPosition = {
  parameters: {
    where: JSON.stringify({id:position})
  }
};

const optionsDepartment = {
  parameters: {
    where: JSON.stringify({id:department})
  }
};

const optionsBranch = {
  parameters: {
    where: JSON.stringify({branch_code:branch})
  }
};

// Ambil data dari API
const resultPosition = await apiGetPositions(optionsPosition);
const resultDepartment = await apiGetDepartmentList(optionsDepartment);
const resultBranch = await apiGetBranch(optionsBranch);

// Ambil nama dari hasil query
const positionName = resultPosition?.[0]?.position_name || "";
const positionID = resultPosition?.[0]?.id || "";
const departmentName = resultDepartment?.[0]?.department_name || "";
const departmentID = resultDepartment?.[0]?.id || "";
const branchName = resultBranch?.[0]?.branch_name || "";
const branchCode = resultBranch?.[0]?.branch_code || "";

// Set ComboBox value
ComboBox_position.setValue(positionName);
ComboBox_position.setSelectedKey(positionID);
ComboBox_department.setValue(departmentName);
ComboBox_department.setSelectedKey(departmentID);
ComboBox_branch.setValue(branchName);
ComboBox_branch.setSelectedKey(branchCode);
