function countData() {
  apiGetBussinessTrip()
    .then(function(response) {
      const bussinessArray = response || [];
      countBussiness.setText(bussinessArray.length + " Trip");

      return apiTestLeave();
    })
    .then(function(response) {
      const leaveArray = response || [];
      countLeave.setText(leaveArray.length + " Submissions");

      return apiGetOvertime();
    })
    .then(function(response) {
      const overtimeArray = response || [];
      countOvertime.setText(overtimeArray.length + " Requests");
    })
    .catch(function(error) {
      console.error("Error getting counts:", error);
    });
}
