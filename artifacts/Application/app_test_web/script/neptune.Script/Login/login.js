function login(username, password) {
  const options = {
    parameters: {
      where: JSON.stringify({ username, password })
    }
  };

  return apiTestEmployee(options)
    .then(function(response) {
      const user = (response && response[0]) || null;

      if (user && user.id) {
        // console.log("Login berhasil:", user);

        // Ambil hanya field yang dibutuhkan
        const userMinimal = {
          nama: user.name,
          employee_id : user.id,
          username: user.username,
          position_id: user.position_id,
          branch_code: user.branch_id,
          department_id: user.department_id
        };

        // Simpan hanya data yang dibutuhkan
        localStorage.setItem("user", JSON.stringify(userMinimal));
        SideNavigation.setVisible(true)
        ToolHeader.setVisible(true)
        App.to(PageDashboard)
        getTableSummary()
        Column();
        countData()
        profilName.setText(user.name)
        return userMinimal;
      } else {
        // Use MessageToast
        sap.m.MessageToast.show("Login gagal");   
        return null;
      }
    })
    .catch(function(error) {
      
      return null;
    });
}
