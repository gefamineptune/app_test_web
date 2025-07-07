function getApproverLeave(position_id, branch_code, department_code, level) {
  let approver_level = `approver${level}`;
  const whereClause = {
    submitter_position_id: position_id,
    approval_setup_name: "Leave Approval"
  };

  const options = {
    parameters: {
      where: JSON.stringify(whereClause)
    }
  };

  return apiGetApprovalMatrix_table(options)
    .then(function(response) {
      const approvalData = (response || [])[0];

      if (!approvalData) {
        return {
          data: [],
          status: -1,
          message: "Approval Setup not found in approval data"
        };
      }

      if (!approvalData[approver_level]) {
        return {
          data: [],
          status: 0,
          message: `Approver level ${approver_level} not found in approval data`
        };
      }

      const approverPositionId = approvalData[approver_level];
      console.log("Approver Position ID:", approverPositionId);

      const positionOptions = {
        parameters: {
          where: JSON.stringify({ id: approverPositionId })
        }
      };

      return apiGetPositions(positionOptions).then(function(positionResponse) {
        const positionData = (positionResponse || [])[0];

        if (!positionData) {
          return {
            data: [],
            status: -1,
            message: `No position data found for ID: ${approverPositionId}`
          };
        }

        if (positionData.level === 4) {
          const gmMappingOptions = {
            parameters: {
              where: JSON.stringify({
                department_id: department_code,
                branch_id: branch_code
              })
            }
          };

          return apiGet_Department_GM_Mapping(gmMappingOptions).then(function(gmResponse) {
            const gmData = (gmResponse || [])[0];
            if (gmData && gmData.gm_employee_id) {
              const employeeOptions = {
                parameters: {
                  where: JSON.stringify({ id: gmData.gm_employee_id })
                }
              };

              // Perbaikan: return promise dari apiTestEmployee dan gunakan then di dalamnya
              return apiTestEmployee(employeeOptions).then(function(empResponse) {
                const gmEmp = (empResponse || [])[0];
                const gm_employee_name = gmEmp ? gmEmp.name : "Unknown";

                return {
                  data: [{ id: gmData.gm_employee_id, name: gm_employee_name }],
                  status: 1,
                  message: "GM found"
                };
              });
            } else {
              return {
                data: [],
                status: -1,
                message: "GM employee not found in mapping"
              };
            }
          });
        }

        // Untuk level <= 3
        let empWhereClause = {
          position_id: approverPositionId,
          branch_id: branch_code
        };

        if (positionData.level <= 3) {
          empWhereClause.department_id = department_code;
        }

        const empOptions = {
          parameters: {
            where: JSON.stringify(empWhereClause)
          }
        };

        return apiTestEmployee(empOptions).then(function(empResponse) {
          return {
            data: Array.isArray(empResponse) ? empResponse : [],
            status: 1,
            message: "Employees found"
          };
        });
      });
    })
    .catch(function(error) {
      console.error("API error:", error);
      return {
        data: [],
        status: -1,
        message: `Unhandled exception: ${error.message || error}`
      };
    });
}
