/*
  Warnings:

  - You are about to drop the column `evaluationId` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `heuristicId` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `flowId` on the `Screen` table. All the data in the column will be lost.
  - You are about to drop the `Evaluation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinalProblem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Flow` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Heuristic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Heuristic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluationItemId` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Screen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Screen` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EvaluationItemStatus" AS ENUM ('NOT_REVIWED', 'REVIEWED_OK', 'REVIEWED_ISSUE');

-- CreateEnum
CREATE TYPE "EvaluationSessionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_evaluatorId_fkey";

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "FinalProblem" DROP CONSTRAINT "FinalProblem_finalEvaluationId_fkey";

-- DropForeignKey
ALTER TABLE "FinalProblem" DROP CONSTRAINT "FinalProblem_originalProblemId_fkey";

-- DropForeignKey
ALTER TABLE "Flow" DROP CONSTRAINT "Flow_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_evaluationId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_heuristicId_fkey";

-- DropForeignKey
ALTER TABLE "Screen" DROP CONSTRAINT "Screen_flowId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "status" "SuggestionStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Heuristic" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "status" "SuggestionStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "evaluationId",
DROP COLUMN "heuristicId",
ADD COLUMN     "evaluationItemId" TEXT NOT NULL,
ADD COLUMN     "finalEvaluationId" TEXT,
ADD COLUMN     "originalProblemId" TEXT,
ALTER COLUMN "resolvedAt" DROP NOT NULL,
ALTER COLUMN "priority" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "flowId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "projectId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Evaluation";

-- DropTable
DROP TABLE "FinalProblem";

-- DropTable
DROP TABLE "Flow";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "EvaluationSession" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" "EvaluationSessionStatus" NOT NULL,
    "evaluatorId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "EvaluationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationItem" (
    "id" TEXT NOT NULL,
    "status" "EvaluationItemStatus" NOT NULL,
    "reviewedAt" TIMESTAMP(3),
    "sessionId" TEXT NOT NULL,
    "screenId" TEXT NOT NULL,
    "heuristicId" TEXT NOT NULL,

    CONSTRAINT "EvaluationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeuristicList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "HeuristicList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HeuristicToHeuristicList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_HeuristicToHeuristicList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryToHeuristicList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToHeuristicList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_HeuristicToHeuristicList_B_index" ON "_HeuristicToHeuristicList"("B");

-- CreateIndex
CREATE INDEX "_CategoryToHeuristicList_B_index" ON "_CategoryToHeuristicList"("B");

-- AddForeignKey
ALTER TABLE "Screen" ADD CONSTRAINT "Screen_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationSession" ADD CONSTRAINT "EvaluationSession_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Evaluator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationSession" ADD CONSTRAINT "EvaluationSession_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationItem" ADD CONSTRAINT "EvaluationItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "EvaluationSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationItem" ADD CONSTRAINT "EvaluationItem_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationItem" ADD CONSTRAINT "EvaluationItem_heuristicId_fkey" FOREIGN KEY ("heuristicId") REFERENCES "Heuristic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_evaluationItemId_fkey" FOREIGN KEY ("evaluationItemId") REFERENCES "EvaluationItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_finalEvaluationId_fkey" FOREIGN KEY ("finalEvaluationId") REFERENCES "FinalEvaluation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_originalProblemId_fkey" FOREIGN KEY ("originalProblemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heuristic" ADD CONSTRAINT "Heuristic_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Evaluator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Evaluator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeuristicToHeuristicList" ADD CONSTRAINT "_HeuristicToHeuristicList_A_fkey" FOREIGN KEY ("A") REFERENCES "Heuristic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeuristicToHeuristicList" ADD CONSTRAINT "_HeuristicToHeuristicList_B_fkey" FOREIGN KEY ("B") REFERENCES "HeuristicList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToHeuristicList" ADD CONSTRAINT "_CategoryToHeuristicList_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToHeuristicList" ADD CONSTRAINT "_CategoryToHeuristicList_B_fkey" FOREIGN KEY ("B") REFERENCES "HeuristicList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
