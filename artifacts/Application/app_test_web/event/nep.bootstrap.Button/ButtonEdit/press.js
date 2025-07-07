const context = oEvent.getSource().getBindingContext("MultiModel_ApprovalSetup");
const value = context.getProperty("approval_id");

const apiData = await getApprovalSetupById(value);
modelContainerApprovalMatrix.setData(apiData);

// Jalankan semua combobox loader dan tunggu selesai
await Promise.all([
  getComboboxList_submitter(),
  getComboboxList_approver1(),
  getComboboxList_approver2(),
  getComboboxList_approver3(),
  getComboboxList_approver4(),
  apiGetApprovalType()
]);


// Setelah semua combobox diisi, baru set selected value-nya
ComboBox_Type.setValue(apiData.type_name);
ComboBox_Type.setSelectedKey(apiData.type_id);
ComboBox_Submitter.setValue(apiData.submitter_name);
ComboBox_Submitter.setSelectedKey(apiData.submitter_id);
ComboBox_Approver1.setValue(apiData.approver1_name);
ComboBox_Approver1.setSelectedKey(apiData.approver1_id);
ComboBox_Approver2.setValue(apiData.approver2_name);
ComboBox_Approver2.setSelectedKey(apiData.approver2_id);
ComboBox_Approver3.setValue(apiData.approver3_name);
ComboBox_Approver3.setSelectedKey(apiData.approver3_id);
ComboBox_Approver4.setValue(apiData.approver4_name);
ComboBox_Approver4.setSelectedKey(apiData.approver4_id);

// Pindah ke halaman detail terakhir
approvalDetail();

