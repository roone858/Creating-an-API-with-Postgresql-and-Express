import { UsersStore } from "../../models/users";

const store = new UsersStore();

describe("User Model", () => {
  it("should create a user", async () => {
    const result = await store.create({
      personid: 2,
      username: "ssmith",
      firstname: "Sallie",
      lastname: "Test",
      email: "Test",
      password: "password123",
    });

    expect(result.username).toEqual("ssmith");
  });

  it("should return a list of users", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        personid: 1,
        username: "ssmith",
        firstname: "Sallie",
        lastname: "Test",
        email: "Test",
        password: result[0].password,
      },
      {
        personid: 2,
        username: "ssmith",
        firstname: "Sallie",
        lastname: "Test",
        email: "Test",
        password: result[1].password,
      },
    ]);
  });

  it("should return the correct user", async () => {
    const result = await await store.show("1");

    expect(result).toEqual({
      personid: 1,
      username: "ssmith",
      firstname: "Sallie",
      lastname: "Test",
      email: "Test",
      password: result.password,
    });
  });

  it("should delete the user", async () => {
    const result = await store.deleteu("1");

    expect(result).toEqual("user deleted");
  });
});
