/*
  Warnings:

  - The `status` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BaseStatus" AS ENUM ('ACTIVE', 'PENDING', 'INACTIVE', 'BANNED', 'DELETED');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "status",
ADD COLUMN     "status" "BaseStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "baseStatus";
