function getAttendanceByID(attendance_id) {
  const whereClause = { id: attendance_id };
  const options = {
    parameters: {
      where: JSON.stringify(whereClause)
    }
  };

  // Step 1: Ambil data business trip
  return apiGetAttendance(options)
    .then(function(response) {
      const attendanceArray = response || [];
      const attendanceData = attendanceArray[0] || {};
      return attendanceData;
    })
    .catch(function(error) {
      console.error("API error:", error);
      return {}; // fallback jika ada error
    });
}
