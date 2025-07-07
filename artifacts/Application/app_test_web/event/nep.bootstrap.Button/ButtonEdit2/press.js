// Replace yourField with FieldName
const context = oEvent.getSource().getBindingContext("MultiModel_Overtime");
const value = context.getProperty("overtime_id"); // id dari item yang diklik

 
const apiData = await getOvertimeByID(value); // data dari API

modelContainerOvertime.setData(apiData);

overtimeDetail();




