/*
  Warnings:

  - You are about to drop the column `problemId` on the `FinalProblem` table. All the data in the column will be lost.
  - The `screenshot` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `role` on the `ProjectMembership` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ProjectMembership` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Screen` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserBadgeAward` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `FinalProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effort` to the `FinalProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `improvementSuggestions` to the `FinalProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `FinalProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `severity` to the `FinalProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin` to the `ProjectMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluatorId` to the `ProjectMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluatorId` to the `UserBadgeAward` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_evaluatorId_fkey";

-- DropForeignKey
ALTER TABLE "FinalProblem" DROP CONSTRAINT "FinalProblem_problemId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "Screen" DROP CONSTRAINT "Screen_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserBadgeAward" DROP CONSTRAINT "UserBadgeAward_userId_fkey";

-- DropIndex
DROP INDEX "FinalProblem_problemId_key";

-- AlterTable
ALTER TABLE "FinalEvaluation" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FinalProblem" DROP COLUMN "problemId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "effort" "Effort" NOT NULL,
ADD COLUMN     "improvementSuggestions" TEXT NOT NULL,
ADD COLUMN     "originalProblemId" TEXT,
ADD COLUMN     "priority" BOOLEAN NOT NULL,
ADD COLUMN     "screenshot" TEXT[],
ADD COLUMN     "severity" "Severity" NOT NULL;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "screenshot",
ADD COLUMN     "screenshot" TEXT[];

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProjectMembership" DROP COLUMN "role",
DROP COLUMN "userId",
ADD COLUMN     "admin" BOOLEAN NOT NULL,
ADD COLUMN     "evaluatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "projectId",
ADD COLUMN     "flowId" TEXT;

-- AlterTable
ALTER TABLE "UserBadgeAward" DROP COLUMN "userId",
ADD COLUMN     "evaluatorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Evaluator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "isSystemAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Evaluator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evaluator_email_key" ON "Evaluator"("email");

-- AddForeignKey
ALTER TABLE "ProjectMembership" ADD CONSTRAINT "ProjectMembership_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screen" ADD CONSTRAINT "Screen_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalProblem" ADD CONSTRAINT "FinalProblem_originalProblemId_fkey" FOREIGN KEY ("originalProblemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgeAward" ADD CONSTRAINT "UserBadgeAward_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
