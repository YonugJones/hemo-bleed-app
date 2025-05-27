-- CreateEnum
CREATE TYPE "BleedSeverity" AS ENUM ('Mild', 'Moderate', 'Severe', 'Unknown');

-- CreateEnum
CREATE TYPE "InfusionType" AS ENUM ('Routine', 'OnDemand', 'PreExercise', 'PostExercise', 'Other');

-- CreateTable
CREATE TABLE "Bleed" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "bodyPart" TEXT NOT NULL DEFAULT 'Unknown',
    "severity" "BleedSeverity" NOT NULL,
    "description" TEXT,
    "cause" TEXT,
    "mobilityImpact" TEXT,
    "usedCrutches" BOOLEAN,
    "ptStartDate" TIMESTAMP(3),
    "ptNotes" TEXT,
    "isRebleed" BOOLEAN,
    "relatedBleedId" TEXT,
    "timeToInfuseHours" INTEGER,
    "preventable" BOOLEAN,
    "activityAtTime" TEXT,
    "weatherNotes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bleed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Infusion" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "InfusionType" NOT NULL,
    "product" TEXT NOT NULL DEFAULT 'Unknown',
    "doseUnits" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "bleedId" TEXT,

    CONSTRAINT "Infusion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bleed" ADD CONSTRAINT "Bleed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infusion" ADD CONSTRAINT "Infusion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infusion" ADD CONSTRAINT "Infusion_bleedId_fkey" FOREIGN KEY ("bleedId") REFERENCES "Bleed"("id") ON DELETE SET NULL ON UPDATE CASCADE;
