const { Router } = require("express");

const {
    launchPrinter,
} = require("../controllers/printer.controller");

const router = Router();


router.post(
    "/print",
    launchPrinter
);

module.exports = router;
