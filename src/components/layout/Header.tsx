"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    const navigation = [
        { name: 'Categories', href: '/categories' },
        { name: 'Components', href: '/components' },
        { name: 'Candles', href: '/candles' }
    ]

    return (
        <header className="bg-white shadow">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <span className="text-xl font-bold text-gray-800">Candle Maker</span>
                        </div>
                        <div className="ml-6 flex space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${pathname === item.href
                                        ? 'border-indigo-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
