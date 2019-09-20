const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("GET /", () => {
    it("returns 200 OK", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return { message: 'up up and SPRINT!!!'}", async () => {
      const res = await request(server).get("/");

      expect(res.body.api).toBe("up up and SPRINT!!!");
      expect(res.body).toEqual({ message: "up up and SPRINT!!!" });
    });

    it("returns JSON", done => {
      request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
          done();
        });
    });
  });
});
