import dotenv from "dotenv";
import { EnvConfig } from "./types/config";

dotenv.config();

function loadConfig(): EnvConfig {
  const requiredEnvVars = [
    "API_BASE_URL",
    "USER_EMAIL",
    "USER_PASSWORD",
    "USER_FIRST_NAME",
    "USER_LAST_NAME",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes: ${missingVars.join(", ")}`
    );
  }

  return {
    API_BASE_URL: process.env.API_BASE_URL || "",
    USER_EMAIL: process.env.USER_EMAIL || "",
    USER_PASSWORD: process.env.USER_PASSWORD || "",
    USER_FIRST_NAME: process.env.USER_FIRST_NAME || "",
    USER_LAST_NAME: process.env.USER_LAST_NAME || "",
  };
}

export const config = loadConfig();
