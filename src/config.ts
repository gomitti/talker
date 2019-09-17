import * as dotenv from "dotenv";

dotenv.config();
let path;

switch (process.env.NODE_ENV) {
  case "dev":
    path = `${__dirname}/../dev.env`;
    dotenv.config({ path: path });
    break;
  default:
    break;
}


export const BELUGA_ACCESS = process.env.BELUGA_ACCESS;
export const BELUGA_ACCESS_TOKEN_SECRET = process.env.BELUGA_ACCESS_TOKEN_SECRET;
export const MONGO_LOCATION = process.env.MONGO_LOCATION;
export const MONGO_PWD = process.env.MONGO_PWD;
export const MONGO_USER = process.env.MONGO_USER;