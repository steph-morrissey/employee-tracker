const Department = require("./Department");

class Employee extends Department {
  constructor(
    department_id,
    name,
    employee_id,
    first_name,
    last_name,
    role_id,
    manager_id
  ) {
    super(department_id, name);
    this.employee_id = employee_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }
  getEmployeeId() {
    return this.employee_id;
  }
  getFirstName() {
    return this.first_name;
  }
  getLastName() {
    return this.last_name;
  }
  getRoleId() {
    return this.role_id;
  }
  getManagerId() {
    return this.manager_id;
  }
}
