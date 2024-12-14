"use client"

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function HomePage() {
  const session = useSession()
  redirect('/candles')
}
