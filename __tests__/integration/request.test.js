const request = require("supertest");
const app = require("../../src/app");

describe("HTTP Request", () => {
  it("shoul translate number to word from a http request", async () => {
    const response = await request(app).get("/20");

    expect(response.status).toBe(200);
    expect(JSON.stringify(response.body)).toBe(`{"extenso":"vinte"}`);
  });

  it("shoul not translate number to word from a bad http request", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(400);
    expect(JSON.stringify(response.body)).toBe(`{"error":"Invalid Entry"}`);
  });
});
