import * as express from "express";
import * as cors from "cors";
import { PORT } from "./utils/constant";
import morgan = require("morgan");

import usersRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(usersRoute);
// app.use(Connection());
// app.use(authRoute);

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

app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
