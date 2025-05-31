/*
  Warnings:

  - A unique constraint covering the columns `[name,is_system_category]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_name_is_system_category_key" ON "Category"("name", "is_system_category");
