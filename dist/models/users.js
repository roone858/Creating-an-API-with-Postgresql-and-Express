"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const slatRound = Number(process.env.SALT_ROUNDS);
class UsersStore {
    async index() {
        const sql = `SELECT * FROM users`;
        const conn = await database_1.default.connect();
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async show(id) {
        try {
            const sql = `SELECT * FROM users WHERE PersonID=($1)`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rowCount == 0) {
                return "not found";
            }
            return result.rows[0];
        }
        catch (err) {
            return err;
        }
    }
    async create(user) {
        try {
            const sql = 'INSERT INTO users( PersonID,UserName,FirstName,LastName,Email,Password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(user.password, slatRound);
            const result = await conn.query(sql, [user.personid, user.username, user.firstname, user.lastname, user.email, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            return err;
        }
    }
    async deleteu(id) {
        try {
            const sql = 'DELETE FROM users WHERE PersonID=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rowCount == 0) {
                return "not found";
            }
            return "user deleted";
        }
        catch (err) {
            return err;
        }
    }
    async check(id, password) {
        //... fetch user from a db etc.
        const sql = `SELECT * FROM users WHERE personid = (${id})`;
        const conn = await database_1.default.connect();
        const result = await conn.query(sql);
        const user = result.rows[0];
        conn.release();
        const match = await bcrypt_1.default.compare(password, user.password);
        if (match) {
            return true;
        }
        return false;
    }
}
exports.UsersStore = UsersStore;
