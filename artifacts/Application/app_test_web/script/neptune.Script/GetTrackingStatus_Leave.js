function getTrackingStatus(leave_id) {
  return new Promise((resolve, reject) => {
    const whereClause = { approval_id: leave_id };
    const options = {
      parameters: {
        where: JSON.stringify(whereClause),
        order: JSON.stringify({ createdAt: "DESC" })
      }
    };

    apiGetApprovalTracking(options)
      .then(async function (response) {
        const trackingArray = response || [];
        const tracking_list = [];

        for (const tracking of trackingArray) {
          const approverOptions = {
            parameters: {
              where: JSON.stringify({
                approval_type_id: leave_id,
                approval_tracking_id: tracking.id
              })
            }
          };

          const approverList = await apiGetApproverList(approverOptions);

          // Gabungkan semua nama approver menjadi satu string dipisah baris baru
          const approverNamesString = approverList.map(item => item.approver_name).join("\n");

          tracking_list.push({
            date_time: formatTime(tracking.timestamp),
            status: tracking.status,
            approver_names: approverNamesString
          });
        }

        const finalData = { tracking_list };

        modelMultiModel_ApprovalTracking.setData(finalData);
        console.log(finalData);

        resolve();
      })
      .catch(function (error) {
        console.error("API error:", error);
        reject(error);
      });
  });
}






// function getTrackingStatus(leave_id) {
//   return new Promise((resolve, reject) => {
//     const whereClause = { approval_id: leave_id };
//     const options = {
//       parameters: {
//         where: JSON.stringify(whereClause),
//         order: JSON.stringify({ createdAt: "DESC" })
//       }
//     };

//     apiGetApprovalTracking(options)
//       .then(async function (response) {
//         const trackingArray = response || [];
//         const tracking_list = [];

//         for (const tracking of trackingArray) {
//           const approverOptions = {
//             parameters: {
//               where: JSON.stringify({
//                 approval_type_id: leave_id,
//                 approval_tracking_id: tracking.id
//               })
//             }
//           };

//           const approverList = await apiGetApproverList(approverOptions);

//           // Pastikan hasilnya berbentuk array of object: { approver_name: "string" }
//           const approverObjects = approverList.map(item => ({
//             approver_name: item.approver_name
//           }));

//           tracking_list.push({
//             date_time: formatTime(tracking.timestamp), // Contoh: "30 May 2025 10:08"
//             status: tracking.status,
//             approver_list: approverObjects
//           });
//         }

//         const finalData = { tracking_list };

//         // Set ke model sesuai struktur
//         modelMultiModel_ApprovalTracking.setData(finalData);
//         console.log(finalData);

//         resolve(); // Data berhasil di-load
//       })
//       .catch(function (error) {
//         console.error("API error:", error);
//         reject(error);
//       });
//   });
// }
