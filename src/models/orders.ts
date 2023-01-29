import Client from "../database";

export type Order = {
    id: Number;
    product_id: number;
    user_id: Number;
    quantity: string

}
export class OrdersStore {
    async index(): Promise<any> {

        const sql = 'SELECT * FROM orders ORDER BY id '
        const conn = await Client.connect()
        const result = await conn.query(sql)
        conn.release()
        if (result.rowCount == 0) {
            return "there is no orders"
        }
        return result.rows

    }
    async show(id: string): Promise<any> {

        const sql = 'SELECT * FROM orders WHERE id=($1)'
        const conn = await Client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        if (result.rowCount == 0) {
            return "order not found"
        }
        return result.rows[0]


    }

    async create(o: Order): Promise<any> {
        try {
            const sql = 'INSERT INTO orders VALUES ($1, $2, $3, $4);'

            const conn = await Client.connect()
            const result = await conn
                .query(sql, [o.id, o.product_id, o.user_id, o.quantity])
            const order = result.rows[0]
            console.log(result)
            conn.release()
            return "Order added"
        } catch (err) {
            return err
        }
    }

    async deleteO(id: string): Promise<any> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            if (result.rowCount == 0) {
                return "order not found"
            }
            return `Order with id ${id} is deleted`
        } catch (err) {
            return err
        }
    }
}