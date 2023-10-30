const users = require("./data.json");
const messages = require("./messages.json");

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


  const newsList = users.filter((g) => {
    if (users[index].friends.includes(g.id)) return true;
  });

  console.log(users[index], newsList)
  res.send({userInfo: users[index], userFriendsInfo: newsList})

});


router.post("/userModule/addNews", jsonParser, (req, res) => {

  const index = users.map((g) => {
    //console.log(g.id)
    return g.id;
  }).indexOf(req.body.id);

  console.log(req.body);
  if (index !== -1) {
    users[index].news.push(req.body.data)
    fs.writeFile('data.json', JSON.stringify(users), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    res.send({mes: true})
  } else {
    res.send({mes: false});
  }
})

router.get("/userModule/getMessages", (req, res) => {
  const mesList = messages.filter((g) => {
    if ((req.query.senderId === g.from && req.query.recipientId === g.to) ||
      (req.query.recipientId === g.from && req.query.senderId === g.to)) return true;
  });

  console.log(messages)
  console.log(mesList)
  res.send(mesList)

});

router.post("/userModule/addMessages", jsonParser, (req, res) => {

  messages[messages.length] = req.body
  fs.writeFile('messages.json', JSON.stringify(messages), (err) => {
    if (err) {
      throw err;
      res.send(false)
    } else {
      console.log('The file has been saved!');
      res.send(true)
    }
  });
});

router.post("/userModule/changeImg", jsonParser, (req, res) => {
  const index = users.map((g) => {
    return g.id;
  }).indexOf(req.body.id);

  if (index !== -1) {
    users[index].img = req.body.img;
    fs.writeFile('data.json', JSON.stringify(users), (err) => {
      if (err) {
        throw err;
        res.send(false)
      } else {
        console.log('The file has been saved!');
        res.send(true)
      }
    });
  } else {
    res.send("not ok");
  }
});

router.post("/userModule/deleteImg", jsonParser, (req, res) => {
  const index = users.map((g) => {
    return g.id;
  }).indexOf(req.body.id);

  if (index !== -1) {
    users[index].img = "";
    fs.writeFile('data.json', JSON.stringify(users), (err) => {
      if (err) {
        throw err;
        res.send(false)
      } else {
        console.log('The file has been saved!');
        res.send(true)
      }
    });
  } else {
    res.send("not ok");
  }

});

router.post("/userModule/delFriend", jsonParser, (req, res) => {
  const index = users.map((g) => {
    return g.id;
  }).indexOf(req.body.id);

  if (index !== -1) {
    const indexfriend = users[index].friends.indexOf(req.body.friend);
    if (indexfriend > -1)
      users[index].friends.splice(indexfriend, 1);

    fs.writeFile('data.json', JSON.stringify(users), (err) => {
      if (err) {
        throw err;
        res.send(false)
      } else {
        console.log('The file has been saved!');
        res.send(true)
      }
    });
  } else {
    res.send("not ok");
  }
});

router.post("/userModule/addFriend", jsonParser, (req, res) => {
  const index = users.map((g) => {
    return g.id;
  }).indexOf(req.body.id);

  if (index !== -1) {
    users[index].friends.push(req.body.friend);

    fs.writeFile('data.json', JSON.stringify(users), (err) => {
      if (err) {
        throw err;
        res.send(false)
      } else {
        console.log('The file has been saved!');
        res.send(true)
      }
    });
  } else {
    res.send("not ok");
  }
});


module.exports = router;
