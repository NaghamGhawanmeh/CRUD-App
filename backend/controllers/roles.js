const roleModel = require("../models/roles");

const createRole = (req, res) => {
  const { role, permissions } = req.body;

  const newRole = new roleModel({ role, permissions });

  newRole
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role Created",
        role: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    });
};

module.exports = {
  createRole,
};
