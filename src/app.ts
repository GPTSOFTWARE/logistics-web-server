import * as express from "express";
import * as cors from "cors";
import { PORT } from "./utils/constant";
import morgan = require("morgan");
import bodyParser = require('body-parser')
import usersRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import productRoute from "./routes/product.route";
import orderRoute from "./routes/saleOrder.route";
import changeDelivery from "./routes/changeDelivery.route";
import city from "./routes/city.route";
import { createConnection } from "typeorm";
import { dbConfig } from "./utils/db";





const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(usersRoute);
app.use(authRoute);
app.use(productRoute);
app.use(orderRoute);
app.use(changeDelivery);
app.use(city);



app.use(async (err: any, req: any, res: any, next: any) => {
  if (err) {
    res
      .status(err.status || 500)
      .send({ erorr: { code: err.status || 500, message: err.message } });
  }
});

app.get("/", async (req, res, next) => {
  res.send("Welcome to gateway");
});

app.get("/ping", async (req, res, next) => {
  res.json({ code: 200, message: "ping" });
});

createConnection(dbConfig)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`app listen on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
