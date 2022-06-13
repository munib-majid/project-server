const jwt = require("jsonwebtoken");

module.exports.admin = async (req, res, next) => {

  try {
    let user=req.user;
    if (!user.admin) {
      return res.status(401).json({success:false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ success:false,message: "Unauthorized" });
  }
};
