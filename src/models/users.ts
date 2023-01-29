import Client from "../database";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'


dotenv.config()
const slatRound=Number(process.env.SALT_ROUNDS)

export type user = {
    personid: Number,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
}


export class UsersStore {
    async index(): Promise<user[]> {
        const sql = `SELECT * FROM users`
        const conn = await Client.connect()
        const result = await conn.query(sql)
        conn.release();
        return result.rows
    }
    async show(id: string): Promise<any> {
        try {
            const sql = `SELECT * FROM users WHERE PersonID=($1)`
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release();

            if (result.rowCount == 0) { return "not found" }
            return result.rows[0]
        } catch (err) {

            return err
        }

    }
    async create(user: user): Promise<any> {
        try {
            const sql = 'INSERT INTO users( PersonID,UserName,FirstName,LastName,Email,Password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
            const conn = await Client.connect()
            const hash = bcrypt.hashSync(user.password,slatRound )
            const result = await conn.query(sql, [user.personid, user.username, user.firstname, user.lastname, user.email, hash])
            conn.release();
            return result.rows[0]

        } catch (err) {

            return err
        }
    }
    async deleteu(id: string): Promise<any> {
        try {
            const sql = 'DELETE FROM users WHERE PersonID=($1)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()

            if (result.rowCount == 0) {
                return "not found"
            }
            return "user deleted"
        } catch (err) {
            return err
        }
    }
    async check(id: string, password: string): Promise<boolean> {
        //... fetch user from a db etc.
        const sql = `SELECT * FROM users WHERE personid = (${id})`
        const conn = await Client.connect()
        const result = await conn.query(sql)
        const user = result.rows[0]
        conn.release()
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return true
        }
        return false
    }



}

