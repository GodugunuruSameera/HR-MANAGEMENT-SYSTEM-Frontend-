function loadEmployeesForPayroll() {
  const select = document.getElementById("payEmpSelect");
  if (!select) return;
  let employees = JSON.parse(localStorage.getItem("hr_employees")) || [];
  select.innerHTML = '<option value="">Select Employee</option>';
  employees.forEach(emp => select.innerHTML += `<option value="${emp.name}">${emp.name} (${emp.id})</option>`);
}

function calculatePayroll(e) {
  e.preventDefault();
  let empName = document.getElementById("payEmpSelect").value;
  let basic = parseFloat(document.getElementById("basicSalary").value);
  let allowance = parseFloat(document.getElementById("allowances").value) || 0;
  let deduction = parseFloat(document.getElementById("deductions").value) || 0;

  if (!empName || isNaN(basic)) return alert("Select employee and enter basic salary.");

  let netSalary = (basic + allowance) - deduction;
  let date = new Date().toLocaleDateString();

  let payrolls = JSON.parse(localStorage.getItem("hr_payrolls")) || [];
  payrolls.push({ empName, basic, allowance, deduction, netSalary, date });
  localStorage.setItem("hr_payrolls", JSON.stringify(payrolls));

  document.getElementById("payrollForm").reset();
  renderPayrollHistory();
}

function renderPayrollHistory() {
  const historyDiv = document.getElementById("payrollHistory");
  if (!historyDiv) return;
  let payrolls = JSON.parse(localStorage.getItem("hr_payrolls")) || [];
  historyDiv.innerHTML = "";
  if (payrolls.length === 0) return historyDiv.innerHTML = "<p>No payroll records.</p>";

  payrolls.slice().reverse().forEach(record => {
    historyDiv.innerHTML += `
      <div class="card" style="border-left: 4px solid var(--accent); margin-top: 15px;">
        <h4 style="color:var(--primary);">${record.empName} - Salary Slip</h4>
        <p style="font-size:0.9rem; color:#64748b;">Date: ${record.date}</p>
        <hr style="margin: 10px 0; border: 0; border-top: 1px solid #e2e8f0;">
        <p>Basic: ₹${record.basic.toFixed(2)} | Allowances: ₹${record.allowance.toFixed(2)} | Deductions: ₹${record.deduction.toFixed(2)}</p>
        <h3 style="margin-top:10px; color:var(--success);">Net Pay: ₹${record.netSalary.toFixed(2)}</h3>
      </div>`;
  });
}

document.addEventListener("DOMContentLoaded", () => { loadEmployeesForPayroll(); renderPayrollHistory(); });
