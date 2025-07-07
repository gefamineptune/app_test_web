function getApproverTypeID(type) {
  const whereClause = { type_name: type };

  const options = {
    parameters: {
      where: JSON.stringify(whereClause)
    }
  };

  return apiGetApprovalType(options)
    .then(function(response) {
      const approvalArray = response || [];
      const approvalData = approvalArray[0];

      if (!approvalData || !approvalData.id) {
        return null;
      }

      return approvalData.id;
    })
    .catch(function(error) {
      console.error("API error:", error);
      return null;
    });
}
