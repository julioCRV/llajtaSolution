const multer = require('multer'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    }, filename: function (req, file, cb) {
        cb(null, Date.now() +'-'+file.originalname);
    },
});

const upload = multer({
    storage, 
    fileFilter: function (req, file, cb) {
        if (file.mimytype.startsWith('video/mp4') || file.mimytype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no valido')); 
        }
    }, 
    limits: {
        fileSize: 1024*1024*10, 
    },
});

module.exports = {upload};