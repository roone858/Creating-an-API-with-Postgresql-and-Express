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

describe("Product handlers: ", () => {
  it("should return a new product after it is created", () => {
    const data = {
      productid: 1,
      title: "shirt",
      price: 40,
    };
    request
      .post("/products/")
      .set("token", token)
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({
        productid: 1,
        title: "shirt",
        price: 40,
      });
  });

  it("should show all products", () => {
    request
      .get("/products")
    
      .expect("Content-Type", /json/)
      .expect(200)
      .expect([
        {
          productid: 1,
          title: "shirt",
          price: 40,
        },
      ]);
  });

  it("should show a product given an id", () => {
    request
      .get("/products/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({
        productid: 1,
        title: "shirt",
        price: 40,
      });
  });

  it("should delete a product given its id", () => {
    request
      .delete("/products/1")
      .set("token", token)
      .expect(200)
      .then(() => {
        request.get("/products").expect("The product is deleted");
      });
  });
});
