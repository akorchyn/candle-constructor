-- CreateEnum
CREATE TYPE "CandleStatus" AS ENUM ('DRAFT', 'ACTIVE', 'DISCONTINUED');

-- CreateTable
CREATE TABLE "materials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "units" TEXT NOT NULL,
    "price_per_unit" DECIMAL(65, 30) NOT NULL,
    "image_url" TEXT,
    "purchase_url" TEXT,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "price" DECIMAL(65, 30) NOT NULL,
    "aromated_price" DECIMAL(65, 30) NOT NULL DEFAULT 0,
    "weight" DECIMAL(65, 30) NOT NULL,
    "aroma_percent" DECIMAL(65, 30) NOT NULL DEFAULT 4,
    "status" "CandleStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "candles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candle_recipes" (
    "id" SERIAL NOT NULL,
    "candle_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "amount_used" DECIMAL(65, 30) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "candle_recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE
    "materials"
ADD
    CONSTRAINT "materials_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "candle_recipes"
ADD
    CONSTRAINT "candle_recipes_candle_id_fkey" FOREIGN KEY ("candle_id") REFERENCES "candles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "candle_recipes"
ADD
    CONSTRAINT "candle_recipes_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
