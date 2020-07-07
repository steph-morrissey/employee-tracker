DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

-- creates a table for DEPARTMENT
CREATE TABLE department
(
    id INT
    UNSIGNED  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
    (30) UNIQUE NOT NULL
);

    -- create table for ROLE
    CREATE TABLE role
    (
        id INT
        UNSIGNED 
        AUTO_INCREMENT NOT NULL PRIMARY KEY ,
		title VARCHAR
        (30) NOT NULL,
		salary DECIMAL NOT NULL,
        department_id INT UNSIGNED NOT NULL,
		CONSTRAINT fk_department FOREIGN KEY
        (department_id) REFERENCES department
        (id) ON
        DELETE CASCADE
       
);

        -- create table for EMPLOYEES
        CREATE TABLE employee
        (
            id INT
            UNSIGNED
            AUTO_INCREMENT NOT NULL PRIMARY KEY,
			first_name VARCHAR
            (30),
			last_name VARCHAR
            (30),
			role_id INT UNSIGNED NOT NULL,
            manager_id INT UNSIGNED NULL,
            CONSTRAINT fk_role FOREIGN KEY
            (role_id) REFERENCES role
            (id) ON
            DELETE CASCADE,
            CONSTRAINT fk_manager FOREIGN KEY
            (manager_id) REFERENCES employee
            (id) ON
            DELETE
            SET NULL
            );
