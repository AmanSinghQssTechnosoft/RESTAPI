const express = require("express");
const app = express();

const dbEmp = require("./employee");
app.use(express.json());

const PORT = 5000;
app.post("/add", dbEmp.createEmployee);
app.get("/all", dbEmp.getEmployees);
app.get("/:id", dbEmp.getEmployeeById);
app.put("/:id", dbEmp.updateEmployee);
app.delete("/:id", dbEmp.deleteEmployee);
app.listen(PORT, () => console.log(`server is running ${PORT}`));
