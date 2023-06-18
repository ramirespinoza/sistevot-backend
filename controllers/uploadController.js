const { upload } = require("../models/upload");

exports.uploadImage = function (req, res, next) {
  upload.single('imagen')(req, res, function (err) {
    if (err) {
       console.error('Error al cargar la imagen:', err);
      return res.status(500).send('Error al cargar la imagen.');
    }
    
    // La imagen se ha subido exitosamente a S3
    res.send('Imagen subida correctamente.');
  });
};