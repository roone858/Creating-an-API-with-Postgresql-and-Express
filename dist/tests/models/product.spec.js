"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../models/products");
const store = new products_1.ProductStore();
describe("Product Model", () => {
    it("should create a product", async () => {
        const result = await store.create({
            productid: 2,
            title: "Test product",
            price: 40,
        });
        expect(result).toEqual({
            productid: 2,
            title: "Test product",
            price: 40,
        });
    });
    it("should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([
            { productid: 1, title: "Test product", price: 40 },
            { productid: 2, title: "Test product", price: 40 },
        ]);
    });
    it("should return the correct product", async () => {
        const result = await store.show("1");
        expect(result).toEqual({ productid: 1, title: "Test product", price: 40 });
    });
    it("should delete the product", async () => {
        await store.deleteP("1");
        const result = await store.index();
        expect(result).toEqual([
            { productid: 2, title: "Test product", price: 40 },
        ]);
    });
});
