-- CreateTable
CREATE TABLE "RecurringTransactionRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "default_amount" DECIMAL,
    "is_amount_variable" BOOLEAN NOT NULL DEFAULT false,
    "recurrence_type" TEXT NOT NULL,
    "recurrence_interval" INTEGER NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME,
    "next_due_date" DATETIME NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    "default_category_id" INTEGER NOT NULL,
    "default_wallet_id" INTEGER,
    "default_credit_card_id" INTEGER,
    CONSTRAINT "RecurringTransactionRule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RecurringTransactionRule_default_category_id_fkey" FOREIGN KEY ("default_category_id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RecurringTransactionRule_default_wallet_id_fkey" FOREIGN KEY ("default_wallet_id") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RecurringTransactionRule_default_credit_card_id_fkey" FOREIGN KEY ("default_credit_card_id") REFERENCES "CreditCard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
