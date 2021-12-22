import multer from 'multer';
import path from 'path';
import shortid from 'shortid';

const __dirname = path.resolve();

const DIR = 'uploads/images';

export default multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join( __dirname, DIR))
    },
    filename: (req, file, cb) => {
        console.log("Image: " + file);
        cb(null, shortid.generate() + '_' + Date.now() + path.extname(file.originalname));
    }
});