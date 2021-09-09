import { Connection, createConnection } from "typeorm";
import { User } from "../entity/User";
import { Product } from "../entity/Product";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./constant";

function createDbConnection(): Promise<Connection> {
  async function createInstance() {
    try {
      const config: any = {
        type: "postgres",
        host: DB_HOST,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT || 5432,
        entities: [User, Product],
      };

      const db: Connection = await createConnection(config);

      return db;
    } catch (error) {
      console.log("Connect db error", error);
    }
  }

  return createInstance();
}

export default createDbConnection();
