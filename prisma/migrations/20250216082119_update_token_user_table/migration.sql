/*
  Warnings:

  - Added the required column `accessToken` to the `TokenUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `TokenUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TokenUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TokenUser" ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "refreshToken" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
