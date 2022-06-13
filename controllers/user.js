class UserController{
    async login(req,res){
        res.json({success:true,message:"test"})
    }
    async signup(req,res){
        try {
            const { first_name, last_name, email, password } = req.body;
            await bcrypt.genSalt(10, function (err, salt) {
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
          } catch (error) {
            return res
              .status(422)
              .json({ message: "Some error has occurred while signup" });
          }
    }
}

module.exports = UserController;