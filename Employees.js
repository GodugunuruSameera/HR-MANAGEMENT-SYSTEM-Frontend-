const empTableBody = document.getElementById("empTableBody");

function renderEmployees(dataToRender) {
  if (!empTableBody) return;
  empTableBody.innerHTML = "";
  if (dataToRender.length === 0) return empTableBody.innerHTML = "<tr><td colspan='7' style='text-align:center;'>No employees found.</td></tr>";

  dataToRender.forEach((emp) => {
    let badgeClass = emp.status === "Active" ? "active" : "inactive";
    empTableBody.innerHTML += `
      <tr>
        <td><strong>${emp.id}</strong></td><td>${emp.name}</td><td>${emp.dept}</td>
        <td>${emp.role}</td><td>${emp.phone}</td>
        <td><span class="badge ${badgeClass}">${emp.status}</span></td>
        <td><button class="btn-danger" style="padding: 5px 10px;" onclick="deleteEmployee('${emp.id}')">Delete</button></td>
      </tr>`;
  });
}

function addEmployee(e) {
  e.preventDefault();
  let id = document.getElementById("empId").value.trim();
  let name = document.getElementById("empName").value.trim();
  let dept = document.getElementById("empDept").value.trim();
  let role = document.getElementById("empRole").value.trim();
  let phone = document.getElementById("empPhone").value.trim();
  let status = document.getElementById("empStatus").value;

  let employees = JSON.parse(localStorage.getItem("hr_employees")) || [];
  if (employees.some(emp => emp.id === id)) return alert("Employee ID already exists!");

  employees.push({ id, name, dept, role, phone, status });
  localStorage.setItem("hr_employees", JSON.stringify(employees));
  document.getElementById("addEmpForm").reset();
  renderEmployees(employees);
}

function deleteEmployee(empId) {
  if(confirm("Remove this employee?")) {
    let employees = JSON.parse(localStorage.getItem("hr_employees")) || [];
    employees = employees.filter(emp => emp.id !== empId);
    localStorage.setItem("hr_employees", JSON.stringify(employees));
    filterEmployees(); 
  }
}

function filterEmployees() {
  let searchVal = document.getElementById("searchEmp").value.toLowerCase();
  let deptVal = document.getElementById("filterDept").value;
  let employees = JSON.parse(localStorage.getItem("hr_employees")) || [];
  let filtered = employees.filter(emp => 
    (emp.name.toLowerCase().includes(searchVal) || emp.id.toLowerCase().includes(searchVal)) &&
    (deptVal === "" || emp.dept === deptVal)
  );
  renderEmployees(filtered);
}

if (empTableBody) renderEmployees(JSON.parse(localStorage.getItem("hr_employees")) || []);
