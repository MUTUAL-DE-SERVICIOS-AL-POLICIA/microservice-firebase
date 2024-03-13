const { request, response } = require("express");
const pdfToPrinter = require('pdf-to-printer');
const path = require('path');

const fs = require('fs');

const launchPrinter = async (req = request, res = response) => {
    try {
        console.log(req.files);
        const _path = req.files[0].path;
        const filePathAbsolute = path.resolve('', _path);
        console.log(filePathAbsolute);
        const defaultPrinter = await pdfToPrinter.getDefaultPrinter();
        console.log("Impresora predeterminada: ", defaultPrinter);
        if (defaultPrinter != null && Object.keys(defaultPrinter).length !== 0) {
            const options = {
                printer: defaultPrinter.name,
                paperSize: "Ejecutivo",
                scale: "fit"
            };
            await pdfToPrinter.print(filePathAbsolute, options);
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