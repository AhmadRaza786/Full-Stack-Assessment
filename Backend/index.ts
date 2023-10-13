import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from "./routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});