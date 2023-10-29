const users = require("./data.json");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const jsonParser = express.json();
const cors = require('cors')
const corsOptions = {
  'credentials': true,
  'origin': true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept',
}
router.use(cors(corsOptions))

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});


router.post("/userModule/addUser", jsonParser, (req, res) => {

  const index = users.map((g) => {
    //console.log(g.id)
    return g.id;
  }).indexOf(req.body.id);

  // console.log(req.body)
  console.log(index)

  if (index === -1) {
    users[users.length] = req.body

    fs.writeFile('data.json', JSON.stringify(users), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    res.send({mes: true})

    //console.log(users)

  } else {

    res.send({mes: false});

  }

})
router.get("/userModule/login", (req, res) => {
  const index = users.map((g) => {
    //console.log(g.id)
    return g.id;
  }).indexOf(req.query.id);
  console.log(index, users[index])

  if (index !== -1 && req.query.bd === users[index].BD) {
    res.send({mes: "success"})
  } else {
    res.send({mes: "fail"})
  }

});

router.get("/userModule/getUserInfo", (req, res) => {
  const index = users.map((g) => {
    return g.id;
  }).indexOf(req.query.id);

console.log(index,)
  const newsList = users.filter((g) => {
    if (users[index].friends.includes(g.id)) return true;
  });

  console.log("inGetUser")
  res.send({userInfo: users[index], userFriendsInfo: newsList})

});

module.exports = router;
