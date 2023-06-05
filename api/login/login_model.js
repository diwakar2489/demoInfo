const connectionRequest = require("../../config/database");
dbConn = connectionRequest()
module.exports = {
  getUserByUserEmail: (email, callBack) => {
  const db = dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,UD.profile_img as user_img,U.user_type,U.system_role_id as systemRole,U.email,U.password,U.alt_email,U.dept_id,U.role_id,U.status,R.name as role_name,D.name as dept_name from user as U ' +
      'join user_detail as UD on UD.user_id = U.id ' +
      'left join department as D on D.id = U.dept_id ' +
      'left join role as R on R.id = U.role_id where U.email = "' + email + '"', (error, results) => {
       // console.log(db.sql);return false;
        if (error) {
          callBack(error);
          dbConn.destroy();
        } else {
          //console.log(res);return false;
          callBack(null, results[0]);
          dbConn.destroy();
        }
      })
  },
};