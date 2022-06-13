const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

module.exports.auth = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token == undefined) {
    return res.status(401).json({ success:false,message: "Unauthorized" });
  }
  try {
    const { id } = jwt.verify(token, "secret");
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(401).json({ success:false,message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success:false,message: "Unauthorized" });
  }
};
