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
          name: "Update employee roll",
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

  if (selection === "viewAll") {
    console.log("hello");
  }
  if (selection === "employeesByDept") {
    console.log("employeesByDept");
  }
  if (selection === "employeeByRoles") {
    console.log("employeeByRoles");
  }
  if (selection === "employeesByManager") {
    console.log("employeesByManager");
  }
  if (selection === "addEmployee") {
    console.log("addEmployee");
  }
  if (selection === "addDepartment") {
    console.log("addDepartment");
  }
  if (selection === "addRole") {
    console.log("addRole");
  }
  if (selection === "removeEmployee") {
    console.log("removeEmployee");
  }
  if (selection === "updateRole") {
    console.log("updateRole");
  }
  if (selection === "updateManager") {
    console.log("updateManager");
  }
};

const onConnect = () => {
  console.log("connection successful");

  init();
};

connection.connect(onConnect);
