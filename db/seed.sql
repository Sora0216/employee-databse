 -- Populate departments
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance');

-- Populate roles
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', 80000, 1), ('Software Engineer', 120000, 2), ('Accountant', 75000, 3);

-- Populate employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Jim', 'Brown', 3, 1);
