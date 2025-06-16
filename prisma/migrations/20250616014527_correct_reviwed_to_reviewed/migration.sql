/*
  Warnings:

  - The values [NOT_REVIWED] on the enum `EvaluationItemStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EvaluationItemStatus_new" AS ENUM ('NOT_REVIEWED', 'REVIEWED_OK', 'REVIEWED_ISSUE');
ALTER TABLE "EvaluationItem" ALTER COLUMN "status" TYPE "EvaluationItemStatus_new" USING ("status"::text::"EvaluationItemStatus_new");
ALTER TYPE "EvaluationItemStatus" RENAME TO "EvaluationItemStatus_old";
ALTER TYPE "EvaluationItemStatus_new" RENAME TO "EvaluationItemStatus";
DROP TYPE "EvaluationItemStatus_old";
COMMIT;
