/*
  Warnings:

  - You are about to drop the `refereerewards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refereerewards` DROP FOREIGN KEY `RefereeRewards_ownerId_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `discountEligible` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `refereerewards`;
