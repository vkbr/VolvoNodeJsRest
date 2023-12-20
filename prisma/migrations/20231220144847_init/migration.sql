-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Roles" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerSignupOtp" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerSignupOtp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenInfo" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "exipry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerSignupOtp_customerId_key" ON "CustomerSignupOtp"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "TokenInfo_customerId_key" ON "TokenInfo"("customerId");

-- AddForeignKey
ALTER TABLE "CustomerSignupOtp" ADD CONSTRAINT "CustomerSignupOtp_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenInfo" ADD CONSTRAINT "TokenInfo_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
