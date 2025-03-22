import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { nextCookies } from "better-auth/next-js"

export const authClient = createAuthClient({
    plugins: [
        adminClient(),
        nextCookies()
    ]
})
