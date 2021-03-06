const Employee = require('../db/schemas/employee')
const bcrypt = require('bcrypt')

const EmployeeController = {

    // GET all employees
    getAllEmployees : async (req, res) => {
        try {
            const allEmployees = await Employee.find()
            res.json(allEmployees)
        } catch (error) {
            res.status(400).json({ message: (error) })
        }
    },

    // GET employee by Id
    getEmployeeById : async (req, res) => {
        try {
            const { id } = req.params
            const employee = await Employee.findById(id)
            res.json(employee)
        } catch (error) {
            res.status(400).json({ message: (error) })
        }
    },

        // GET employee by Id
        getEmployeesByWC: async (req, res) => {
            try {
                const { wcID } = req.params
                const employee = await Employee.find({wc_id: wcID})
                res.json(employee)
            } catch (error) {
                res.status(400).json({ message: (error) })
            }
        },

    // POST create new employee
    // Needs Authorization
    createNewEmployee : async (req, res) => {
        // send: dept_num, first_name, last_name, wc_id, pay, salary, start_date

        req.body.email = (req.body.first_name.charAt(0) + req.body.last_name).toLowerCase() + "@g2systems.com"
        let password = req.body.first_name + req.body.last_name.charAt(0) + 123

        try {
            let currentEmployees = await Employee.find()
            req.body.id_num = currentEmployees.length + 1
            req.body.password = await bcrypt.hash(password, 10)
            const newEmployee = await Employee.create(req.body)
            res.json({ message: `${newEmployee.first_name},${newEmployee.last_name} successfully created`})
        } catch (error) {
            res.status(400).json({ message: (error) })
        }
    },

    // PUT update employee by Id
    // Needs Authorization
    updateEmployeeById : async (req, res) => {
        try {
            const { id } = req.params
            const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body)
            res.json({ message: `${updatedEmployee.first_name}, ${updatedEmployee.last_name} was updated`})
        } catch (error) {
            res.status(401).json({ message: (error) })
        }
    },

    // DELETE employee by Id
    // Needs Authorization
    deleteEmployeeById : async (req, res) => {
        try {
            const { id } = req.params
            const deletedUser = await Employee.findByIdAndDelete(id)
            res.json({ message: `successfully deleted ${deletedUser.first_name}, ${deletedUser.last_name}`})
        } catch (error) {
            res.status(401).json({ message: (error) })
        }
    }
}

module.exports = EmployeeController