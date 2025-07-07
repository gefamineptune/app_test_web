
// Replace yourField with FieldName
const context = oEvent.getSource().getBindingContext("MultiModel_Attendance");
const value = context.getProperty("attendance_id"); // id dari item yang diklik

 
const apiData = await getAttendanceByID(value); // data dari API

modelContainerAttendance.setData(apiData);

ComboBox_attendanceType.setSelectedKey(apiData.attendance_type)

attendanceDetail();



