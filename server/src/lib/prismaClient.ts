// server/src/lib/prismaClient.ts
import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { type Config as LibSQLConfig } from '@libsql/client';

const tursoDBUrl = process.env.TURSO_DB_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoDBUrl) {
  throw new Error('A variável de ambiente TURSO_DB_URL não está definida.');
}

const tursoClientConfig: LibSQLConfig = {
  url: tursoDBUrl,
  authToken: tursoAuthToken,
};

const adapter = new PrismaLibSQL(tursoClientConfig);
const prisma = new PrismaClient({ adapter });

export default prisma;
