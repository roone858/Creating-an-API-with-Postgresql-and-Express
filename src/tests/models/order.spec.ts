import { OrdersStore } from "../../models/orders";
import { ProductStore } from "../../models/products";
import { UsersStore } from "../../models/users";

const orderStore = new OrdersStore();
const productStore = new ProductStore();
const userStore = new UsersStore();
let productId: number, userId: number;

describe("Order Model", () => {
  beforeAll(async () => {
    const product = await productStore.create({
      productid: 1,
      title: "Test product",
      price: 40,
    });
    productId = product.id as number;
    const user = await userStore.create({
      personid: 1,
      username: "ssmith",
      firstname: "Sallie",
      lastname: "Test",
      email: "Test",
      password: "password123",
    });
    userId = user.id as number;
  });

  it("should create an order", async () => {
    const result = await orderStore.create({
      id: 1,
      user_id: 1,
      product_id: 1,
      quantity: 5,
      status: "new",
    });
    expect(result).toEqual("Order added");
  });

  it("should return a list of orders", async () => {
    const result = await orderStore.index();
    expect(result).toEqual([{ id: 1, user_id: 1, status: "new" }]);
  });

  it("should return the correct order", async () => {
    const result = await orderStore.show("1");
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: "new",
    });
  });

  it("should delete the order", async () => {
    await orderStore.deleteO("1");
    const result = await orderStore.index();
    expect(result).toEqual("there is no orders");
  });
});
