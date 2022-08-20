const express = require("express")
const app = express()
const port = 10001
const prefix = "/"
const bodyParser = require("body-parser")

const mysql = require("mysql2");
const pool = mysql.createPool({
    user: "root",
    password: "",
    host: "localhost",
    // PORT Diisi 3306
    port: 3307,
    database: "unpkediri"
});
const mysqlpool = pool.promise();

app.use(bodyParser.json());

app.get("/mhs", async (req, res) => {
    // let name = req.query.name;
    let { name } = req.query
    let [row] = await mysqlpool.query("select * from mahasiswa");
    console.log(row);
    res.json(row);
});

app.post("/mhs", async(req, res) => {
    try {
        let name = req.body.name;
        let npm = req.body.npm;
        if(!name || !npm) throw new Error("item required");
        let data = { name, npm }
        let [row] = await mysqlpool.query("insert into mahasiswa set ? ", data);
        res.send("OK");
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
});

// app.use(prefix, require("./routes/route")());


app.listen(port, () => {
    console.log("listening to port " + port)
})
    