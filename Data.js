function initializeData() {
  if (!localStorage.getItem("hr_employees")) {
    const defaultEmployees = [
      { id: "EMP001", name: "Alice Johnson", dept: "Engineering", role: "Software Engineer", phone: "9876543210", status: "Active" },
      { id: "EMP002", name: "Bob Smith", dept: "Marketing", role: "SEO Specialist", phone: "8765432109", status: "Active" },
      { id: "EMP003", name: "Charlie Davis", dept: "HR", role: "HR Manager", phone: "7654321098", status: "Inactive" }
    ];
    localStorage.setItem("hr_employees", JSON.stringify(defaultEmployees));
  }
}
initializeData();
