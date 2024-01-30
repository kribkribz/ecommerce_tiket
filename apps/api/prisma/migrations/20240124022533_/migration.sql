/*
  Warnings:

  - Added the required column `price` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tickets` ADD COLUMN `price` DOUBLE NOT NULL;
