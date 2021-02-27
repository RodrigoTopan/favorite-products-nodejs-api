import dotenv from "dotenv";
import "./moduleAliases";

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });
