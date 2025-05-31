import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { type Config as LibSQLConfig } from '@libsql/client';

const tursoDBUrl = process.env.TURSO_DB_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoDBUrl) {
  console.error(
    '[prismaClient.ts] ERRO FATAL: TURSO_DB_URL não está definida após tentativa de carregar .env!'
  );
  process.exit(1);
}
if (tursoDBUrl && !tursoAuthToken) {
  console.warn(
    '[prismaClient.ts] AVISO: TURSO_AUTH_TOKEN não está definida. Verifique se sua TURSO_DB_URL já o contém ou se ele é realmente opcional.'
  );
}

const tursoClientConfig: LibSQLConfig = {
  url: tursoDBUrl,
  authToken: tursoAuthToken,
};

let prisma: PrismaClient;

try {
  const adapter = new PrismaLibSQL(tursoClientConfig);
  prisma = new PrismaClient({ adapter });
} catch (e: any) {
  console.error(
    '[prismaClient.ts] ERRO CRÍTICO AO INICIALIZAR PRISMA/ADAPTER:'
  );
  console.error('Mensagem:', e.message);
  console.error('Stack:', e.stack);
  if (e.cause) console.error('Causa do Erro:', e.cause);
  console.error(
    'Objeto do Erro Completo:',
    JSON.stringify(e, Object.getOwnPropertyNames(e), 2)
  );
  process.exit(1);
}

export default prisma;
