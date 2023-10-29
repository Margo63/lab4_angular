const sum = require("./sum");

const client_routes = require("../client_routes")


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})

const request = require("supertest");
const app = require("../client_routes");

describe("Test express", () => {
  test("login", () => {
    request(app)
      .get("/userModule/login?id=OfChen&bd=17.12.1999")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("getUserInfo", () => {
    request(app)
      .get("/userModule/getUserInfo?id=OfChen")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("getMessage", () => {
    request(app)
      .get("/userModule/getMessages?senderId=OfChen&recipientId=OfNolan")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });


  test("addMessages", () => {
    request(app)
      .post("/userModule/addMessages")
      .send( {
        "from": "OfChen",
        "to": "OfNolan",
        "time": "29.10.2023",
        "date": "19:56:44",
        "message": "testing"
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("addNews", () => {
    request(app)
      .post("/userModule/addNews")
      .send( {
        "id": "OfChen",
        "data":"testing"
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("addUser", () => {
    request(app)
      .post("/userModule/addUser")
      .send( {
        "id": "serBredfort2",
        "name": "Tim",
        "BD": "17.12.1870",
        "email": "tim@mail.ru",
        "img": "https://cdn2.thecatapi.com/images/ckk.gif",
        "role": "администратор",
        "state": "неподтвержденный пользователь",
        "news": [
          "walk",
          "with",
          "dog"
        ],
        "friends": [
          "OfChen"
        ]
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

});

// describe("Test the root path", () => {
//   test("It should response the GET method",  () => {
//      supertest(client_routes)
//       .get("/userModule/login?id=OfChen&bd=17.12.1999")
//       .expect([])
//   });
// });
