// Replace yourField with FieldName
const context = oEvent.oSource.getBindingContext();  

// Get Entire Model
const data = context.getObject();

modelContainer_DepartmentDetail.setData(data);
departmentDetail();