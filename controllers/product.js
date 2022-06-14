const bcrypt= require("bcrypt");
const {UserModel,CategoryModel,BrandModel,ProductModel}=require("../models");
const ErrorResponse = require("../utils/error.js");
const {productSchema}=require("../utils/validation.js");
class ProductController{
    async create(req, res, next) {
      let images=req.files.map((el)=>{
        return el.path;
      })
      // return res.json(images);

      if(req.files.length==0){
        throw new ErrorResponse("Upload atleast one image",422);
      }
      const {name,description,price,brand_id}=req.body
          const value=await productSchema.validateAsync({name,description,price,brand_id});
          const product=await ProductModel.create({...value,images})
          return res
          .status(200)
          .json({success:true, message: "Successfull",data: {product} });
      }
      async update(req, res, next) {
        const {id}=req.params;
        const value=await productSchema.validateAsync(req.body);
        const product=await ProductModel.findOneAndUpdate(id,{...value}, {
          new: true
        })
        return res
        .status(200)
        .json({success:true, message: "Successfull",data: {product} });
    }
    async getAll(req, res, next) {
      const products=await ProductModel.find()
      return res
      .status(200)
      .json({success:true, message: "Successfull",data: {products} });
  }
  async getById(req, res, next) {
    const {id}=req.params;
    const product=await ProductModel.findOne({id})
    return res
    .status(200)
    .json({success:true, message: "Successfull",data: {product} });
}
async deleteById(req, res, next) {
  const {id}=req.params;
  const product=await ProductModel.findOne({id});

  await product.delete();
  return res
  .status(200)
  .json({success:true, message: "Successfull",data: {product} });
}
}

module.exports = ProductController;