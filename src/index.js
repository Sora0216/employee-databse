const inquirer = require('inquirer');
const { getDepartments, getRoles, getEmployees, updateEmployeeRole } = require('./utils/queries');
const { addDepartmentPrompt } = require('./prompts/departmentPrompts');
const { addRolePrompt } = require('./prompts/rolePrompts');
const { addEmployeePrompt } = require('./prompts/employeePrompts');

const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Employee',
                'Update Employee Role',
                'Exit',
            ],
        },
    ]);

    switch (action) {
        case 'View All Departments':
            const departments = await getDepartments();
            console.table(departments);
            break;
        case 'View All Roles':
            const roles = await getRoles();
            console.table(roles);
            break;
        case 'View All Employee':
            const employees = await getEmployees();
            console.table(employees);
            break;
        case 'Add Department':
            await addDepartmentPrompt();
            break;
        case 'Add Role':
            await addRolePrompt();
            break;
        case 'Add Employee':
            await addEmployeePrompt();
            break;
        case 'Update Employee Role':
            const employeeChoices = (await getEmployees()).map((emp) => ({name: '${emp.first_name} ${emp.last_name}', value: emp.id}));
            const roleChoices = (await getRoles()).map((role) => ({name: role.title, value: role.id}));
            const { employee_id, new_role_id } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: "which employee's role do you want to update?",
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'new_role_id',
                    message: 'Select the new role:',
                    choices: roleChoices,
                },
            ]);
            const updatedEmployee = await updateEmployeeRole(employee_id, new_role_id);
            console.log('Updated employee: ${employee.first_name} ${employee.last_name}');
            break;
        case 'Exit':
            process.exit();
    }
    await mainMenu();
};
mainMenu();