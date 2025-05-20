-- CreateEnum
CREATE TYPE "HemophiliaType" AS ENUM ('A', 'B', 'C', 'Unknown');

-- CreateEnum
CREATE TYPE "HemophiliaSeverity" AS ENUM ('Mild', 'Moderate', 'Severe', 'Unknown');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hemophiliaType" "HemophiliaType" NOT NULL DEFAULT 'Unknown',
    "hemophiliaSeverity" "HemophiliaSeverity" NOT NULL DEFAULT 'Unknown',
    "medicineType" TEXT NOT NULL DEFAULT 'Unknown',
    "dosageAmount" INTEGER NOT NULL DEFAULT 0,
    "dosageFrequency" TEXT NOT NULL DEFAULT 'Unknown',
    "refreshToken" TEXT,
    "profilePic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
