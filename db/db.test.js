const { connect, disconnect, findUser, saveUser } = require("./db");
const User = require("../models/userModel");
const mongoose = require("mongoose");

beforeAll(async () => {
  return await connect();
});

beforeAll(async () => {
  await User.deleteMany({});
});

describe("User Test Unit", () => {
  test("As a user i want to save a user to the database.", async () => {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: "javad",
      lastName: "shahrabadi",
      address: "123 Main Street",
      city: "Alvand",
      state: "Qazvin",
      zipCode: "31232",
      email: "javad@gmail.com",
      password: "123",
    });
    const user = await saveUser(newUser);
    expect(user.firstName).toEqual("javad");
    expect(user.lastName).toEqual("shahrabadi");
    expect(user.address).toEqual("123 Main Street");
    expect(user.city).toEqual("Alvand");
    expect(user.state).toEqual("Qazvin");
    expect(user.zipCode).toEqual("31232");
    expect(user.email).toEqual("javad@gmail.com");
    expect(user.password).toEqual("123");
  });

  test("As a user i want find a user by any property", async () => {
    const obj = { firstName: "javad" };
    await findUser(obj)
      .then((user) => {
        console.log(user);
        expect(user.lastName).toEqual("shahrabadi");
      })
      .catch((error) => {
        console.log("error:", error.message);
      });
  });
});

afterAll(async () => {
  return await disconnect();
});
