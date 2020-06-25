DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

-- creates a table for DEPARTMENT
CREATE TABLE departments
(
    id INT
    AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR
    (30) NOT NULL
);

    -- create table for ROLE
    CREATE TABLE role
    (
        id INT
        AUTO_INCREMENT PRIMARY KEY NOT NULL,
		title VARCHAR
        (30),
		salary DECIMAL,
		department_id INT REFERENCES departments
        (id)
);

        -- create table for EMPLOYEES
        CREATE TABLE employees
        (
            id INT
            AUTO_INCREMENT PRIMARY KEY departmentsemployeesroleNOT NULL,
			first_name VARCHAR
            (30),
			last_name VARCHAR
            (30),
			role_id INT REFERENCES role
            (id),
            manager_id INT REFERENCES employees
            (id)
)