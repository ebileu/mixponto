/*
  Warnings:

  - Added the required column `numero` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "numero" SMALLINT NOT NULL;
