const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "aman",
  port: 5432,
});

const createEmployee = (req, res) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO employees (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (err, result) => {
      if (err) {
        console.error(err);
        return err;
      }

      res.status(201).json({
        msg: "Created successfully",
        data: result.rows[0],
      });
    }
  );
};
const getEmployees = (req, res) => {
  pool.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      throw err;
    }
    res.json({
      data: result.rows,
    });
  });
};
const getEmployeeById = (req, res) => {
  let id = parseInt(req.params.id);

  pool.query(`SELECT * FROM employees where id=$1`, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({
      data: result.rows,
    });
  });
};
const updateEmployee = (req, res) => {
  let id = parseInt(req.params.id);
  const { name, email } = req.body;
  pool.query(
    "UPDATE employees SET name=$1,email=$2  WHERE id=$3",
    [name, email, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json({
        data: "updates successfully",
      });
    }
  );
};
const deleteEmployee = (req, res) => {
  const { id } = parseInt(req.params.id);
  pool.query(`DELETE from employees WHERE id =$1`, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({
      data: "sucessfully deleted",
    });
  });
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
