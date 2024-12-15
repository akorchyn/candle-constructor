// src/components/ui/search.tsx
'use client'

import { useState, useEffect } from 'react'
import { Input } from './input'
import { Search as SearchIcon } from 'lucide-react'

interface SearchProps<T> {
    data: T[]
    searchFields: (keyof T)[]
    onFilter: (filteredData: T[]) => void
    placeholder?: string
    className?: string
}

export function Search<T>({
    data,
    searchFields,
    onFilter,
    placeholder = "Search...",
    className = ""
}: SearchProps<T>) {
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filtered = data.filter(item =>
            searchFields.some(field => {
                const value = item[field]
                if (value === null || value === undefined) return false
                return String(value)
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            })
        )
        onFilter(filtered)
    }, [data, searchTerm, onFilter, searchFields])

    return (
        <div className={`relative ${className}`}>
            <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            />
            <Input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
            />
        </div>
    )
}
