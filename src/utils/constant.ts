import * as env from "dotenv";
import { getEnv } from "./helpers";
env.config()
export const PORT = getEnv('PORT') || 3000;
export const DB_HOST = getEnv('DB_HOST');
export const DB_NAME = getEnv('DB_NAME');
export const DB_USER = getEnv('DB_USER');
export const DB_PASSWORD = getEnv('DB_PASSWORD');
export const DB_PORT = getEnv('DB_PORT');

export const USER_SECRET = getEnv('USER_SECRET') || 'long1234';