"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrdersStore {
    async index() {
        const sql = 'SELECT * FROM orders ORDER BY id ';
        const conn = await database_1.default.connect();
        const result = await conn.query(sql);
        conn.release();
        if (result.rowCount == 0) {
            return "there is no orders";
        }
        return result.rows;
    }
    async show(id) {
        const sql = 'SELECT * FROM orders WHERE id=($1)';
        const conn = await database_1.default.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
        if (result.rowCount == 0) {
            return "order not found";
        }
        return result.rows[0];
    }
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders VALUES ($1, $2, $3) ;';
            await conn.query(sql, [o.id, o.user_id, o.status]);
            const orderProductsSql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3)";
            await conn.query(orderProductsSql, [o.id, o.product_id, o.quantity]);
            conn.release();
            return "Order added";
        }
        catch (err) {
            return err;
        }
    }
    async deleteO(id) {
        try {
            const conn = await database_1.default.connect();
            const orderProductsSql = "DELETE FROM order_products WHERE order_id=($1)";
            await conn.query(orderProductsSql, [id]);
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rowCount == 0) {
                return "order not found";
            }
            return `Order with id ${id} is deleted`;
        }
        catch (err) {
            return err;
        }
    }
}
exports.OrdersStore = OrdersStore;
