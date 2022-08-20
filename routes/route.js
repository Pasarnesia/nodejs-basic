const express = require("express");

module.exports = () => {
    const router = express.Router();
    router.get("/mahasiswa", (req, res) => {
        res.send("mhs ok");
    });
    return router;
}
