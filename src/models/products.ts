import Client from "../database";

export type Product = {
  productid: Number;
  title: string;
  price: Number;
};
export class ProductStore {
  async index(): Promise<any> {
    const sql = "SELECT * FROM products ORDER BY productId ";
    const conn = await Client.connect();
    const result = await conn.query(sql);
    conn.release();
    if (result.rowCount == 0) {
      return "there is no products";
    }
    return result.rows;
  }
  async show(id: string): Promise<any> {
    const sql = "SELECT * FROM products WHERE productId=($1) ;";
    const conn = await Client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    if (result.rowCount == 0) {
      return `there is no product with id ${id}`;
    }
    return result.rows[0];
  }

  async create(p: Product): Promise<any> {
    try {
      const sql =
        "INSERT INTO products (productId, title, price ) VALUES($1, $2, $3) RETURNING * ;";

      const conn = await Client.connect();
      const result = await conn.query(sql, [p.productid, p.title, p.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }

  async deleteP(id: string): Promise<any> {
    try {
      const sql = "DELETE FROM products WHERE productId=($1) RETURNING * ";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rowCount == 0) {
        return false;
      }
      return true;
    } catch (err) {
      return err;
    }
  }
}
