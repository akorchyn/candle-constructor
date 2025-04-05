import Link from 'next/link';
import Navigation from '@/components/navigation'
import { ThemeToggle } from '@/components/theme-toggle';
import { Tag, Receipt, PuzzleIcon, Tags } from "lucide-react";
import SignOutButton from '@/components/button/signOutButton';


export default function Header() {
    const navigation = [
        { title: 'Categories', href: '/admin/categories', icon: <Tag size={28} /> },
        { title: 'Components', href: '/admin/components', icon: <PuzzleIcon size={28} /> },
        { title: 'Candles', href: '/admin/candles', icon: <Receipt size={28} /> }];

    return (
        <header className="border-b bg-background w-full">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                <Link href="/app" className="text-xl font-bold">
                    ArtGlow.candles
                </Link>
                <div className="w-full hidden md:flex">
                    <Navigation
                        links={navigation} mobile={false}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <SignOutButton />
                </div>
            </div>


            <div className="flex w-full md:hidden">
                <Navigation links={navigation} mobile={true} />
            </div>
        </header >
    )
}
