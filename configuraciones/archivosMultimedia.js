const multer = require('multer'); 

const storage = multer.memoryStorage(); 

const filtro_imagen = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') && (file.mimetype==='image/jpeg' || file.mimetype==='image/png')) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo imagen no valido')); 
    }
};

const filtro_video = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
        cb(null, true); 
    } else {
        cb(new Error('Tipo de archivo video no valido'));
    }
};

const upload = multer({
    storage: storage, 
    fileFilter: function(req, file, cb) {
        if (file.fieldname==='imagen') {
            filtro_imagen(req, file, cb);
        } else {
            filtro_video(req, file, cb);
        }
    }, 
    limits: {
        fileSize: {
            imagen: 1024*1024*6, 
            video: 1024*1024*15,
        },
    },
});


module.exports = upload;