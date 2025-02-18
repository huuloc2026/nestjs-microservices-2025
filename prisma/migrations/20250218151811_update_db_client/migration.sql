/*
  Warnings:

  - You are about to drop the column `avatar` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `isVerify` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `verifyCode` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "avatar",
DROP COLUMN "gender",
DROP COLUMN "isVerify",
DROP COLUMN "phone",
DROP COLUMN "role",
DROP COLUMN "salt",
DROP COLUMN "verifyCode";
