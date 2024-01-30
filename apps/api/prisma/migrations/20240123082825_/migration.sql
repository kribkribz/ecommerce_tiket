/*
  Warnings:

  - You are about to drop the column `discountVoucner` on the `refereerewards` table. All the data in the column will be lost.
  - Added the required column `discountVoucher` to the `RefereeRewards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `refereerewards` DROP COLUMN `discountVoucner`,
    ADD COLUMN `discountVoucher` INTEGER NOT NULL;
