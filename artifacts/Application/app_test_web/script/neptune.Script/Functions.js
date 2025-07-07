// HITUNG SELISIH HARI
function DiffDays(dt1, dt2) {
  debugger;
  function parseDate(d) {
    if (d instanceof Date) {
      return d;
    } else if (typeof d === 'string') {
      // Format: "DD/MM/YY"
      const parts = d.split('/');
      if (parts.length === 3) {
        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1; // Bulan 0-11
        let year = parseInt(parts[2], 10);

        if (year < 100) {
          year += 2000;
        }

        return new Date(Date.UTC(year, month, day));
      }
    }
    throw new Error('Invalid date input');
  }

  const date1 = parseDate(dt1);
  const date2 = parseDate(dt2);

  const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  const diffMilliseconds = utcDate2 - utcDate1;
  const diffDays = diffMilliseconds / (1000 * 60 * 60 * 24);

  return Math.trunc(diffDays);
}

// HITUNG SELISIH JAM
function hitungSelisihJam(waktuAwal, waktuAkhir) {
  // Format ulang: ubah titik jadi titik dua agar bisa diparse oleh Date
  let formatWaktu = (waktu) =>
    waktu.replace(/(\d{2})\.(\d{2})\.(\d{2})$/, "$1:$2:$3");

  let awal = new Date(formatWaktu(waktuAwal));
  let akhir = new Date(formatWaktu(waktuAkhir));

  // Hitung selisih dalam milidetik
  let selisihMs = Math.abs(akhir - awal);

  // Konversi ke jam
  let selisihJam = selisihMs / (1000 * 60 * 60);

  // Bulatkan ke 2 angka desimal
  return selisihJam.toFixed(2); // hasil string, misal: "6.21"
}
