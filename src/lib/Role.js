const Department = require("./Department");

class Role extends Department {
  constructor(department_id, name, role_id, title, salary, department_id) {
    super(department_id, name);
    this.role_id = role_id;
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }
  getRoleId() {
    return this.role_id;
  }
  getTitle() {
    return this.title;
  }
  getSalary() {
    return this.title;
  }
  getDepartmentId() {
    return this.department_id;
  }
}
