const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const mysql = require ('mysql2');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

app.listen(process.env.PORT || 3000);

var ip="localhost";
var user="root";
var password="root";

const db= mysql.createConnection({host:ip, user ,password, database: "eDoctor",});

// DB conection
// db.connect((err) => {
//     if (err) {
//       throw err;
//     }
//     console.log("MySql Connected");
//   });



app.post("/bath",jsonParser,async (req, response) => {

    titulo=req.body.password;
    var insertado=false;
    console.log('Añadiendo banyo:',[/*variables*/])

    try{
        connection.run(`INSERT INTO bath VALUES(?, ?, ?)`,[/*variables*/], (err, rows) => {
        if (err) {
            response.send(err.message);
            console.log("Error POST/Bath");
        }else{
            console.log("Banyo añadido.");
            response.send("Banyo añadido.");
        }
        });
    }catch(e){} //comprobar
});