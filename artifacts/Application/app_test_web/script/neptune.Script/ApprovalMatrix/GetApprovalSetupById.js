function getApprovalSetupById(approval_id) {
  const whereClause = { id: approval_id };
  const options = {
    parameters: {
      where: JSON.stringify(whereClause)
    }
  };

  return apiGetApprovalMatrix_table(options)
    .then(function(response) {
      const approvalArray = response || [];
      const approvalData = approvalArray[0] || {};

      if (!approvalData) {
        return {};
      }

      // Buat semua request paralel
      const subOptions = {
        parameters: {
          where: JSON.stringify({ id: approvalData.submitter_position_id })
        }
      };

      const app1Options = {
        parameters: {
          where: JSON.stringify({ id: approvalData.approver1 })
        }
      };

      const app2Options = {
        parameters: {
          where: JSON.stringify({ id: approvalData.approver2 })
        }
      };

      const app3Options = {
        parameters: {
          where: JSON.stringify({ id: approvalData.approver3 })
        }
      };

      const app4Options = {
        parameters: {
          where: JSON.stringify({ id: approvalData.approver4 })
        }
      };

      const typeOptions = {
        parameters: {
          where: JSON.stringify({ id: approvalData.type_id })
        }
      };

      // Jalankan semua API secara paralel
      return Promise.all([
        apiGetPositions(subOptions),  // [0] Submitter
        apiGetPositions(app1Options), // [1] Approver 1
        apiGetPositions(app2Options), // [2] Approver 2
        apiGetPositions(app3Options), // [3] Approver 3
        apiGetPositions(app4Options),  // [4] Approver 4
        apiGetApprovalType(typeOptions)  // [4] Type
      ])
      .then(function([
        submitterResponse,
        app1Response,
        app2Response,
        app3Response,
        app4Response,
        typeResponse
      ]) {
        const submitterData = (submitterResponse || [])[0] || {};
        const app1Data = (app1Response || [])[0] || {};
        const app2Data = (app2Response || [])[0] || {};
        const app3Data = (app3Response || [])[0] || {};
        const app4Data = (app4Response || [])[0] || {};
        const typeData = (typeResponse || [])[0] || {};

        const merged = {
          ...approvalData,
          submitter_id: submitterData.id || "",
          submitter_name: submitterData.position_name || "",
          approver1_id: app1Data.id || "",
          approver1_name: app1Data.position_name || "",
          approver2_id: app2Data.id || "",
          approver2_name: app2Data.position_name || "",
          approver3_id: app3Data.id || "",
          approver3_name: app3Data.position_name || "",
          approver4_id: app4Data.id || "",
          approver4_name: app4Data.position_name || "",
          type_id: typeData.id || "",
          type_name: typeData.type_name || ""
        };

        return merged;
      });
    })
    .catch(function(error) {
      console.error("API error:", error);
      return {}; // fallback jika error
    });
}
