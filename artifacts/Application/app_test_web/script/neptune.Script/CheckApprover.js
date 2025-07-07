function checkApprover(approval_id) {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const whereClause = {
        is_active: true,
        approval_type_id: approval_id,
        approver_id: storedUser.employee_id
    };

    const options = {
        parameters: {
            where: JSON.stringify(whereClause)
        }
    };

    // Ambil data approver
    return apiGetApproverList(options)
        .then(function(response) {
            const approverArray = response || [];
            // Jika ada minimal satu data, berarti user ini adalah approver
            console.log(approverArray.length > 0)
            return approverArray.length > 0;

        })
        .catch(function(error) {
            console.error("Gagal mengambil data approver:", error);
            return false; // Asumsikan bukan approver jika gagal ambil data
        });
}
