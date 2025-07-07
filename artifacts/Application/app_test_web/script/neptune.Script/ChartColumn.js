function Column() {
  getChartData().then(function (seriesData) {
    Highcharts.chart('Highchart', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Jumlah Cuti per Departemen'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Jumlah Cuti'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} cuti</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: seriesData // ← Data hasil getChartData dimasukkan di sini
    });
  }).catch(function (err) {
    console.error("Gagal membuat chart:", err);
    sap.m.MessageToast.show("Gagal menampilkan chart cuti.");
  });
}





function getChartData() {
  // Ambil daftar departemen dan employee terlebih dahulu
  return Promise.all([apiGetDepartmentList(), apiTestEmployee()])
    .then(function ([departmentResponse, employeeResponse]) {
      const departmentList = departmentResponse || [];
      const employeeList = employeeResponse || [];

      return apiTestLeave().then(function (leaveResponse) {
        const leaveArray = leaveResponse || [];

        // Siapkan array series untuk Highcharts
        const departmentSeries = departmentList.map(dept => ({
          name: dept.department_name,
          data: Array(12).fill(0) // satu array 12 elemen, default 0
        }));

        leaveArray.forEach(leave => {
          const startDate = new Date(leave.start_date);
          const monthIndex = startDate.getMonth(); // 0 = Jan, ..., 11 = Dec

          // Cari employee dan departemennya
          const employee = employeeList.find(emp => emp.id === leave.employee_id);
          if (!employee) return;

          const department = departmentList.find(d => d.id === employee.department_id);
          if (!department) return;

          const targetSeries = departmentSeries.find(s => s.name === department.department_name);
          if (targetSeries) {
            targetSeries.data[monthIndex]++;
          }
        });

        console.log("Hasil series chart:", departmentSeries);
        console.log(departmentSeries)
        return departmentSeries;
      });
    })
    .catch(function (error) {
      console.error("Gagal mengambil data chart:", error);
      return [];
    });
}

