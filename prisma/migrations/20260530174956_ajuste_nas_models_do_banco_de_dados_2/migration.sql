/*
  Warnings:

  - The primary key for the `Departamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Departamento` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fk_id_empresa` on the `Departamento` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Empresa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Empresa` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Funcao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Funcao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fk_id_empresa` on the `Funcao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Funcionario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Funcionario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fk_id_empresa` on the `Funcionario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fk_id_horario` on the `Funcionario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fk_id_funcao` on the `Funcionario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fk_id_departamento` on the `Funcionario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Horario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Horario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fk_id_empresa` on the `Horario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `HorarioDia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `HorarioDia` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fk_id_horario` on the `HorarioDia` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "Departamento" DROP CONSTRAINT "Departamento_fk_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "Funcao" DROP CONSTRAINT "Funcao_fk_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "Funcionario" DROP CONSTRAINT "Funcionario_fk_id_departamento_fkey";

-- DropForeignKey
ALTER TABLE "Funcionario" DROP CONSTRAINT "Funcionario_fk_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "Funcionario" DROP CONSTRAINT "Funcionario_fk_id_funcao_fkey";

-- DropForeignKey
ALTER TABLE "Funcionario" DROP CONSTRAINT "Funcionario_fk_id_horario_fkey";

-- DropForeignKey
ALTER TABLE "Horario" DROP CONSTRAINT "Horario_fk_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "HorarioDia" DROP CONSTRAINT "HorarioDia_fk_id_horario_fkey";

-- AlterTable
ALTER TABLE "Departamento" DROP CONSTRAINT "Departamento_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "fk_id_empresa" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Funcao" DROP CONSTRAINT "Funcao_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "fk_id_empresa" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Funcao_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Funcionario" DROP CONSTRAINT "Funcionario_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "fk_id_empresa" SET DATA TYPE INTEGER,
ALTER COLUMN "fk_id_horario" SET DATA TYPE INTEGER,
ALTER COLUMN "fk_id_funcao" SET DATA TYPE INTEGER,
ALTER COLUMN "fk_id_departamento" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Horario" DROP CONSTRAINT "Horario_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "fk_id_empresa" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Horario_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "HorarioDia" DROP CONSTRAINT "HorarioDia_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "fk_id_horario" SET DATA TYPE INTEGER,
ADD CONSTRAINT "HorarioDia_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_id_empresa_fkey" FOREIGN KEY ("fk_id_empresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_id_horario_fkey" FOREIGN KEY ("fk_id_horario") REFERENCES "Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_id_funcao_fkey" FOREIGN KEY ("fk_id_funcao") REFERENCES "Funcao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_id_departamento_fkey" FOREIGN KEY ("fk_id_departamento") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_fk_id_empresa_fkey" FOREIGN KEY ("fk_id_empresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioDia" ADD CONSTRAINT "HorarioDia_fk_id_horario_fkey" FOREIGN KEY ("fk_id_horario") REFERENCES "Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcao" ADD CONSTRAINT "Funcao_fk_id_empresa_fkey" FOREIGN KEY ("fk_id_empresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departamento" ADD CONSTRAINT "Departamento_fk_id_empresa_fkey" FOREIGN KEY ("fk_id_empresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
