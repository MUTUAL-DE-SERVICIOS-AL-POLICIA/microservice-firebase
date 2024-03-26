const { Router } = require("express");

const { launchPrinter } = require("../controllers/printer.controller");

const router = Router();
const multer = require('multer')
const fs = require('fs');

// Creando la carpeta
const uploadsFolder = 'uploads'

if(!fs.existsSync(uploadsFolder)){
    fs.mkdirSync(uploadsFolder)
}

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Define la carpeta de destino para guardar los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Utiliza el nombre original del archivo
    }
});

const upload = multer({ storage: storage });

router.post(
    "/print",
    upload.array('pdfFile'),
    launchPrinter
);

module.exports = router;
