"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Plus, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface Item {
  value: string
  label: string
}

interface SelectCategoryProps {
  items: Item[]
  value?: string
  onChange: (value: string) => void
  onCreateNew?: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SelectCategory({
  items,
  value,
  onChange,
  onCreateNew,
  placeholder = "Select a category...",
  className,
}: SelectCategoryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Find the selected item
  const selectedItem = items.find((item) => item.value === value)

  // Filter items based on search term
  const filteredItems = items.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()))

  // Check if search term matches any existing item
  const exactMatch = items.some((item) => item.label.toLowerCase() === searchTerm.toLowerCase())

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle creating a new category
  const handleCreateNew = () => {
    if (searchTerm.trim() && onCreateNew && !exactMatch) {
      onCreateNew(searchTerm.trim())
      setSearchTerm("")
      setIsOpen(false)
    }
  }

  // Handle selecting an item
  const handleSelect = (item: Item) => {
    onChange(item.value)
    setIsOpen(false)
    setSearchTerm("")
  }

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    } else if (e.key === "Enter" && searchTerm && !exactMatch && onCreateNew) {
      e.preventDefault()
      handleCreateNew()
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)} onKeyDown={handleKeyDown}>
      {/* Display selected value or input */}
      {!isOpen && selectedItem ? (
        <div
          className="flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer h-10 bg-background"
          onClick={() => setIsOpen(true)}
        >
          <span>{selectedItem.label}</span>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={(e) => {
                e.stopPropagation()
                onChange("")
              }}
            >
              <X className="h-3 w-3" />
            </Button>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center w-full border rounded-md",
            isOpen && "ring-2 ring-ring ring-offset-background",
          )}
        >
          <div className="relative flex items-center w-full">
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="pl-8 pr-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onFocus={() => setIsOpen(true)}
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 h-6 w-6"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-l-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-md max-h-60 overflow-auto">
          {/* Create new option */}
          {searchTerm && !exactMatch && onCreateNew && (
            <button
              type="button"
              className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent"
              onClick={handleCreateNew}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create {` "${searchTerm}"`}
            </button>
          )}

          {/* Divider if we have both create option and items */}
          {searchTerm && !exactMatch && onCreateNew && filteredItems.length > 0 && (
            <div className="mx-2 my-1 border-t" />
          )}

          {/* Items list */}
          {filteredItems.length > 0 ? (
            <div className="py-1">
              {filteredItems.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm",
                    "hover:bg-accent",
                    value === item.value && "bg-accent/50",
                  )}
                  onClick={() => handleSelect(item)}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">No categories found</div>
          )}
        </div>
      )}
    </div>
  )
}

