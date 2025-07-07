function getApproval() {
 
  // Step 1: Ambil data business trip
  return apiGetApprovalMatrix_table()
    .then(function(response) {
      const bussinessArray = response || [];
      const bussinessData = bussinessArray[0] || {};
      return bussinessData;
    })
    .catch(function(error) {
      console.error("API error:", error);
      return {}; // fallback jika ada error
    });
}
