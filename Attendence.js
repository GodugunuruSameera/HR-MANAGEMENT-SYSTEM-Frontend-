function loadEmployeesForAttendance() {
  const select = document.getElementById("attEmpSelect");
  if (!select) return;
  let employees = JSON.parse(localStorage.getItem("hr_employees")) || [];
  select.innerHTML = '<option value="">Select Employee</option>';
  employees.forEach(emp => select.innerHTML += `<option value="${emp.name}">${emp.name} (${emp.id})</option>`);
}

function markAttendance(e) {
  e.preventDefault();
  let name = document.getElementById("attEmpSelect").value;
  let status = document.getElementById("attStatus").value;
  if (!name || !status) return alert("Please select an employee and status.");

  let records = JSON.parse(localStorage.getItem("hr_attendance")) || [];
  let date = new Date().toLocaleDateString();
  
  // Prevent double marking
  if(records.some(r => r.name === name && r.date === date)) return alert("Attendance already marked for today!");

  records.push({ name, status, date });
  localStorage.setItem("hr_attendance", JSON.stringify(records));
  document.getElementById("attForm").reset();
  renderAttendance();
}

function renderAttendance() {
  const tbody = document.getElementById("attTableBody");
  if (!tbody) return;
  let records = JSON.parse(localStorage.getItem("hr_attendance")) || [];
  tbody.innerHTML = "";
  if (records.length === 0) return tbody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>No records found.</td></tr>";

  records.slice().reverse().forEach(record => {
    let badge = record.status === "Present" ? "active" : "inactive";
    tbody.innerHTML += `<tr><td>${record.date}</td><td>${record.name}</td><td><span class="badge ${badge}">${record.status}</span></td></tr>`;
  });
}

document.addEventListener("DOMContentLoaded", () => { loadEmployeesForAttendance(); renderAttendance(); });
