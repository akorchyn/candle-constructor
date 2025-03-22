// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from '@/lib/auth-client'

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = authClient;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        const response = await signIn.email({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        })

        if (response?.error) {
            setError('Invalid credentials')
            setIsLoading(false)
            return
        }

        setIsLoading(false)
        router.push('/')
        router.refresh()
    }

    const handleGoogle = async () => {
        await signIn.social({
            provider: 'google',
        })
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white p-8 rounded-lg md:shadow-md md:w-96 w-full gap">
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>

                </form>
                <div className="flex flex-col gap-2 mt-4">
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="px-6 sm:px-0 max-w-sm">
                        <Button onClick={handleGoogle} className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></Button>
                    </div>
                </div>
            </div>
        </div >
    )
}
