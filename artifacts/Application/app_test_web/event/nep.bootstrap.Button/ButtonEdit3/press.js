
// Replace yourField with FieldName
const context = oEvent.getSource().getBindingContext("MultiModel_BussinessTrip");
const value = context.getProperty("id"); // id dari item yang diklik
const employee_name = context.getProperty("employee_name");
const employee_id = context.getProperty("employee_id"); // id dari item yang diklik
 
const apiData = await getBussinessByID(value); // data dari API

modelContainerBussiness.setData(apiData);

bussinessDetail();

  console.log(apiData)

ComboBox_employeeBussiness.setValue(employee_name)
ComboBox_employeeBussiness.setSelectedKey(employee_id)

