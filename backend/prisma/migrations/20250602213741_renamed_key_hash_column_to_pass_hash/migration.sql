/*
  Warnings:

  - You are about to drop the column `keyHash` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[passHash]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_keyHash_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "keyHash",
ADD COLUMN     "passHash" VARCHAR(70) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_passHash_key" ON "User"("passHash");
