/*
 Warnings:
 
 - A unique constraint covering the columns `[slug]` on the table `candles` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `slug` to the `candles` table without a default value. This is not possible if the table is not empty.
 
 */
-- First, create a function to transliterate Cyrillic to Latin
CREATE
OR REPLACE FUNCTION transliterate_cyrillic(text TEXT) RETURNS TEXT AS $ $ BEGIN RETURN translate(
    text,
    'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
    'abvgdeejzijklmnoprstufhzcssyyyeuaABVGDEEJZIJKLMNOPRSTUFHZCSSYYYEUA'
);

END;

$ $ LANGUAGE plpgsql;

-- Create function to generate slug with transliteration
CREATE
OR REPLACE FUNCTION generate_slug(title TEXT) RETURNS TEXT AS $ $ BEGIN RETURN LOWER(
    REGEXP_REPLACE(
        REGEXP_REPLACE(
            transliterate_cyrillic(title),
            '[^a-zA-Z0-9\s-]',
            ''
        ),
        '\s+',
        '-'
    )
);

END;

$ $ LANGUAGE plpgsql;

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SeasonType" AS ENUM (
    'SPRING',
    'SUMMER',
    'AUTUMN',
    'WINTER',
    'HOLIDAY'
);

-- AlterTable
ALTER TABLE
    "candles"
ADD
    COLUMN "burn_time" INTEGER,
ADD
    COLUMN "category_id" INTEGER,
ADD
    COLUMN "color" TEXT,
ADD
    COLUMN "dimensions" TEXT,
ADD
    COLUMN "featured" BOOLEAN NOT NULL DEFAULT false,
ADD
    COLUMN "fragrance" TEXT,
ADD
    COLUMN "meta_description" TEXT,
ADD
    COLUMN "meta_title" TEXT,
ADD
    COLUMN "season_type" "SeasonType",
ADD
    COLUMN "seasonal" BOOLEAN NOT NULL DEFAULT false,
ADD
    COLUMN "slug" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "candle_images" (
    "id" SERIAL NOT NULL,
    "candle_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "candle_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candle_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "image_url" TEXT,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "candle_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "candle_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- Migrate existing image URLs to candle_images table
INSERT INTO
    "candle_images" (
        "candle_id",
        "url",
        "is_primary",
        "order",
        "created_at",
        "updated_at"
    )
SELECT
    id as "candle_id",
    "image_url" as "url",
    true as "is_primary",
    0 as "order",
    NOW() as "created_at",
    NOW() as "updated_at"
FROM
    "candles"
WHERE
    "image_url" IS NOT NULL;

-- Generate slugs for all candles
UPDATE
    "candles"
SET
    "slug" = generate_slug(name);

-- CreateIndex
CREATE UNIQUE INDEX "candle_categories_slug_key" ON "candle_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "candles_slug_key" ON "candles"("slug");

-- AddForeignKey
ALTER TABLE
    "candles"
ADD
    CONSTRAINT "candles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "candle_categories"("id") ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "candle_images"
ADD
    CONSTRAINT "candle_images_candle_id_fkey" FOREIGN KEY ("candle_id") REFERENCES "candles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "candle_categories"
ADD
    CONSTRAINT "candle_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "candle_categories"("id") ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "reviews"
ADD
    CONSTRAINT "reviews_candle_id_fkey" FOREIGN KEY ("candle_id") REFERENCES "candles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "reviews"
ADD
    CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Remove the image_url column from candles
ALTER TABLE
    "candles" DROP COLUMN "image_url";
