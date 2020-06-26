const inquirer = require("inquirer");

const generateQuestions = [
  {
    type: "list",
    name: "selection",
    message: "What would you like to do?",
    choices: [
      { value: "View all Employees" },
      { value: "View all Employees by Department" },
      { value: "View all Employees by Manager" },
      { value: "Add an Employee" },
      { value: "Remove and Employee" },
      { value: "Remove an Employee" },
      { value: "Update an Employee Role" },
      { value: "Update Employee Manager" },
    ],
  },
];
const doThis = (answers) => {
  console.log(answers);
};
inquirer.prompt(generateQuestions).then(doThis);
