import "dotenv/config";

declare const process: {
  env: {
    DATABASE_URL?: string;
  };
};

export default {
  schema: "./src/models/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
