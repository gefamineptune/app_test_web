const context = oEvent.getSource().getBindingContext("MultiModel_LeaveRequest");
const value = context.getProperty("id");

getTrackingStatus(value).then(function () {
  dlgApprovalStatus.open();
});
