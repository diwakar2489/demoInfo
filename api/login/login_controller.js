const { getUserByUserEmail } = require("./login_model");

const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const ApiError = require('../../utils/errors/ApiError');
// const log4js = require("log4js");
// log4js.configure({
//   appenders: { login: { type: "file", filename: "errorLogger.log" } },
//   categories: { default: { appenders: ["login"], level: "error" } },
// });

// const logger = log4js.getLogger("login");
const logger = require("../../utils/errors/Logger")

module.exports = {
  
  login: async (req, res, next) => {
    try {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) => {
        //console.log(err);return false;
        if (err) { 
          logger.error(`Database server not respond error ${err}`);
         next(ApiError.internal(`Database server not respond`, 500));
        return  }
        const isMatch = compareSync(body.password, results.password);
        if (!isMatch) { return next(ApiError.badRequest('Invalid email or password', 400)); }
        //console.log(results)
        const userId = results.id;
        const name = results.name;
        const img = results.user_img
        const email = results.email;
        const role_id = results.role_id;
        const dept_id = results.dept_id;
        const DepartmentName = results.dept_name;
        const RoleName = results.role_name;
        const systemRole = results.systemRole;
        const password = results.password = undefined;
        const jsontoken = sign({ userId, name, img, email, role_id, dept_id, systemRole, password, DepartmentName, RoleName }, process.env.JWT_KEY, {
          expiresIn: "1h"
        });
        return res.json({
          status: true,
          msg: "login successfully",
          token: jsontoken
        });

      });
    } catch (error) {
      if (error.isJoi === true)
        return next(ApiError.internal('Somthing is went Wrong!', 500))
      next(error)
    }
  },
  
};