import supertest from "supertest";
import app from "../../server";
import { authorisation } from "../../middleware/authorisation";

const request = supertest(app);
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const tokenSecret = String(process.env.TOKEN_SECRET);
const token: string = jwt.sign(
  {
    personid: 1,
    password: "1234",
  },
  tokenSecret
);

describe("Users handlers: ", () => {
  it("/users should return a created user", () => {
    const data = {
      personid: 1,
      username: "ssmith",
      firstname: "Sallie",
      lastname: "Test",
      email: "Test",
      password: "1234",
    };
    request
      .post("/users/")
      .send(data)
      .expect("Content-Type", "application/json")
      .expect(201)
      .expect(data);
  });

  it("/users should return all users", () => {
    request
      .get("/users")
      .set("token", token)
      .expect(200)
      .expect("Content-Type", "application/json")
      .expect([
        {
            personid: 1,
            username: "ssmith",
            firstname: "Sallie",
            lastname: "Test",
            email: "Test",
            password: "1234"
        },
      ]);
  });

  it("/users/:id should show a user", () => {
    request
      .get("/users/1")
      .set("token", token)
      .expect("Content-Type", "application/json")
      .expect(200)
      .expect({
        personid: 1,
        username: "ssmith",
        firstname: "Sallie",
        lastname: "Test",
        email: "Test",
        password: "1234",
      });
  });

 

  it("/users/:id should delete a user", () => {
    request.delete("/users/1").expect(200).expect("user deleted");
  });
});
