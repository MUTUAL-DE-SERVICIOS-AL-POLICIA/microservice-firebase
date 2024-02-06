const { request, response } = require("express");
const pdfToPrinter = require('pdf-to-printer');
const path = require('path');

const fs = require('fs');
// const launchPrinter = async (req = request, res = response) => {
//     try {
//         const pdfUrl = req.body.path;
//         let pages = req.body.pages;
//         console.log("all printers: ", pdfToPrinter.getPrinters().then(console.log))

//         const defaultPrinter = await pdfToPrinter.getDefaultPrinter()
//         console.log("default printer: ", defaultPrinter)

//         if(Object.keys(defaultPrinter).length != 0) {
//             if(pages == null || pages == undefined) pages = 1
//             const options = {
//                 printer: defaultPrinter.name,
//                 pages: pages,
//                 paperSize: "Ejecutivo",
//                 scale: "fit"
//             }
//             await pdfToPrinter.print(pdfUrl, options)
//             res.json({
//                 message: "Successfull print",
//                 data: [ options ]
//             })
//         } else res.status(400).json({
//             message: "No printer available",
//             data: []
//         })
//     } catch(error) {
//         console.log(error)
//         res.status(500).json({
//             message: "An error ocurred",
//             data: []
//         })
//     }
// }

const launchPrinter = async (req = request, res = response) => {
    try {
        console.log(req.files);
        const _path = req.files[0].path;
        // console.log("PDF almacenado temporalmente");
        const filePathAbsolute = path.resolve('', _path);
        console.log(filePathAbsolute);

        const defaultPrinter = await pdfToPrinter.getDefaultPrinter();
        console.log("Impresora predeterminada: ", defaultPrinter);

        let pages = 1;
        if (Object.keys(defaultPrinter).length !== 0) {
            if (pages == null || pages == undefined) pages = 1;
            const options = {
                printer: defaultPrinter.name,
                pages: pages,
                paperSize: "Ejecutivo",
                scale: "fit"
            };

            // await pdfToPrinter.print(pdfFileName, options);
            await pdfToPrinter.print(filePathAbsolute, options);
            
            // fs.unlinkSync(pdfFileName); // Eliminar el archivo temporal después de la impresión

            res.json({
                message: "Impresión exitosa",
                data: [options]
            });
        } else {
            res.status(400).json({
                message: "No hay impresora disponible",
                data: []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ocurrió un error",
            data: []
        });
    }
};

module.exports = {
    launchPrinter,
};