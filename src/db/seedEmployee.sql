USE employees_db;

INSERT INTO department
    (name)
VALUES
    ("Accounting and Finance"),
    ("Research and Development"),
    ("Markerting"),
    ("IT Support");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Financial Accounting", 420000, 1),
    ("Payroll", 35500, 1),
    ("Head Researcher", 40000, 2),
    ("Researcher", 35000, 2),
    ("Marketing Director", 36000, 3),
    ("Markering Analyst", 32000, 3),
    ("Marketing Consultant", 30000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Jane", "Smith", 1, null),
    ("John", "Evans", 2, 1),
    ("James", "Bushell", 3, null),
    ("Alice", "Grimshaw", 4, 3),
    ("Jason", "Clyde", 4, 3),
    ("Taylor", "Bradshaw", 5, null),
    ("Katie", "Bloor", 6, 5),
    ("Liam", "Jamison", 7, 5);