const ROLES_FILE = __dirname + "/roles.txt";
const fs = require("fs");

const checkRole = ({ rules, scope, action, role }) => {};

module.exports = (scope) => (req, res, next) => {
  const role = req.headers["x-role"];
  if (!role) {
    return res.status(403).send();
  }
  fs.readFile(ROLES_FILE, "utf-8", (err, data) => {
    if (err) {
      return res.status(403).send();
    }
    const [scope, action] = scope.split(".");
    const rules = JSON.parse(data.toString("utf8").replace(/^\uFEFF/, ""));
    const checkIsAllowed = {
      rules,
      scope,
      action,
      role,
    };
    if (checkIsAllowed) {
      next();
      return;
    }
    return res.status(403).send();
  });
};
