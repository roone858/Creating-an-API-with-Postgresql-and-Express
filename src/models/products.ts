import Client from "../database";

export type Product = {
    productId: Number;
    title: string;
    price: Number;
    category: string

}
export class ProductStore {
    async showAll(): Promise<any> {

        const sql = 'SELECT * FROM products ORDER BY productId '
        const conn = await Client.connect()
        const result = await conn.query(sql)
        conn.release()
        if (result.rowCount == 0) {
            return "there is no products"
        }
        return result.rows
    }
    async show(id: string): Promise<any> {

        const sql = 'SELECT * FROM products WHERE productId=($1)'
        const conn = await Client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        if (result.rowCount == 0) {
            return `there is no product with id ${id}`
        }
        return result.rows[0]

    }

    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (productId, title, price ,category) VALUES($1, $2, $3,$4) RETURNING *'

            const conn = await Client.connect()
            const result = await conn
                .query(sql, [p.productId, p.title, p.price, p.category])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not add new product ${p.title}. ${err}`)
        }
    }

    async deleteP(id: string): Promise<any> {

        try {
            const sql = 'DELETE FROM products WHERE productId=($1)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()

            if (result.rowCount == 0) {
                return "product not found"
            }
            return `product with id ${id} is deleted`
        } catch (err) {
            return err
        }
    }
}