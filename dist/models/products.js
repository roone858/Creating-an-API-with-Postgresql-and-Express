"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        const sql = 'SELECT * FROM products ORDER BY productId ';
        const conn = await database_1.default.connect();
        const result = await conn.query(sql);
        conn.release();
        if (result.rowCount == 0) {
            return "there is no products";
        }
        return result.rows;
    }
    async show(id) {
        const sql = 'SELECT * FROM products WHERE productId=($1) ;';
        const conn = await database_1.default.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
        if (result.rowCount == 0) {
            return `there is no product with id ${id}`;
        }
        return result.rows[0];
    }
    async create(p) {
        try {
            const sql = 'INSERT INTO products (productId, title, price ) VALUES($1, $2, $3) RETURNING * ;';
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [p.productid, p.title, p.price]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            return err;
        }
    }
    async deleteP(id) {
        try {
            const sql = 'DELETE FROM products WHERE productId=($1) RETURNING * ';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rowCount == 0) {
                return false;
            }
            return true;
        }
        catch (err) {
            return err;
        }
    }
}
exports.ProductStore = ProductStore;
