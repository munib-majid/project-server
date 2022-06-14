const express = require("express");
const route = express.Router();
const { BrandController } = require("../controllers");
const controller=new BrandController();
const auth=require("../middleware/auth");
const asyncHandler=require("../utils/asyncHandler.js");

route.post("",  asyncHandler(controller.create));
route.put("/:id",  asyncHandler(controller.update));
route.get("",  asyncHandler(controller.getAll));
route.get("/:id",  asyncHandler(controller.getById));
route.delete("/:id",  asyncHandler(controller.deleteById));

module.exports = route;
