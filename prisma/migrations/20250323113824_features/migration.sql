-- AlterTable
ALTER TABLE "candles" ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "slug" DROP DEFAULT;
