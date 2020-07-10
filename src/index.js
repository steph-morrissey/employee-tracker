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

// Creating connection using config options
const connection = mysql.createConnection(config);

// Function that initialises menu options
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

  // View all employees by manager
  if (selection === "employeesByManager") {
    const queryManagers = `
    SELECT employee.id, employee.first_name, employee.last_name FROM employee
    INNER JOIN (SELECT DISTINCT(manager_id) FROM employees_db.employee WHERE manager_id IS NOT NULL) as manager
    on employee.id = manager.manager_id
    `;

    const onQuery = async (err, managers) => {
      if (err) throw err;

      const choices = managers.map((manager) => {
        return {
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
          short: `${manager.first_name} ${manager.last_name}`,
        };
      });

      const questions = [
        {
          message: "Select a manager:",
          name: "managerId",
          type: "list",
          choices,
        },
      ];

      const { managerId } = await inquirer.prompt(questions);

      const queryEmployeesByRole = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department
      FROM employee LEFT JOIN role on employee.role_id = role.id
      LEFT JOIN department on role.department_id = department.id
      WHERE employee.manager_id = ${managerId}
      `;

      const onEmployeeQuery = (err, employees) => {
        if (err) throw err;
        console.table(employees);
        init();
      };

      connection.query(queryEmployeesByRole, onEmployeeQuery);
    };

    connection.query(queryManagers, onQuery);
  }

  // Add a department
  if (selection === "addDepartment") {
    const questions = [
      {
        message: "What is the name of the department?",
        name: "name",
      },
    ];

    const { name } = await inquirer.prompt(questions);

    const query = `INSERT INTO department (name) VALUES ("${name}") `;

    const onQuery = (err) => {
      if (err) throw err;
      console.log("Successfully created a department");
      init();
    };

    connection.query(query, onQuery);
  }

  // Add a role
  if (selection === "addRole") {
    const queryDepartments = "SELECT * FROM department";

    const onQuery = async (err, departments) => {
      if (err) throw err;

      const choices = departments.map((department) => {
        return {
          name: department.name,
          value: department.id,
          short: department.name,
        };
      });

      const questions = [
        {
          message: "What is the role title?",
          name: "title",
          type: "input",
        },
        {
          message: "What is the salary?",
          name: "salary",
          type: "input",
        },
        {
          message: "What department does the role belong to?",
          name: "departmentId",
          type: "list",
          choices,
        },
      ];

      const { title, salary, departmentId } = await inquirer.prompt(questions);

      const addRoleQuery = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${parseFloat(
        salary
      )}, ${parseInt(departmentId)})`;

      const onAddRole = (err) => {
        if (err) throw err;
        console.log("Successfully added role to DB");
        init();
      };

      connection.query(addRoleQuery, onAddRole);
    };

    connection.query(queryDepartments, onQuery);
  }

  // Add an employee
  if (selection === "addEmployee") {
    const queryRoles = "SELECT * FROM role";

    const onQuery = async (err, rows) => {
      if (err) throw err;
      const roles = rows;

      const choices = roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
          short: role.title,
        };
      });

      const questions = [
        {
          message: "What is your first name?",
          name: "firstName",
          type: "input",
        },
        {
          message: "What is your last name?",
          name: "lastName",
          type: "input",
        },
        {
          message: "Select a role:",
          name: "roleId",
          type: "list",
          choices: choices,
        },
      ];

      const answers = await inquirer.prompt(questions);

      const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${answers.firstName}", "${answers.lastName}", ${answers.roleId})`;

      const onEmployeeAddQuery = (err) => {
        if (err) throw err;
        console.log("Successfully added employee to DB");
        init();
      };

      connection.query(addEmployeeQuery, onEmployeeAddQuery);
    };

    connection.query(queryRoles, onQuery);
  }

  // Remove employee
  if (selection === "removeEmployee") {
    const allEmployeesQuery = "SELECT * FROM employee";

    const onAllEmployeesQuery = async (err, employees) => {
      if (err) throw err;

      const choices = employees.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
          short: `${employee.first_name} ${employee.last_name}`,
        };
      });

      const questions = [
        {
          message: "Select an employee:",
          name: "employeeId",
          type: "list",
          choices,
        },
      ];

      const { employeeId } = await inquirer.prompt(questions);

      const deleteEmployeeQuery = `DELETE FROM employee WHERE id=${employeeId}`;

      const onDeleteEmployeeQuery = (err) => {
        if (err) throw err;
        console.log("Deleted employee successfully from DB");
        init();
      };

      connection.query(deleteEmployeeQuery, onDeleteEmployeeQuery);
    };

    connection.query(allEmployeesQuery, onAllEmployeesQuery);
  }

  // Update a role
  if (selection === "updateRole") {
    const allRolesQuery = "SELECT * FROM role";

    const onAllRolesQuery = async (err, roles) => {
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
          message: "Select a role you wish to update:",
          name: "roleId",
          type: "list",
          choices,
        },
        {
          message: "Enter updated role name:",
          name: "updateRoleId",
          type: "input",
        },
      ];

      const { roleId, updateRoleId } = await inquirer.prompt(questions);
      console.log(roleId, updateRoleId);
      const updateRoleQuery = `UPDATE role SET role.title = "${updateRoleId}" WHERE role.id = ${roleId}`;

      const onUpdateRoleQuery = (err) => {
        if (err) throw err;
        console.log("Updated role successfully in DB");
        init();
      };
      connection.query(updateRoleQuery, onUpdateRoleQuery);
    };
    connection.query(allRolesQuery, onAllRolesQuery);
  }

  // Update an employees manager
  if (selection === "updateManager") {
    const allEmployeesQuery = "SELECT * FROM employee";

    const onAllEmployeesQuery = async (err, employees) => {
      if (err) throw err;

      const choices = employees.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
          short: `${employee.first_name} ${employee.last_name}`,
        };
      });

      const questions = [
        {
          message: "Select employee to alter manager:",
          name: "employeeId",
          type: "list",
          choices,
        },
        {
          message: "Select chosen employees manager:",
          name: "updateManagerId",
          type: "list",
          choices,
        },
      ];

      const { employeeId, updateManagerId } = await inquirer.prompt(questions);

      const updateManagerQuery = `UPDATE employee SET employee.manager_id = "${updateManagerId}" WHERE employee.id = ${employeeId}`;
      console.log(updateManagerQuery);
      const onUpdateManagerQuery = (err) => {
        if (err) throw err;
        console.log("Updated manager successfully in DB");
        init();
      };
      connection.query(updateManagerQuery, onUpdateManagerQuery);
    };
    connection.query(allEmployeesQuery, onAllEmployeesQuery);
  }

  // Exit the menu
  if (selection === "end") {
    process.exit();
  }
};

// Callback that executed init() once connect is successful
const onConnect = () => {
  console.log("connection successful");

  init();
};

// Connecting to db
connection.connect(onConnect);
