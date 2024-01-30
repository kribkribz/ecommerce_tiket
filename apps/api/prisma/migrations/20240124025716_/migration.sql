/*
  Warnings:

  - You are about to drop the column `price` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tickets` DROP COLUMN `price`,
    DROP COLUMN `transactionId`;
