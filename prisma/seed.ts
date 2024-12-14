// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // First, create categories
    const categories = await Promise.all([
        prisma.category.create({
            data: { name: 'Воски', description: 'Різні типи воску для виготовлення свічок' }
        }),
        prisma.category.create({
            data: { name: 'Контейнери', description: 'Контейнери та ємності для свічок' }
        }),
        prisma.category.create({
            data: { name: 'Гнути', description: 'Гнути для свічок' }
        }),
        prisma.category.create({
            data: { name: 'Декорації', description: 'Етикетки та декоративні елементи' }
        }),
        prisma.category.create({
            data: { name: 'Аромати та Барвники', description: 'Ароматичні олії та барвники' }
        })
    ])

    const [waxes, containers, wicks, decorations, fragrances] = categories

    // Then create materials
    const materials = [
        // Waxes
        {
            name: 'Соєвий Формовий',
            units: 'г',
            pricePerUnit: 0.36,
            categoryId: waxes.id
        },
        {
            name: 'Соєвий Контейнерний',
            units: 'г',
            pricePerUnit: 0.30,
            categoryId: waxes.id
        },
        {
            name: 'Пальмовий віск',
            units: 'г',
            pricePerUnit: 0.15,
            categoryId: waxes.id
        },
        {
            name: 'Бджолиний жовтий',
            units: 'г',
            pricePerUnit: 0.399,
            categoryId: waxes.id
        },
        {
            name: 'Бджолиний білий',
            units: 'г',
            pricePerUnit: 0.41,
            categoryId: waxes.id
        },

        // Containers
        {
            name: 'Склянка 250 мл з дерев\'яною кришкою',
            units: 'шт',
            pricePerUnit: 60,
            categoryId: containers.id
        },
        {
            name: 'Склянка 200 мл без кришки',
            units: 'шт',
            pricePerUnit: 25,
            categoryId: containers.id
        },
        {
            name: 'Склянка 300(200) мл з дерев\'яно-силіконовою кришкою',
            units: 'шт',
            pricePerUnit: 74,
            categoryId: containers.id
        },
        {
            name: 'Алюмінієва 50мл з кришкою рожева',
            units: 'шт',
            pricePerUnit: 16.895,
            categoryId: containers.id
        },
        {
            name: 'Алюмінієва 150мл з кришкою рожева',
            units: 'шт',
            pricePerUnit: 48,
            categoryId: containers.id
        },
        {
            name: 'Склянка непрозора 200(150) мл з дерев\'яно-силіконовою кришкою',
            units: 'шт',
            pricePerUnit: 58.20,
            categoryId: containers.id
        },

        // Wicks
        {
            name: 'Дерев\'яний гніт',
            units: 'шт',
            pricePerUnit: 9,
            categoryId: wicks.id
        },
        {
            name: 'Бавов\'яний гніт - 1',
            units: 'см',
            pricePerUnit: 0.012,
            categoryId: wicks.id
        },
        {
            name: 'Бавов\'яний гніт - 2',
            units: 'см',
            pricePerUnit: 0.017,
            categoryId: wicks.id
        },
        {
            name: 'Бавов\'яний гніт - 3',
            units: 'см',
            pricePerUnit: 0.017,
            categoryId: wicks.id
        },
        {
            name: 'Бавов\'яний гніт - 5',
            units: 'см',
            pricePerUnit: 0.023,
            categoryId: wicks.id
        },
        {
            name: 'Тримач для бавов\'яного гнуту',
            units: 'шт',
            pricePerUnit: 0.45,
            categoryId: wicks.id
        },
        {
            name: 'Тримач для дерев\'яного гнуту',
            units: 'шт',
            pricePerUnit: 2,
            categoryId: wicks.id
        },

        // Decorations
        {
            name: 'Наліпка для тримача',
            units: 'шт',
            pricePerUnit: 0.23,
            categoryId: decorations.id
        },
        {
            name: 'Декоративна наліпка ArtGlow',
            units: 'шт',
            pricePerUnit: 2.30,
            categoryId: decorations.id
        },
        {
            name: 'Декоративна наліпка HandMade',
            units: 'шт',
            pricePerUnit: 0.54,
            categoryId: decorations.id
        },
        {
            name: 'Сургуч',
            units: 'шт',
            pricePerUnit: 0.69,
            categoryId: decorations.id
        },

        // Fragrances and Colors
        {
            name: 'Арома-олія CandleScience',
            units: 'мл',
            pricePerUnit: 4.75,
            categoryId: fragrances.id
        },
        {
            name: 'Барвник',
            units: 'краплі',
            pricePerUnit: 0.35,
            categoryId: fragrances.id
        },
    ]

    await prisma.material.createMany({
        data: materials
    })

    console.log('Seed data created successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
