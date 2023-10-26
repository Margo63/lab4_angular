let express = require("express");
let server = express();
const jsonParser = express.json();
let users = require("./data.json");

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});


server.post("/userModule/addUser", jsonParser, (req, res) => {



  const index = users.map((g)=>{
    //console.log(g.id)
    return g.id;
  }).indexOf(req.body.id);

  // console.log(req.body)
  // console.log(index)

  if(index===-1) {
    res.send(true)
    users[users.length] = req.body
    //console.log(users)

  }else{

    res.send(false);

  }

})
server.get("/userModule/getUsers", (req, res) => {

  res.send(JSON.stringify({test: "abc"}));
});
server.listen(3000);
