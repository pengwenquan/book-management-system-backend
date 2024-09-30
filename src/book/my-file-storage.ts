import * as multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (err) {
      console.log('err', err)
      cb(null, 'uploads')
    }
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.random() * 1E9 + '-' + file.originalname;

    cb(null, uniqueSuffix)
  }
})

export {
  storage
};