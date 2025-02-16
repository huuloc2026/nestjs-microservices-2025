-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verifyCode" TEXT,
ALTER COLUMN "gender" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TokenUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TokenUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TokenUser" ADD CONSTRAINT "TokenUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
