const users = require("./data.json");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const jsonParser = express.json();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});


router.post("/userModule/addUser", jsonParser, (req, res) => {

  const index = users.map((g)=>{
    //console.log(g.id)
    return g.id;
  }).indexOf(req.body.id);

  // console.log(req.body)
  console.log(index)

  if(index===-1) {
    res.send({mes:true})
    users[users.length] = req.body
    //console.log(users)

  }else{

    res.send({mes:false});

  }

})
router.get("/userModule/getUsers", (req, res) => {

  res.send(JSON.stringify({test: "abc"}));
});
module.exports = router;
