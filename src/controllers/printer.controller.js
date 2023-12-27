const { request, response } = require("express");
const pdfToPrinter = require('pdf-to-printer');


const launchPrinter = async (req = request, res = response) => {
    try {
        const pdfUrl = req.body.path;
        let pages = req.body.pages;
        console.log("all printers: ", pdfToPrinter.getPrinters().then(console.log))

        const defaultPrinter = await pdfToPrinter.getDefaultPrinter()
        console.log("default printer: ", defaultPrinter)

        if(Object.keys(defaultPrinter).length != 0) {
            if(pages == null || pages == undefined) pages = 1
            const options = {
                printer: defaultPrinter.name,
                pages: pages,
                paperSize: "Ejecutivo",
                scale: "fit"
            }
            await pdfToPrinter.print(pdfUrl, options)
            res.json({
                message: "Successfull print",
                data: [ options ]
            })
        } else res.status(400).json({
            message: "No printer available",
            data: []
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: "An error ocurred",
            data: []
        })
    }
}

module.exports = {
    launchPrinter
};