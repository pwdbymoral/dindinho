import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { type Config as LibSQLConfig } from '@libsql/client';

const tursoDBUrl = process.env.TURSO_DB_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoDBUrl || !tursoAuthToken) {
  throw new Error(
    'Variáveis de ambiente TURSO_DB_URL e TURSO_AUTH_TOKEN precisam estar definidas no .env do servidor.'
  );
}

const tursoClientConfig: LibSQLConfig = {
  url: tursoDBUrl,
  authToken: tursoAuthToken,
};

const adapter = new PrismaLibSQL(tursoClientConfig);
const prisma = new PrismaClient({ adapter });

const SEED_USER1_EMAIL = process.env.SEED_USER1_EMAIL;
const SEED_USER1_USERNAME = process.env.SEED_USER1_USERNAME;
const SEED_USER1_NAME = process.env.SEED_USER1_NAME;
const SEED_USER1_PASSWORD = process.env.SEED_USER1_PASSWORD;

const SEED_USER2_EMAIL = process.env.SEED_USER2_EMAIL;
const SEED_USER2_USERNAME = process.env.SEED_USER2_USERNAME;
const SEED_USER2_NAME = process.env.SEED_USER2_NAME;
const SEED_USER2_PASSWORD = process.env.SEED_USER2_PASSWORD;

async function main() {
  console.log(`Iniciando o processo de seed...`);

  if (
    !SEED_USER1_EMAIL ||
    !SEED_USER1_USERNAME ||
    !SEED_USER1_NAME ||
    !SEED_USER1_PASSWORD
  ) {
    console.error(
      'Erro: Todas as variáveis de ambiente para SEED_USER1 devem estar definidas.'
    );
    console.error("Exemplo para SEED_USER1_PASSWORD: 'suaSenhaSecretaUser1'");
    process.exit(1);
  }

  if (
    !SEED_USER2_EMAIL ||
    !SEED_USER2_USERNAME ||
    !SEED_USER2_NAME ||
    !SEED_USER2_PASSWORD
  ) {
    console.error(
      'Erro: Todas as variáveis de ambiente para SEED_USER2 devem estar definidas.'
    );
    console.error("Exemplo para SEED_USER2_PASSWORD: 'suaSenhaSecretaUser2'");
    process.exit(1);
  }

  const hashedPasswordUser1 = await bcrypt.hash(SEED_USER1_PASSWORD, 10);
  const hashedPasswordUser2 = await bcrypt.hash(SEED_USER2_PASSWORD, 10);

  const user1 = await prisma.user.upsert({
    where: { email: SEED_USER1_EMAIL },
    update: {},
    create: {
      email: SEED_USER1_EMAIL,
      username: SEED_USER1_USERNAME,
      name: SEED_USER1_NAME,
      password_hash: hashedPasswordUser1,
    },
  });

  console.log(`Usuário 1 criado ou atualizado: ${user1.email}`);
  const user2 = await prisma.user.upsert({
    where: { email: SEED_USER2_EMAIL },
    update: {},
    create: {
      email: SEED_USER2_EMAIL,
      username: SEED_USER2_USERNAME,
      name: SEED_USER2_NAME,
      password_hash: hashedPasswordUser2,
    },
  });
  console.log(`Usuário 2 criado ou atualizado: ${user2.email}`);

  const systemCategories = [
    { name: 'Transferência Interna', type: null, is_system_category: true },
    // Adicione outras categorias de sistema básicas que você queira
    { name: 'Salário', type: 'INCOME', is_system_category: true },
    { name: 'Moradia', type: 'EXPENSE', is_system_category: true },
    { name: 'Alimentação', type: 'EXPENSE', is_system_category: true },
    { name: 'Transporte', type: 'EXPENSE', is_system_category: true },
    { name: 'Lazer', type: 'EXPENSE', is_system_category: true },
    { name: 'Saúde', type: 'EXPENSE', is_system_category: true },
    { name: 'Outras Receitas', type: 'INCOME', is_system_category: true },
    { name: 'Outras Despesas', type: 'EXPENSE', is_system_category: true },
  ];

  for (const categoryData of systemCategories) {
    await prisma.category.upsert({
      where: {
        name_is_system_category: {
          name: categoryData.name,
          is_system_category: true,
        },
      }, // Precisa de um unique constraint para isso
      update: { type: categoryData.type }, // Atualiza o tipo se a categoria já existir
      create: {
        name: categoryData.name,
        type: categoryData.type as 'INCOME' | 'EXPENSE' | null, // Cast para o tipo do enum ou null
        is_system_category: true,
        // userId será null para categorias de sistema
      },
    });
  }
  console.log(
    `${systemCategories.length} categorias de sistema criadas/atualizadas.`
  );

  console.log(`Seed finalizado.`);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
