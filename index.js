const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const config = dotenv.config();
const errorHandler = require("./middleware/error-handler.js")
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+path.parse(file.originalname).name  + path.extname(file.originalname));
  },
 
});
const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        const err = new Error('Only .png, .jpg and .jpeg format allowed!')
        err.name = 'ExtensionError'
        return cb(err);
    }
}, });
const {
  UserRoutes,ProductRoutes,CategoryRoutes,BrandRoutes,
} = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(upload.array("images"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", UserRoutes);
app.use("/brand", BrandRoutes);
app.use("/category", CategoryRoutes);
app.use("/product", ProductRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(errorHandler);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
