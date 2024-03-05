import multer from "multer";
import path from "path";

//set up the storage
//this will also transform the formData (which we didn't transform into a useable object) into a  req.body
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//instantiate multer to a varaible using the storage we created
const upload = multer({ storage });

export default upload;
