const bcrypt= require("bcrypt");
const {UserModel}=require("../models");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/error.js")

class UserController{
    async signin(req, res, next) {
       
          const { email, password } = req.body;
          const user = await UserModel.findOne({ email });
          if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
              const token = jwt.sign(
                {
                  id:user._id,
                },
                "secret"
              );
              return res
                .status(200)
                .json({success:true, message: "Login Successfull",data: {user, token} });
            }
          } 
            throw new ErrorResponse("Email or Password Incorrect!",422);
          
        
      }
    async signup(req,res){
            const { first_name, last_name, email, password } = req.body;
            console.log( { first_name, last_name, email, password });
             bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(password, salt, async (err, hash) => {
                const user = new UserModel({
                  first_name,
                  last_name,
                  email,
                  password: hash,
                });
      
                await user.save();
      
                return res.status(200).json({success:true, message: "Signup Successfull", data:user });
              });
            });
         
    }
}

module.exports = UserController;