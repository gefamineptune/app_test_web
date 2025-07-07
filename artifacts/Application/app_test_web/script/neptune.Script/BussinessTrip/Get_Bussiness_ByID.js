function getBussinessByID(bussiness_id) {
  const whereClause = { id: bussiness_id };
  const options = {
    parameters: {
      where: JSON.stringify(whereClause)
    }
  };

  // Step 1: Ambil data business trip
  return apiGetBussinessTrip(options)
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
