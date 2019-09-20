const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const Users = require("../users/usersModel.js");

describe("auth-router.js", () => {
  describe("POSt /api/register", () => {
    it("returns 200 ok", () => {
      return request(server)
        .get("/api/auth/register")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    describe("register()", () => {
      beforeEach(async () => {
        await db("users").truncate();
      });

      it("should add users to the db", async () => {
        await Users.add({ username: "billy", password: "tedy" });

        let users = await db("users");

        expect(users).toHaveLength(1);
      });
    });
    it("return json", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "billy", password: "tedy" })
        .then(res => {
          assert(res.body.username, "billy");
        });
    });
    describe("post login", () => {
      it("erturn a 200 status", () => {
        request(server)
          .post("/api/auth/login")
          .send({ username: "billy", password: "tedy" })
          .set("Accept", "application/json")
          .then(res => {
            expect(res.status)
              .toBe(200)
              .expect("Content-Type", /json/);
            done();
          });
      });
    });
  });
});

// describe("register()", () => {
//   beforeEach(async () => {
//     await db("users").truncate();
//   });

//   it("should add users to the db", async () => {
//     await Users.add({ username: "billy", password: "tedy" });

//     let users = await db("users");

//     expect(users).toHaveLength(1);
//   });
// });
