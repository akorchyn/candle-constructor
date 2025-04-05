"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="outline"
            className="p-2 relative"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <Sun className="dark:opacity-0" />
            <Moon className="absolute scale-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
} 
