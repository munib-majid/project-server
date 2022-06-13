const Joi = require('joi');
const {UserModel}=require("../models")
const signupSchema = Joi.object({
    first_name: Joi.string()
    .regex(/^[a-zA-Z]*$/, 'Only Alphabets are allowed')
    .min(3)
    .max(30)
    .required(),
    last_name: Joi.string()
    .regex(/^[a-zA-Z]*$/, 'Only Alphabets are allowed')
    .min(3)
    .max(30)
    .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    confirm_password: Joi.ref('password'),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).external(async (email)=>{
            let user=await UserModel.findOne({email});
            if(user){
                throw new Error("Email Already Exists!");
            }
        })
});



module.exports ={
    signupSchema
}
