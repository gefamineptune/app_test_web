function formatDateTime(date) {
  const pad = (n) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatTime(timestamp) {
  const date = new Date(Number(timestamp));
  
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  return date.toLocaleString("en-GB", options).replace(",", "");
}


function formatDate(date) {
  const d = new Date(date); // konversi string ke Date
  const pad = (n) => n.toString().padStart(2, "0");

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());

  return `${year}-${month}-${day}`;
}


