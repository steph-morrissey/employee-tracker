// Required variables
const inquirer = require("inquirer");
const mysql = require("mysql");

// Configuration options for connecting to the database
const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
};

const connection = mysql.createConnection(config);

const choices = (rows, property, id) => {
  console.log("rows", rows);
};
const init = async () => {
  // Questions for the employee tracker
  const generateMenu = [
    {
      type: "list",
      name: "selection",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all employees",
          value: "viewAll",
          short: "View All Employees",
        },
        {
          name: "View employees by department",
          value: "employeesByDept",
          short: "Employees By Department",
        },
        {
          name: "View employees by Roles",
          value: "employeeByRoles",
          short: "Employees by roles",
        },
        {
          name: "View employees by manager",
          value: "employeesByManager",
          short: "Employees By Manager",
        },
        {
          name: "Add employee",
          value: "addEmployee",
          short: "Add Employee",
        },
        {
          name: "Add Department",
          value: "addDepartment",
          short: "Add Department",
        },
        {
          name: "Add role",
          value: "addRole",
          short: "Add Role",
        },
        {
          name: "Remove employee",
          value: "removeEmployee",
          short: "Remove Employee",
        },
        {
          name: "Update employee role",
          value: "updateRole",
          short: "Update Role",
        },
        {
          name: "Update employee manager",
          value: "updateManager",
          short: "Update Employee Manager",
        },
      ],
    },
  ];

  // Prompt the user with options available
  const { selection } = await inquirer.prompt(generateMenu);

  // View all employees
  if (selection === "viewAll") {
    const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee LEFT JOIN role on employee.role_id = role.id
    LEFT JOIN department on role.department_id = department.id
    LEFT JOIN employee manager on manager.id = employee.manager_id;
    `;

    const onQuery = (err, rows) => {
      if (err) throw err;
      console.table(rows);
      init();
    };

    connection.query(query, onQuery);
  }

  // View all employees by department
  if (selection === "employeesByDept") {
    const query = "SELECT * FROM department";

    const onQuery = async (err, rows) => {
      if (err) throw err;

      const choices = rows.map((row) => {
        return {
          name: row.name,
          value: row.id,
          short: row.name,
        };
      });

      const questions = [
        {
          message: "Select a department:",
          name: "departmentId",
          type: "list",
          choices,
        },
      ];

      const { departmentId } = await inquirer.prompt(questions);

      const queryEmployeesByDepartment = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department
      FROM employee LEFT JOIN role on employee.role_id = role.id
      LEFT JOIN department on role.department_id = department.id
      WHERE department.id = ${departmentId};
      `;

      const onEmployeeQuery = (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
      };

      connection.query(queryEmployeesByDepartment, onEmployeeQuery);
    };
    connection.query(query, onQuery);
  }

  // View all employees by role
  if (selection === "employeeByRoles") {
    const query = "SELECT * FROM role";

    const onQuery = async (err, roles) => {
      if (err) throw err;

      const choices = roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
          short: role.title,
        };
      });

      const questions = [
        {
          message: "Select a role:",
          name: "roleId",
          type: "list",
          choices,
        },
      ];

      const { roleId } = await inquirer.prompt(questions);

      const queryEmployeesByRole = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department
      FROM employee LEFT JOIN role on employee.role_id = role.id
      LEFT JOIN department on role.department_id = department.id
      WHERE role.id = ${roleId}
      `;

      const onEmployeeQuery = (err, employees) => {
        if (err) throw err;
        console.table(employees);
        init();
      };

      connection.query(queryEmployeesByRole, onEmployeeQuery);
    };

    connection.query(query, onQuery);
  }
};

const onConnect = () => {
  console.log("connection successful");

  init();
};

connection.connect(onConnect);
