import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./constant";
import { Product } from "../entity/Product";
import { Category } from '../entity/Category';
import { City } from "../entity/city";
import { Contact } from "../entity/contact";
import { AbstractBase } from "../entity/Base";
import { Customer } from "../entity/Customer";
import { DeliveryHistory } from "../entity/DeliveryHistory";
import { DeliveryOrder } from "../entity/DeliveryOrder";
import { District } from "../entity/district";
import { Driver } from "../entity/Driver";
import { Job } from "../entity/job";
import { PaymentMethod } from "../entity/payment";
import { RequestOrder } from "../entity/RequestOrder";
import { SaleOrder } from "../entity/SaleOrder";
import { Status } from "../entity/Status";
import { Unit } from "../entity/Unit";
import { Account } from "../entity/Users";
export const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  port: Number(DB_PORT) || 5432,
  ssl: { rejectUnauthorized: false },
  entities: [
    Category, City, Contact, AbstractBase, Customer, DeliveryHistory,
    DeliveryOrder, District, Driver, Job, PaymentMethod, Product,
    RequestOrder, SaleOrder, Status, Unit, Account
  ],
  migrations: ['src/migration/*.ts'],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
  }
};



// function createDbConnection(): Promise<Connection> {
//   async function createInstance() {
//     try {
//       const config: any = {
//         type: "postgres",
//         host: DB_HOST,
//         database: DB_NAME,
//         username: DB_USER,
//         password: DB_PASSWORD,
//         port: DB_PORT || 5432,
//         ssl: { rejectUnauthorized: false },
//         entities: ['src/entity/*.ts'],
//         migrations: ['src/migration/*.ts'],
//         cli: {
//           "entitiesDir": "src/entity",
//           "migrationsDir": "src/migration",
//         }
//       };

//       const db: Connection = await createConnection(config);

//       return db;
//     } catch (error) {
//       console.log("Connect db error", error);
//     }
//   }

//   return createInstance();
// }

// export default createDbConnection();
