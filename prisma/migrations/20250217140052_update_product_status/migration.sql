-- CreateEnum
CREATE TYPE "baseStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "baseStatus" NOT NULL DEFAULT 'ACTIVE';
