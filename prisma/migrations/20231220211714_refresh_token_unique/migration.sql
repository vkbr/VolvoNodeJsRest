/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `TokenInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TokenInfo_refreshToken_key" ON "TokenInfo"("refreshToken");
