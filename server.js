const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'root',
  database: 'DB'
})


app.get('/user', (req, res) => {
  const sql = "SELECT * FROM logins";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    else {
      return res.json(data);
    }
  })

})

app.post('/signup', (req, res) => {
  const sql = "INSERT INTO logins(`name`, `email`, `password`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password
  ]
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err); // Log the MySQL error
      return res.json("Error");
    }
    return res.json(data);
  })
})

// app.post('/login',(req,res) => {
//   const sql = "SELECT * FROM logins where `email = ? AND `password` = ? ";

//   db.query(sql,[req.body.email,req.body.password],(err,data) => {
//     if(err){
//       return res.json("Error");
//     }
//     if(data.length > 0){
//       return res.json("Success");
//     }
//     else{
//     return res.json("Fail");
//     }

//   })
// })

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM logins WHERE email = ? AND password = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.listen(8081, () => {
  console.log("listining");
})






















// const express = require("express");
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());


// const conn = mysql.createConnection({
//   host:"localhost",
//   user: "root",
//   password: "root",
//   database:"DB"
// });
// conn.connect(function(errr){
//   if(errr) {
//     console.log(errr);
//   }
//   else{
//   console.log("Connected");
//   }
// });




// app.listen(8085,() => { 
//   console.log("listening");
// })


