"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignOutButton() {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    if (!session) {
        return null;
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login");
                    },
                },
            })}
            className="flex items-center gap-2"
        >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
        </Button>
    )
}
